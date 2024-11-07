import { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import {
  NewsletterProperties,
  NewsletterMembers,
  NewsletterItemsProvider
} from '../components';
import {
  CircularProgress,
  Skeleton,
} from '@mui/material'
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';

export function Newsletter() {
  const params = useParams();

  const newsletterId = useMemo(() => {
    if (params.newsletterId && !_.isNaN(params.newsletterId)) {
      return _.parseInt(params.newsletterId);
    }
    return null;
  }, [params]);

  const { loading, newsletters, fetchNewsletter } = useStore(
    useShallow((state) => ({
      newsletters: state.newsletters.data,
      loading: state.newsletters.loading,
      fetchNewsletter: state.newsletters.fetch,
    }))
  );
  const newsletter = useMemo(() => {
    if (newsletterId && newsletters[newsletterId]) {
      return newsletters[newsletterId];
    }
  }, [newsletterId, newsletters]);

  useEffect(() => {
    if (newsletterId) fetchNewsletter(newsletterId);
  }, [newsletterId, fetchNewsletter]);

  if (loading) return <CircularProgress />;
  if (!newsletter) return null;

  return (
    <NewsletterItemsProvider newsletterId={newsletter.id} parentId={null}>
      <NewsletterProperties properties={newsletter.properties} />
      <NewsletterMembers members={newsletter.members} />
    </NewsletterItemsProvider>

  );
}
{
  /* <Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width={210} height={60} /> 
<Skeleton variant="rounded" width={210} height={60} />*/
}

function NewsletterSkeleton() {
  return <Skeleton variant="rectangular" width={210} height={60} />;
}
