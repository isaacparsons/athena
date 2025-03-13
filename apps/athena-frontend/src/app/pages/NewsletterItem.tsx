import _ from 'lodash';
import { useParams } from 'react-router-dom';
import {
  NewsletterPostProperties,
  NewsletterPostsProvider,
} from '@athena/components';
import { useMemo } from 'react';
import { useStore } from '@athena/store';
import { useShallow } from 'zustand/react/shallow';

export function NewsletterPost() {
  const params = useParams();

  const { newsletterItems } = useStore(
    useShallow((state) => ({
      newsletterItems: state.newsletterItems.data,
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
    <NewsletterPostsProvider newsletterId={newsletterId} parentId={newsletterItemId}>
      <NewsletterPostProperties item={item} />
    </NewsletterPostsProvider>
  );
}
