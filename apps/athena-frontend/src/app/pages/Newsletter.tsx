import { useMemo, useState } from 'react';
import { CircularProgress, IconButton, Skeleton } from '@mui/material';
import {
  NewsletterProperties,
  NewsletterMembers,
  ActionBar,
  BackButton,
  CustomContainer,
  NewsletterPostsController,
  CreateTemplateDialog,
  NewsletterPostMenu,
  StyledFab,
  IdParamRouteProps,
  NewsletterPostsProvider,
  useNewsletterPostsContext,
} from '@frontend/components';
import { CheckIcon, CloseIcon, MoreVertIcon } from '@frontend/icons';
import {
  usePromiseWithNotification,
  useUpdateNewsletterForm,
} from '@frontend/hooks';

import { NewsletterPostForm } from '@frontend/types';
import {
  CreateTemplate,
  ReadNewsletter,
  fromPostsWithTempPosition,
} from '@athena/common';
import {
  useNewsletter,
  useNewsletterPosts,
  useNewsletters,
  useTemplates,
} from '@frontend/store';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@frontend/config';
import _ from 'lodash';

export function NewsletterRoute({ id }: IdParamRouteProps) {
  const { loading: loadingNewsletter, newsletter } = useNewsletter(id);

  if (loadingNewsletter || !newsletter) return <CircularProgress />;
  return (
    <NewsletterPostsProvider newsletterId={newsletter.id}>
      <Newsletter newsletter={newsletter} />
    </NewsletterPostsProvider>
  );
}

interface NewsletterProps {
  newsletter: ReadNewsletter;
}

export function Newsletter(props: NewsletterProps) {
  const { newsletter } = props;
  const { posts, reset, editing, setEditing, created, updated, deleted, existing } =
    useNewsletterPostsContext();

  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const [createTemplatePosts, setCreateTemplatePosts] = useState<
    NewsletterPostForm[]
  >([]);

  const promiseWithNotifications = usePromiseWithNotification();

  const navigate = useNavigate();

  const { createPosts, updatePosts, deletePosts } = useNewsletterPosts(
    newsletter.id
  );

  const { createTemplate } = useTemplates();
  const { deleteNewsletter, update: updateNewsletter } = useNewsletters();

  const {
    newsletter: updatedNewsletter,
    control,
    formState: newsletterFormState,
  } = useUpdateNewsletterForm(newsletter);

  const saveable = useMemo(
    () =>
      newsletterFormState.isDirty ||
      created.length > 0 ||
      updated.length > 0 ||
      deleted.length > 0,
    [newsletterFormState.isDirty, created, updated, deleted]
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setSettingsMenuAnchorEl(null);
  };

  const handleSaveNewsletter = async () => {
    await handleSavePosts();
    if (updatedNewsletter !== undefined) {
      await updateNewsletter(updatedNewsletter);
    }
    reset();
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
    setEditing(false);
  };

  const handleSavePosts = async () => {
    const allPosts = posts.map((p) => _.omit(p, 'postId'));
    const files = allPosts.reduce((prev, curr) => {
      const file = _.get(curr, ['details', 'file']) as File | undefined;
      if (file !== undefined)
        return [...prev, [curr.tempPosition.id, file] as [string, File]];
      return prev;
    }, [] as [string, File][]);

    const createdWithTempPosition = fromPostsWithTempPosition(existing, created);
    const deletedIds = deleted.map((p) => p.id);

    if (created.length > 0) {
      promiseWithNotifications.execute(
        createPosts(
          {
            newsletterId: newsletter.id,
            posts: createdWithTempPosition,
          },
          files
        ),
        {
          successMsg: 'Items created!',
          errorMsg: 'Unable to create items :(',
        }
      );
    }
    if (updated.length > 0) {
      promiseWithNotifications.execute(updatePosts(newsletter.id, updated, files), {
        successMsg: 'Items updated!',
        errorMsg: 'Unable to update items :(',
      });
    }
    if (deleted.length > 0) {
      promiseWithNotifications.execute(
        deletePosts(newsletter.id, {
          ids: deletedIds,
        }),
        {
          successMsg: 'Items deleted!',
          errorMsg: 'Unable to delete items :(',
        }
      );
    }
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
        onEdit={() => setEditing(true)}
      />
      <CustomContainer>
        <NewsletterProperties control={control} editing={editing} />
        <NewsletterMembers newsletterId={newsletter.id} data={newsletter.members} />
        <NewsletterPostsController
          newsletterId={newsletter.id}
          onCreateTemplatePosts={(p) => setCreateTemplatePosts(p)}
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
