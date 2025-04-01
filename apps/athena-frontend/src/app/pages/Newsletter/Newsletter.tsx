import { useEffect, useState } from 'react';
import _ from 'lodash';
import { CircularProgress, IconButton, Skeleton } from '@mui/material';
import { useStore } from '@athena/store';
import { useShallow } from 'zustand/react/shallow';
import { Properties } from './Properties';
import { Members } from './Members';
import {
  ActionBar,
  BackButton,
  CustomContainer,
  NewsletterPostChanges,
} from '@athena/components';
import { CloseIcon, EditIcon } from '@athena/icons';
import {
  useNewsletter,
  useParamId,
  usePosts,
  usePromiseWithNotification,
} from '@athena/hooks';
import { NewsletterPostsController } from '../../components/common/NewsletterPosts/NewsletterPostsController';

export function Newsletter() {
  const [editing, setEditing] = useState(true);

  const toggleEditing = () => setEditing((editing) => !editing);

  const newsletterId = useParamId('newsletterId');
  const promiseWithNotifications = usePromiseWithNotification();

  const {
    loading,
    newsletters,
    newsletterPosts,
    fetchNewsletter,
    createPosts,
    deletePosts,
  } = useStore(
    useShallow((state) => ({
      newsletters: state.newsletters.data,
      newsletterPosts: state.newsletterPosts.data,
      createPosts: state.newsletterPosts.create,
      deletePosts: state.newsletterPosts.delete,
      loading: state.newsletters.loading,
      fetchNewsletter: state.newsletters.fetch,
    }))
  );

  useEffect(() => {
    if (newsletterId) fetchNewsletter(newsletterId);
  }, [newsletterId, fetchNewsletter]);

  const newsletter = useNewsletter(newsletterId, newsletters);
  const posts = usePosts(newsletterId, newsletterPosts);

  const onSave = async (changes: NewsletterPostChanges) => {
    if (changes.create) {
      promiseWithNotifications.execute(createPosts(changes.create, changes.files), {
        successMsg: 'Items created!',
        errorMsg: 'Unable to create items :(',
      });
    }
    if (
      changes.delete &&
      changes.delete.ids.length > 0 &&
      newsletterId !== undefined
    ) {
      promiseWithNotifications.execute(deletePosts(newsletterId, changes.delete), {
        successMsg: 'Items deleted!',
        errorMsg: 'Unable to delete items :(',
      });
    }
    toggleEditing();
  };

  if (loading) return <CircularProgress />;
  if (!newsletter) return null;

  return (
    <>
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
        <Properties data={newsletter.properties} />
        <Members data={newsletter.members} />
        <NewsletterPostsController
          editing={editing}
          newsletterId={newsletter.id}
          existingPosts={posts}
          onSave={onSave}
        />
      </CustomContainer>
    </>
  );
}

function NewsletterSkeleton() {
  return <Skeleton variant="rectangular" width={210} height={60} />;
}
