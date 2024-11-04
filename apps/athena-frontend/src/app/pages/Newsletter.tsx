import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import {

  ActionBar,
  CustomContainer,
  NewsletterProperties,
  NewsletterMembers,
  BackButton,
  NewsletterItemsList
} from '../components';
import {
  CircularProgress,
  IconButton,
  Skeleton,
} from '@mui/material'
import { useAddItemsStore, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { EditIcon, AddIcon, CloseIcon } from '../icons';
import { mapToArray } from '../../util';

export function Newsletter() {
  const params = useParams();

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

  const { openDialog } = useAddItemsStore(
    useShallow((state) => ({ openDialog: state.openDialog }))
  );

  const [editing, setEditing] = useState(false);

  const info = useMemo(() => {
    if (newsletterId && newsletters[newsletterId]) {
      const newsletter = newsletters[newsletterId];
      return {
        newsletter: newsletter,
        items: newsletter?.itemIds.map((i) => newsletterItems[i]).filter((i) => i.parentId === null) ?? [],
        members: newsletter?.members ?? [],
      };
    }
  }, [newsletterId, newsletters, newsletterItems]);

  useEffect(() => {
    if (newsletterId) fetchNewsletter(newsletterId);
  }, [newsletterId, fetchNewsletter]);

  const lastItemId = useMemo(() => {
    const lastItem = mapToArray(newsletterItems).find(
      (i) => i.nextItemId === null
    );
    return lastItem?.id ?? null;
  }, [newsletterItems]);

  const handleOpenMediaItemsDialog = () => {
    if (newsletterId)
      openDialog({
        newsletterId: newsletterId,
        parentId: null,
        previousItemId: lastItemId,
        nextItemId: null,
      });
  };

  if (loading) return <CircularProgress />;
  if (!info) return null;

  return (
    <>
      <ActionBar backBtn={<BackButton />}>
        {!editing && <IconButton size="large" onClick={handleOpenMediaItemsDialog}>
          <AddIcon htmlColor="#fff" fontSize="inherit" />
        </IconButton>}
        <IconButton size="large" onClick={() => setEditing(prev => !prev)}>
          {editing ? <CloseIcon sx={{ color: 'secondary.light' }} /> :
            <EditIcon htmlColor="#fff" fontSize="inherit" />}
        </IconButton>
      </ActionBar>
      <CustomContainer>
        <NewsletterProperties properties={info.newsletter.properties} />
        <NewsletterMembers members={info.members} />
        <NewsletterItemsList
          editing={editing}
          stopEditing={() => setEditing(false)}
          newsletterId={info.newsletter.id}
          items={info.items}
        />
      </CustomContainer>
    </>
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
