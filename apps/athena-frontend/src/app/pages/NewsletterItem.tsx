import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { NewsletterItemsList } from '../components';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { CustomContainer } from '../components/common/CustomContainer';

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

  const { fetch, newsletterItems, loading } = useStore(
    useShallow((state) => ({
      fetch: state.newsletterItems.fetch,
      newsletterItems: state.newsletterItems.data,
      loading: state.newsletterItems.loading,
    }))
  );

  useEffect(() => {
    if (newsletterItemId !== null) fetch(newsletterItemId);
  }, [newsletterItemId, fetch]);

  const items = useMemo(() => {
    if (newsletterItemId === null) return [];
    const item = newsletterItems[newsletterItemId];
    return item ? item.childrenIds.map((cId) => newsletterItems[cId]) : [];
  }, [newsletterItemId, newsletterItems]);

  if (!newsletterId || !newsletterItemId) return null;
  return (
    <CustomContainer>
      {/* <BackButton /> */}
      <NewsletterItemsList
        editing={false}
        parentId={newsletterItemId}
        newsletterId={newsletterId}
        items={items}
      />
    </CustomContainer>
  );
}
