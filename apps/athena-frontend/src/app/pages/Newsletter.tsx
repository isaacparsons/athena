import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Container, useTheme } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useNotifications } from '@toolpad/core';
import { useEffect, useMemo, useState } from 'react';
import {
  BackButton,
  CustomSpeedDial,
  AddMediaItemsDialog,
  ConfirmationDialog,
  NewsletterItemsList,
} from '../components/index';
import EditIcon from '@mui/icons-material/Edit';
import { successNotificationOptions } from '../../config';
import { StoreNewsletter, StoreNewsletterItem, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { NewsletterMembers } from '../components/NewsletterMembers';
import { NewsletterProperties } from '../components/NewsletterProperties';

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
    deleteNewsletterItems,
  } = useStore(
    useShallow((state) => ({
      newsletters: state.newsletters.data,
      loading: state.newsletters.loading,
      getNewsletterById: state.newsletters.getNewsletterById,
      fetchNewsletter: state.newsletters.fetch,
      newsletterItems: state.newsletterItems.data,
      getNewsletterItems: state.newsletterItems.getItems,
      deleteNewsletterItems: state.newsletterItems.deleteItems,
    }))
  );

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

  const notifications = useNotifications();
  const navigate = useNavigate();
  const theme = useTheme();

  const [selectable, setSelectable] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [deletingItems, setDeletingItems] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    new Set()
  );
  const [addMediaItemsDialogOpen, setAddMediaItemsDialogOpen] = useState(false);

  const handleOpenMediaItemsDialog = () => setAddMediaItemsDialogOpen(true);
  const handleCloseMediaItemsDialog = () => {
    if (newsletter) fetchNewsletter(newsletter.id);
    setAddMediaItemsDialogOpen(false);
  };
  const handleMakeSelectable = () => setSelectable(true);
  const handleMakeUnSelectable = () => setSelectable(false);
  const handleDeleteItemsClick = () => setConfirmDeleteDialogOpen(true);
  const handleCloseConfirmDeleteDialog = () =>
    setConfirmDeleteDialogOpen(false);

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

  const handleItemsDeleted = async () => {
    if (newsletter) {
      setDeletingItems(true);

      await deleteNewsletterItems(Array.from(selectedItemIds));
      fetchNewsletter(newsletter.id);
      handleCloseConfirmDeleteDialog();
      setDeletingItems(false);
      handleMakeUnSelectable();
    }

    // notifications.show('Item(s) deleted!', successNotificationOptions);
  };

  if (loading) return <CircularProgress />;
  if (!newsletter) return null;

  return (
    <Container
      sx={{
        flex: 1,
        minHeight: '100vh',
        padding: theme.spacing(2),
      }}
      maxWidth="md"
    >
      <BackButton onClick={() => navigate('/')} />
      <NewsletterProperties properties={newsletter.properties} />

      <ConfirmationDialog
        open={confirmDeleteDialogOpen}
        loading={deletingItems}
        onCloseDialog={handleCloseConfirmDeleteDialog}
        onConfirm={handleItemsDeleted}
        title={'Delete items'}
        content={'are you sure you want to delete the selected items?'}
      />
      <AddMediaItemsDialog
        newsletterId={newsletter.id}
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
    </Container>
  );
}
