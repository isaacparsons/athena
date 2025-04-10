import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { NewsletterPostProperties } from '@frontend/components';
import { useMemo } from 'react';
import { useStore } from '@frontend/store';
import { useShallow } from 'zustand/react/shallow';
import { MediaFormat, NewsletterPostTypeName } from '@athena/common';
import { NewsletterPostForm } from '@frontend/types';
const user = {
  id: 1,
  email: 'user1@email.com',
  firstName: 'user',
  lastName: 'one',
};
const mockPost: NewsletterPostForm = {
  id: 1,
  meta: {
    creator: user,
    modifier: null,
    created: '2025-03-24T16:42:32.271Z',
    modified: null,
  },
  newsletterId: 1,
  title: 'media post 1',
  date: null,
  details: {
    id: 1,
    type: NewsletterPostTypeName.Media,
    name: 'media post 1',
    newsletterPostId: 1,
    format: MediaFormat.Image,
    fileName: 'https://picsum.photos/1000/1000',
    caption: 'captionnnn',
  },
  position: {
    parentId: null,
    nextId: null,
    prevId: null,
  },
  tempPosition: {
    id: '1',
    nextId: null,
    prevId: null,
    parentId: null,
  },
};

export function NewsletterPost() {
  const params = useParams();

  const { newsletterItems } = useStore(
    useShallow((state) => ({
      newsletterItems: state.newsletterPosts.data,
    }))
  );

  const newsletterId =
    params.newsletterId && !_.isNaN(params.newsletterId)
      ? _.parseInt(params.newsletterId)
      : null;

  const newsletterItemId =
    params.newsletterItemId && !_.isNaN(params.newsletterItemId)
      ? _.parseInt(params.newsletterItemId)
      : null;

  const item = useMemo(
    () => (newsletterItemId !== null ? newsletterItems[newsletterItemId] : null),
    [newsletterItemId, newsletterItems]
  );

  if (newsletterId === null || !item) return null;

  return (
    <>
      <NewsletterPostProperties data={mockPost} />
    </>
    // <NewsletterPostsProvider newsletterId={newsletterId} parentId={newsletterItemId}>
    //   <NewsletterPostProperties item={item} />
    // </NewsletterPostsProvider>
  );
}
