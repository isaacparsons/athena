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
} from '@frontend/components';
import { CloseIcon, MoreVertIcon } from '@frontend/icons';
import { useParamId, usePromiseWithNotification } from '@frontend/hooks';

import { NewsletterPostForm } from '@frontend/types';
import { addTempPositionToItems, CreateTemplate } from '@athena/common';
import {
  useNewsletter,
  useNewsletterPosts,
  useNewsletters,
  useTemplates,
} from '@frontend/store';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../AppRoutes';

export function Newsletter() {
  const [editing, setEditing] = useState(false);
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const [createTemplatePosts, setCreateTemplatePosts] = useState<
    NewsletterPostForm[]
  >([]);

  const newsletterId = useParamId('newsletterId');
  const promiseWithNotifications = usePromiseWithNotification();

  const navigate = useNavigate();
  const { createTemplate } = useTemplates();
  const { deleteNewsletter } = useNewsletters();
  const newsletter = useNewsletter(newsletterId);

  const { posts, createPosts, updatePosts, deletePosts, loading } =
    useNewsletterPosts(newsletterId);
  const existingPosts = useMemo(() => addTempPositionToItems(posts), [posts]);

  const toggleEditing = () => setEditing((editing) => !editing);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setSettingsMenuAnchorEl(null);
  };

  if (!newsletter) return null;

  const handleSavePosts = async (data: { posts: NewsletterPostForm[] }) => {
    const files = data.posts.reduce((prev, curr) => {
      const file = _.get(curr, ['details', 'file']) as File | undefined;
      if (file !== undefined)
        return [...prev, [curr.tempPosition.id, file] as [string, File]];
      return prev;
    }, [] as [string, File][]);

    const created = formatCreatedPosts(newsletter.id, data.posts);
    const updated = formatUpdatedPosts(newsletter.id, existingPosts, data.posts);

    const deleted = formatDeletedPosts(existingPosts, data.posts);

    if (created && created.posts.length > 0) {
      promiseWithNotifications.execute(createPosts(created, files), {
        successMsg: 'Items created!',
        errorMsg: 'Unable to create items :(',
      });
    }
    if (deleted && deleted.ids.length > 0 && newsletterId !== undefined) {
      promiseWithNotifications.execute(deletePosts(newsletterId, deleted), {
        successMsg: 'Items deleted!',
        errorMsg: 'Unable to delete items :(',
      });
    }
    if (updated.length > 0 && newsletterId !== undefined) {
      promiseWithNotifications.execute(updatePosts(newsletterId, updated, files), {
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
    if (newsletterId) {
      promiseWithNotifications.execute(deleteNewsletter(newsletterId), {
        successMsg: 'Newsletter deleted!',
        errorMsg: 'Unable to delete newsletter :(',
      });
      navigate(RoutePaths.newsletters);
    }
  };

  const handleSaveTemplate = (input: CreateTemplate) => {
    promiseWithNotifications.execute(createTemplate(input), {
      successMsg: 'Template created!',
      errorMsg: 'Unable to create template :(',
    });
    setCreateTemplatePosts([]);
    toggleEditing();
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <CreateTemplateDialog
        newsletterId={newsletter.id}
        posts={createTemplatePosts}
        onClose={handleCloseTemplateDialog}
        onSave={handleSaveTemplate}
      />
      <ActionBar backBtn={<BackButton />}>
        {editing ? (
          <CloseIcon onClick={() => setEditing(false)} />
        ) : (
          <IconButton size="large" onClick={handleMenuClick}>
            <MoreVertIcon sx={{ color: 'white' }} />
          </IconButton>
        )}

        <NewsletterPostMenu
          anchorEl={settingsMenuAnchorEl}
          onClose={handleMenuClose}
          onEdit={() => setEditing(!editing)}
          onDelete={handleDeleteNewsletter}
        />
      </ActionBar>
      <CustomContainer>
        <NewsletterProperties data={newsletter} editing={editing} />
        <NewsletterMembers data={newsletter.members} />
        <NewsletterPostsController
          editing={editing}
          newsletterId={newsletter.id}
          posts={existingPosts}
          onSave={handleSavePosts}
          setCreateTemplatePosts={(p) => setCreateTemplatePosts(p)}
        />
      </CustomContainer>
    </>
  );
}

function NewsletterSkeleton() {
  return <Skeleton variant="rectangular" width={210} height={60} />;
}
