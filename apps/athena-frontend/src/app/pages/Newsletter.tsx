import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { CircularProgress, IconButton, Skeleton } from '@mui/material';
import { useStore } from '@frontend/store';
import { useShallow } from 'zustand/react/shallow';
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
} from '@frontend/components';
import { CloseIcon, EditIcon } from '@frontend/icons';
import {
  useNewsletter,
  useParamId,
  usePosts,
  usePromiseWithNotification,
} from '@frontend/hooks';
import { NewsletterPostForm } from '@frontend/types';
import { addTempPositionToItems, CreateTemplate } from '@athena/common';

export function Newsletter() {
  const [editing, setEditing] = useState(true);
  const [createTemplatePosts, setCreateTemplatePosts] = useState<
    NewsletterPostForm[]
  >([]);

  const toggleEditing = () => setEditing((editing) => !editing);

  const newsletterId = useParamId('newsletterId');
  const promiseWithNotifications = usePromiseWithNotification();

  const {
    loading,
    newsletters,
    newsletterPosts,
    fetchNewsletter,
    createPosts,
    updatePosts,
    deletePosts,
    createTemplate,
  } = useStore(
    useShallow((state) => ({
      newsletters: state.newsletters.data,
      newsletterPosts: state.newsletterPosts.data,
      createPosts: state.newsletterPosts.create,
      updatePosts: state.newsletterPosts.update,
      deletePosts: state.newsletterPosts.delete,
      loading: state.newsletters.loading,
      fetchNewsletter: state.newsletters.fetch,
      createTemplate: state.templates.create,
    }))
  );

  useEffect(() => {
    if (newsletterId) fetchNewsletter(newsletterId);
  }, [newsletterId, fetchNewsletter]);

  const newsletter = useNewsletter(newsletterId, newsletters);
  const posts = usePosts(newsletterId, newsletterPosts);
  const existingPosts = useMemo(() => addTempPositionToItems(posts), [posts]);

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
        <IconButton size="large" onClick={() => setEditing(!editing)}>
          {editing ? (
            <CloseIcon sx={{ color: 'secondary.light' }} />
          ) : (
            <EditIcon htmlColor="#fff" fontSize="inherit" />
          )}
        </IconButton>
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
