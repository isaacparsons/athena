import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
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
  NewsletterPostsProvider,
  useNewsletterPostsContext,
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
  NewsletterPost,
  ReadNewsletter,
  ReadNewsletterPost,
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
  const {
    reset,
    save: savePosts,
    editing,
    setEditing,
    created,
    updated,
    deleted,
  } = useNewsletterPostsContext();

  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const [createTemplatePosts, setCreateTemplatePosts] = useState<
    NewsletterPostForm[]
  >([]);

  const promiseWithNotifications = usePromiseWithNotification();

  const navigate = useNavigate();

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
    await savePosts();
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
        <NewsletterMembers data={newsletter.members} />
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
