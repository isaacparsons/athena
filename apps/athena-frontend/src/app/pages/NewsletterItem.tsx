import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { NewsletterItemsProvider } from '@athena/components';

export function NewsletterItem() {
  const params = useParams();

  const newsletterId =
    params.newsletterId && !_.isNaN(params.newsletterId)
      ? _.parseInt(params.newsletterId)
      : null;
  const newsletterItemId =
    params.newsletterItemId && !_.isNaN(params.newsletterItemId)
      ? _.parseInt(params.newsletterItemId)
      : null;

  if (!newsletterId || !newsletterItemId) return null;

  return (
    <NewsletterItemsProvider
      newsletterId={newsletterId}
      parentId={newsletterItemId} />
  );
}
