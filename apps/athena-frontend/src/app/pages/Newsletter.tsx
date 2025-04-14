import _ from 'lodash';
import { useMemo, useState } from 'react';
import { CircularProgress, IconButton, Skeleton } from '@mui/material';
import {
  NewsletterProperties,
  NewsletterMembers,
  ActionBar,
  BackButton,
  CustomContainer,
  formatCreatedPosts,
  formatDeletedPosts,
  formatUpdatedPosts,
  NewsletterPostsController,
  CreateTemplateDialog,
  NewsletterPostMenu,
  StyledFab,
  IdParamRouteProps,
} from '@frontend/components';
import { CheckIcon, CloseIcon, MoreVertIcon } from '@frontend/icons';
import {
  useNewsletterPostsForm,
  usePromiseWithNotification,
  useUpdateNewsletterForm,
} from '@frontend/hooks';

import { NewsletterPostForm } from '@frontend/types';
import {
  addTempPositionToItems,
  CreateManyNewsletterPosts,
  CreateTemplate,
  DeleteMany,
  ReadNewsletter,
  UpdateManyNewsletterPosts,
} from '@athena/common';
import {
  useNewsletter,
  useNewsletterPosts,
  useNewsletters,
  useTemplates,
} from '@frontend/store';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../AppRoutes';

export function NewsletterRoute({ id }: IdParamRouteProps) {
  const { loading: loadingNewsletter, newsletter } = useNewsletter(id);
  const {
    posts,
    createPosts,
    updatePosts,
    deletePosts,
    loading: loadingPosts,
  } = useNewsletterPosts(id);

  const existingPosts = useMemo(() => addTempPositionToItems(posts), [posts]);

  if (loadingNewsletter || loadingPosts || !newsletter) return <CircularProgress />;
  return (
    <Newsletter
      newsletter={newsletter}
      posts={existingPosts}
      createPosts={createPosts}
      updatePosts={updatePosts}
      deletePosts={deletePosts}
    />
  );
}

interface NewsletterProps {
  newsletter: ReadNewsletter;
  posts: NewsletterPostForm[];
  createPosts: (
    input: CreateManyNewsletterPosts,
    files?: [string, File][]
  ) => Promise<void>;
  updatePosts: (
    newsletterId: number,
    input: UpdateManyNewsletterPosts,
    files?: [string, File][]
  ) => Promise<void>;
  deletePosts: (newsletterId: number, input: DeleteMany) => Promise<void>;
}

