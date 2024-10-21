import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Container, useTheme, Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useNotifications } from '@toolpad/core';
import { useEffect, useMemo, useState } from 'react';
import {
  BackButton,
  CustomSpeedDial,
  AddItemsDialog,
  ConfirmationDialog,
  MediaItemDetails,
  TextItemDetails,
} from '../components/index';
import EditIcon from '@mui/icons-material/Edit';
import { successNotificationOptions } from '../../config';
import { StoreNewsletter, StoreNewsletterItem, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { NewsletterMembers } from '../components/NewsletterMembers';
import { NewsletterProperties } from '../components/NewsletterProperties';
import {
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
} from '@athena/athena-common';
import { ToggleList } from '../components/ToggleList';
import { asyncTrpcClient } from '../../trpc';
import { AddItemTemplateDialog } from '../components/AddItemTemplateDialog';

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
  const [addTemplateDialogOpen, setAddTemplateDialogOpen] = useState(false);

  const handleOpenMediaItemsDialog = () => setAddMediaItemsDialogOpen(true);
  const handleCloseMediaItemsDialog = () => {
    if (newsletter) fetchNewsletter(newsletter.id);
    setAddMediaItemsDialogOpen(false);
  };
  const handleOpenAddTemplateDialog = () => setAddTemplateDialogOpen(true);
  const handleCloseAddTemplateDialog = () => {
    setAddTemplateDialogOpen(false);
  };
  const handleMakeSelectable = () => setSelectable(true);
  const handleMakeUnSelectable = () => setSelectable(false);
  const handleDeleteItemsClick = () => setConfirmDeleteDialogOpen(true);
  const handleCloseConfirmDeleteDialog = () =>
    setConfirmDeleteDialogOpen(false);

  const handleDeleteItems = async (ids: number[]) => {
    if (newsletter) {
      setDeletingItems(true);

      await deleteNewsletterItems(ids);
      fetchNewsletter(newsletter.id);
      handleCloseConfirmDeleteDialog();
      setDeletingItems(false);
      handleMakeUnSelectable();
    }

    // notifications.show('Item(s) deleted!', successNotificationOptions);
  };

  const handleSaveTemplate = async () => {
    await asyncTrpcClient.newsletterItemTemplates.create.mutate({
      name: '',
      data: [],
    });
  };

  if (loading) return <CircularProgress />;
  if (!newsletter) return null;

  return (
    <Container
      sx={{
        minHeight: '100vh',
        padding: theme.spacing(2),
      }}
      maxWidth="md"
    >
      <BackButton onClick={() => navigate('/')} />
      <NewsletterProperties properties={newsletter.properties} />

      {/* <ConfirmationDialog
        open={confirmDeleteDialogOpen}
        loading={deletingItems}
        onCloseDialog={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteItems}
        title={'Delete items'}
        content={'are you sure you want to delete the selected items?'}
      /> */}
      <AddItemTemplateDialog
        open={addTemplateDialogOpen}
        handleClose={handleCloseAddTemplateDialog}
      />
      <AddItemsDialog
        newsletterId={newsletter.id}
        open={addMediaItemsDialogOpen}
        handleClose={handleCloseMediaItemsDialog}
      />
      <NewsletterMembers members={members} />

      <ToggleList
        items={items}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
        selectable={selectable}
        onDelete={handleDeleteItems}
        renderItem={(item: StoreNewsletterItem) => {
          if (item.details?.type === 'media') {
            return (
              <MediaItemDetails
                details={item.details as NewsletterItemDetailsMedia}
              />
            );
          } else if (item.details?.type === 'text') {
            return (
              <TextItemDetails
                details={item.details as NewsletterItemDetailsText}
              />
            );
          }
        }}
      />
      <Button>Press me</Button>

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
