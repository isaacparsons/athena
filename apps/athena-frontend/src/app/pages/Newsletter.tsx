import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Container, useTheme } from '@mui/material';
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
  const newsletterId = useMemo(() => {
    if (params.newsletterId && !_.isNaN(params.newsletterId)) {
      return _.parseInt(params.newsletterId);
    }
    return null;
  }, [params]);

  const {
    loading,
    newsletters,
    fetchNewsletter,
    getNewsletterById,
    newsletterItems,
  } = useStore(
    useShallow((state) => ({
      newsletters: state.newsletters.data,
      loading: state.newsletters.loading,
      getNewsletterById: state.newsletters.getNewsletterById,
      fetchNewsletter: state.newsletters.fetch,
      newsletterItems: state.newsletterItems.data,
      getNewsletterItems: state.newsletterItems.getItems,
    }))
  );

  const notifications = useNotifications();
  const navigate = useNavigate();
  const theme = useTheme();

  const newsletter = useMemo(
    () => (newsletterId ? getNewsletterById(newsletterId) : null),
    [newsletterId, getNewsletterById, newsletters]
  );
  const items = useMemo(
    () => (newsletter ? newsletter.itemIds.map((i) => newsletterItems[i]) : []),
    [newsletterItems, newsletter]
  );

  const members = useMemo(
    () => (newsletter ? newsletter.members : []),
    [newsletter]
  );

  useEffect(() => {
    if (newsletterId) fetchNewsletter(newsletterId);
  }, [newsletterId]);

  if (loading) return <CircularProgress />;
  if (!newsletter) return null;

  return (
    <CustomContainer>
      <BackButton />
      <NewsletterProperties properties={newsletter.properties} />
      <NewsletterMembers members={members} />
      <NewsletterItemsList
        parentId={null}
        newsletterId={newsletter.id}
        items={items}
      />
    </CustomContainer>
  );
}
