import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Skeleton, useTheme } from '@mui/material';
import { useNotifications } from '@toolpad/core';
import { useEffect, useMemo } from 'react';
import { BackButton, NewsletterItemsList } from '../components/index';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { NewsletterMembers } from '../components/NewsletterMembers';
import { NewsletterProperties } from '../components/NewsletterProperties';
import { CustomContainer } from '../components/common/CustomContainer';

export function Newsletter() {
  const params = useParams();
  const notifications = useNotifications();
  const navigate = useNavigate();
  const theme = useTheme();

  const newsletterId = useMemo(() => {
    if (params.newsletterId && !_.isNaN(params.newsletterId)) {
      return _.parseInt(params.newsletterId);
    }
    return null;
  }, [params]);

  const { loading, newsletters, fetchNewsletter, newsletterItems } = useStore(
    useShallow((state) => ({
      newsletters: state.newsletters.data,
      loading: state.newsletters.loading,
      fetchNewsletter: state.newsletters.fetch,
      newsletterItems: state.newsletterItems.data,
    }))
  );

  const info = useMemo(() => {
    if (newsletterId && newsletters[newsletterId]) {
      const newsletter = newsletters[newsletterId];
      return {
        newsletter: newsletter,
        items: newsletter?.itemIds.map((i) => newsletterItems[i]) ?? [],
        members: newsletter?.members ?? [],
      };
    }
  }, [newsletterId, newsletters, newsletterItems]);

  useEffect(() => {
    if (newsletterId) fetchNewsletter(newsletterId);
  }, [newsletterId, fetchNewsletter]);

  if (loading) return <CircularProgress />;
  if (!info) return null;

  return (
    <CustomContainer>
      <BackButton />
      <NewsletterProperties properties={info.newsletter.properties} />
      <NewsletterMembers members={info.members} />
      <NewsletterItemsList
        parentId={null}
        newsletterId={info.newsletter.id}
        items={info.items}
      />
    </CustomContainer>
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
