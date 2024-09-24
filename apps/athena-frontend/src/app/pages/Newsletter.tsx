import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Container, useTheme } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useMemo, useState, useCallback } from 'react';
import BackBtn from '../components/BackButton';
import CustomSpeedDial from '../components/CustomSpeedDial';
import EditIcon from '@mui/icons-material/Edit';
import NewsletterMembers from '../components/NewsletterMembers';
import NewsletterItemsList from '../components/NewsletterItemsList';
import AddMediaItemsDialog from '../components/AddMediaItemsDialog';
import { ReadNewsletter } from 'types/types';
import { useStateContext, useStateDispatchContext } from '../context/state';
import { AddNewsletterItemsProvider } from '../context/AddNewsletterItemsProvider';
import { useAPI } from '../context/api';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useNotifications } from '@toolpad/core';
import { successNotificationOptions } from '../../config';

export function Newsletter() {
  const { newsletterId } = useParams();
  const api = useAPI();
  const notifications = useNotifications();
  const navigate = useNavigate();
  const theme = useTheme();

  const state = useStateContext();
  const dispatch = useStateDispatchContext();

  const newsletter = useMemo(() => {
    if (!newsletterId) return null;
    const id = parseInt(newsletterId);
    return state.newsletters.get(id);
  }, [state, newsletterId]);

  const members = useMemo(() => {
    if (!newsletter) return [];
    return newsletter.memberIds
      .map((id) => state.newsletterMembers.get(id))
      .filter((i) => i !== undefined);
  }, [newsletter, state.newsletterMembers]);

  const items = useMemo(() => {
    if (!newsletter) return [];
    return newsletter.itemIds
      .map((id) => state.newsletterItems.get(id))
      .filter((i) => i !== undefined);
  }, [newsletter, state.newsletterItems]);

  const [loading, setLoading] = useState(true);
  const [selectable, setSelectable] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [deletingItems, setDeletingItems] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    new Set()
  );
  const [addMediaItemsDialogOpen, setAddMediaItemsDialogOpen] = useState(false);

  const handleOpenMediaItemsDialog = () => {
    setAddMediaItemsDialogOpen(true);
  };

  const handleCloseMediaItemsDialog = () => {
    setAddMediaItemsDialogOpen(false);
    if (newsletterId) {
      getNewsletter(parseInt(newsletterId));
    }
  };

  const handleMakeSelectable = () => {
    setSelectable(true);
  };
  const handleMakeUnSelectable = () => {
    setSelectable(false);
  };

  const handleToggleSelect = (id: number) => {
    setSelectedItemIds((prev) => {
      const newSelectedItemIds = new Set(prev);
      if (newSelectedItemIds.has(id)) {
        newSelectedItemIds.delete(id);
      } else {
        newSelectedItemIds.add(id);
      }
      return newSelectedItemIds;
    });
  };

  const handleToggleSelectAll = () => {
    setSelectedItemIds((prev) => {
      const newSelectedItemIds = new Set(prev);
      if (newSelectedItemIds.size === items.length) {
        newSelectedItemIds.clear();
      } else {
        items.forEach((item) => newSelectedItemIds.add(item.id));
      }
      return newSelectedItemIds;
    });
  };

  const handleDeleteItemsClick = () => {
    setConfirmDeleteDialogOpen(true);
  };

  const handleItemsDeleted = async () => {
    if (!newsletterId) return null;
    const id = parseInt(newsletterId);

    setDeletingItems(true);
    const selectedItemsIdsArr = Array.from(selectedItemIds);
    for (let i = 0; i < selectedItemsIdsArr.length; i++) {
      await api.delete(`/newsletters/${id}/items/${selectedItemsIdsArr[i]}`);
    }
    await getNewsletter(id);
    handleCloseConfirmDeleteDialog();
    setDeletingItems(false);
    handleMakeUnSelectable();

    notifications.show('Item(s) deleted!', successNotificationOptions);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const getNewsletter = useCallback(
    async (id: number) => {
      setLoading(true);
      const response = await api.read<ReadNewsletter>(`/newsletters/${id}`);
      if (response) {
        dispatch({
          entityType: 'newsletter',
          action: 'fetched',
          payload: response,
        });
      }
      setLoading(false);
    },
    [api, dispatch]
  );

  useEffect(() => {
    if (newsletterId) {
      getNewsletter(parseInt(newsletterId));
    }
  }, [newsletterId, getNewsletter]);

  if (loading || !newsletterId) {
    return <CircularProgress />;
  }
  return (
    <Container
      sx={{
        flex: 1,
        minHeight: '100vh',
        padding: theme.spacing(2),
      }}
      maxWidth="md"
    >
      <BackBtn onClick={() => navigate('/')} />

      {loading ? (
        <CircularProgress />
      ) : (
        <AddNewsletterItemsProvider>
          <Box>
            <ConfirmationDialog
              open={confirmDeleteDialogOpen}
              loading={deletingItems}
              onCloseDialog={handleCloseConfirmDeleteDialog}
              onConfirm={handleItemsDeleted}
              title={'Delete items'}
              content={'are you sure you want to delete the selected items?'}
            />
            <AddMediaItemsDialog
              newsletterId={parseInt(newsletterId)}
              open={addMediaItemsDialogOpen}
              handleClose={handleCloseMediaItemsDialog}
            />
            <NewsletterMembers members={members} />
            <NewsletterItemsList
              onDelete={handleDeleteItemsClick}
              items={items}
              selectable={selectable}
              selectedItemIds={selectedItemIds}
              onToggleSelectAll={handleToggleSelectAll}
              onToggleSelect={handleToggleSelect}
            />
            <CustomSpeedDial
              overrideIcon={selectable ? <CloseIcon /> : null}
              onOverrideIconClick={handleMakeUnSelectable}
              actions={[
                {
                  icon: <FileUploadIcon />,
                  name: 'Media',
                  onClick: handleOpenMediaItemsDialog,
                },
                {
                  icon: <EditIcon />,
                  name: 'Edit',
                  onClick: handleMakeSelectable,
                },
              ]}
            />
          </Box>
        </AddNewsletterItemsProvider>
      )}
    </Container>
  );
}

export default Newsletter;
