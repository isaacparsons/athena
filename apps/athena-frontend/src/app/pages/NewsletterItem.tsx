import { Container, useTheme } from '@mui/system';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton, NewsletterItemsList } from '../components';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';

export function NewsletterItem() {
  const params = useParams();
  const theme = useTheme();

  const newsletterId =
    params.newsletterId && !_.isNaN(params.newsletterId)
      ? _.parseInt(params.newsletterId)
      : null;
  const newsletterItemId =
    params.newsletterItemId && !_.isNaN(params.newsletterItemId)
      ? _.parseInt(params.newsletterItemId)
      : null;

  const { fetch, data, loading } = useStore(
    useShallow((state) => ({
      fetch: state.newsletterItems.fetch,
      data: state.newsletterItems.data,
      loading: state.newsletterItems.loading,
    }))
  );

  useEffect(() => {
    if (newsletterItemId !== null) fetch(newsletterItemId);
  }, [newsletterItemId, fetch]);

  const items = useMemo(() => {
    if (newsletterItemId === null) return [];
    const item = data[newsletterItemId];
    return item ? item.childrenIds.map((cId) => data[cId]) : [];
  }, [newsletterItemId, data]);

  if (!newsletterId || !newsletterItemId) return null;
  return (
    <Container
      sx={{
        minHeight: '100vh',
        padding: theme.spacing(2),
      }}
      maxWidth="md"
    >
      <BackButton />
      <NewsletterItemsList
        parentId={newsletterItemId}
        newsletterId={newsletterId}
        items={items}
      />
    </Container>
  );
}
