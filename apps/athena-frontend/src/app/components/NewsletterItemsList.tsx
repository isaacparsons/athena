import { useTheme, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { StoreNewsletterItem, useStore } from '../store';

import { ToggleList } from './ToggleList';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddItemTemplateDialog } from './AddItemTemplateDialog';
import { AddItemsDialog } from './AddItemsDialog';
import { CustomSpeedDial } from './CustomSpeedDial';
import { useShallow } from 'zustand/react/shallow';
import { NewsletterItemCard } from './common/NewsletterItemCard';
import { usePromiseWithNotification } from '../hooks/usePromiseWithNotification';

interface NewsletterItemsListProps {
  parentId: number | null;
  items: StoreNewsletterItem[];
  newsletterId: number;
}

export function NewsletterItemsList(props: NewsletterItemsListProps) {
  const { items, newsletterId, parentId } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const { fetchNewsletter, deleteNewsletterItems } = useStore(
    useShallow((state) => ({
      fetchNewsletter: state.newsletters.fetch,
      deleteNewsletterItems: state.newsletterItems.deleteItems,
    }))
  );

  const theme = useTheme();
  const navigate = useNavigate();

  const [selectable, setSelectable] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    new Set()
  );

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [deletingItems, setDeletingItems] = useState(false);
  const [addMediaItemsDialogOpen, setAddMediaItemsDialogOpen] = useState(false);
  const [addTemplateDialogOpen, setAddTemplateDialogOpen] = useState(false);

  const handleOpenMediaItemsDialog = () => setAddMediaItemsDialogOpen(true);
  const handleCloseMediaItemsDialog = () => {
    fetchNewsletter(newsletterId);
    setAddMediaItemsDialogOpen(false);
  };
  const handleOpenAddTemplateDialog = () => setAddTemplateDialogOpen(true);
  const handleCloseAddTemplateDialog = () => {
    setAddTemplateDialogOpen(false);
    handleMakeUnSelectable();
  };
  const handleMakeSelectable = () => setSelectable(true);
  const handleMakeUnSelectable = () => setSelectable(false);
  const handleDeleteItemsClick = () => setConfirmDeleteDialogOpen(true);
  const handleCloseConfirmDeleteDialog = () =>
    setConfirmDeleteDialogOpen(false);

  const handleDeleteItems = async (ids: number[]) => {
    setDeletingItems(true);
    promiseWithNotifications.execute(deleteNewsletterItems(ids), {
      successMsg: 'Items deleted!',
      errorMsg: 'Unable to delete items :(',
      onSuccess: () => {
        fetchNewsletter(newsletterId);
        handleCloseConfirmDeleteDialog();
        setDeletingItems(false);
        handleMakeUnSelectable();
      },
    });

    await deleteNewsletterItems(ids);
  };

  const selectedItems = useMemo(() => {
    const ids = Array.from(selectedItemIds);
    return items.filter((i) => ids.includes(i.id));
  }, [items, selectedItemIds]);

  return (
    <>
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
        items={selectedItems}
      />
      <AddItemsDialog
        parentId={parentId}
        newsletterId={newsletterId}
        open={addMediaItemsDialogOpen}
        handleClose={handleCloseMediaItemsDialog}
      />
      <ToggleList
        items={items}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
        selectable={selectable}
        onDelete={handleDeleteItems}
        renderItem={(item: StoreNewsletterItem) => (
          <NewsletterItemCard item={item} />
        )}
      />

      <Button onClick={handleOpenAddTemplateDialog}>Press me</Button>
      <CustomSpeedDial
        overrideIcon={selectable ? <CloseIcon /> : null}
        onOverrideIconClick={handleMakeUnSelectable}
        actions={[
          {
            icon: <FileUploadIcon />,
            name: 'Add',
            onClick: handleOpenMediaItemsDialog,
          },
          {
            icon: <EditIcon />,
            name: 'Edit',
            onClick: handleMakeSelectable,
          },
        ]}
      />
    </>
  );
}