export function Newsletter(props: NewsletterProps) {
  const {
    newsletter,
    posts: existingPosts,
    createPosts,
    updatePosts,
    deletePosts,
  } = props;
  const [editing, setEditing] = useState(false);
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const [createTemplatePosts, setCreateTemplatePosts] = useState<
    NewsletterPostForm[]
  >([]);
  const [parent, setParent] = useState<null | NewsletterPostForm>(null);

  const promiseWithNotifications = usePromiseWithNotification();

  const navigate = useNavigate();

  const { createTemplate } = useTemplates();
  const { deleteNewsletter, update: updateNewsletter } = useNewsletters();

  const {
    newsletter: updatedNewsletter,
    control,
    formState: newsletterFormState,
  } = useUpdateNewsletterForm(newsletter);

  const {
    fields,
    insert,
    update,
    remove,
    reset,
    formState: newsletterPostsFormState,
  } = useNewsletterPostsForm(parent, existingPosts);

  const saveable = useMemo(
    () => newsletterFormState.isDirty || newsletterPostsFormState.isDirty,
    [newsletterFormState.isDirty, newsletterPostsFormState.isDirty]
  );

  const toggleEditing = () => setEditing((editing) => !editing);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setSettingsMenuAnchorEl(null);
  };

  const handleSaveNewsletter = async () => {
    await handleSavePosts(fields);
    if (updatedNewsletter !== undefined) {
      await updateNewsletter(updatedNewsletter);
    }
    reset();
  };

  const handleSavePosts = async (postsWithPostId: NewsletterPostForm[]) => {
    const posts = postsWithPostId.map((p) => _.omit(p, 'postId'));
    const files = posts.reduce((prev, curr) => {
      const file = _.get(curr, ['details', 'file']) as File | undefined;
      if (file !== undefined)
        return [...prev, [curr.tempPosition.id, file] as [string, File]];
      return prev;
    }, [] as [string, File][]);

    const created = formatCreatedPosts(newsletter.id, posts);
    const updated = formatUpdatedPosts(newsletter.id, existingPosts, posts);
    const deleted = formatDeletedPosts(existingPosts, posts);

    console.log(created);
    if (created && created.posts.length > 0) {
      promiseWithNotifications.execute(createPosts(created, files), {
        successMsg: 'Items created!',
        errorMsg: 'Unable to create items :(',
      });
    }
    if (deleted && deleted.ids.length > 0) {
      promiseWithNotifications.execute(deletePosts(newsletter.id, deleted), {
        successMsg: 'Items deleted!',
        errorMsg: 'Unable to delete items :(',
      });
    }
    if (updated.length > 0) {
      promiseWithNotifications.execute(updatePosts(newsletter.id, updated, files), {
        successMsg: 'Items updated!',
        errorMsg: 'Unable to update items :(',
      });
    }
    toggleEditing();
  };

  const handleCloseTemplateDialog = () => {
    setCreateTemplatePosts([]);
  };

  const handleDeleteNewsletter = () => {
    promiseWithNotifications.execute(deleteNewsletter(newsletter.id), {
      successMsg: 'Newsletter deleted!',
      errorMsg: 'Unable to delete newsletter :(',
    });
    navigate(RoutePaths.newsletters);
  };

  const handleSaveTemplate = (input: CreateTemplate) => {
    promiseWithNotifications.execute(createTemplate(input), {
      successMsg: 'Template created!',
      errorMsg: 'Unable to create template :(',
    });
    setCreateTemplatePosts([]);
    toggleEditing();
  };

  return (
    <>
      <CreateTemplateDialog
        newsletterId={newsletter.id}
        posts={createTemplatePosts}
        onClose={handleCloseTemplateDialog}
        onSave={handleSaveTemplate}
      />
      <NewsletterHeader
        editing={editing}
        onClose={() => setEditing(false)}
        onMenuClick={handleMenuClick}
        onMenuClose={handleMenuClose}
        settingsMenuAnchorEl={settingsMenuAnchorEl}
        onDeleteNewsletter={handleDeleteNewsletter}
        onEdit={toggleEditing}
      />
      <CustomContainer>
        <NewsletterProperties
          control={control}
          // data={newsletter}
          editing={editing}
        />
        <NewsletterMembers data={newsletter.members} />
        <NewsletterPostsController
          fields={fields}
          parent={parent}
          setParent={setParent}
          insert={insert}
          update={update}
          remove={remove}
          editing={editing}
          newsletterId={newsletter.id}
          setCreateTemplatePosts={(p) => setCreateTemplatePosts(p)}
        />
        {editing && (
          <StyledFab disabled={!saveable} onClick={handleSaveNewsletter}>
            <CheckIcon sx={{ color: 'white' }} />
          </StyledFab>
        )}
      </CustomContainer>
    </>
  );
}

interface NewsletterHeaderProps {
  editing: boolean;
  onClose: () => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  settingsMenuAnchorEl: HTMLElement | null;
  onDeleteNewsletter: () => void;
  onEdit: () => void;
}

function NewsletterHeader(props: NewsletterHeaderProps) {
  const {
    editing,
    onClose,
    onMenuClick,
    settingsMenuAnchorEl,
    onMenuClose,
    onDeleteNewsletter,
    onEdit,
  } = props;
  return (
    <ActionBar backBtn={<BackButton />}>
      {editing ? (
        <CloseIcon onClick={onClose} />
      ) : (
        <IconButton size="large" onClick={onMenuClick}>
          <MoreVertIcon sx={{ color: 'white' }} />
        </IconButton>
      )}

      <NewsletterPostMenu
        anchorEl={settingsMenuAnchorEl}
        onClose={onMenuClose}
        onEdit={onEdit}
        onDelete={onDeleteNewsletter}
      />
    </ActionBar>
  );
}

function NewsletterSkeleton() {
  return <Skeleton variant="rectangular" width={210} height={60} />;
}
