import { useMemo, useState } from 'react';
import { Fab } from '@mui/material';
import { ToggleList, NewsletterItemCard, AddItemsDialog, AddItemTemplateDialog } from '../components';
import { CloseIcon, TemplateIcon } from '../icons';
import { StoreNewsletterItem, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { usePromiseWithNotification } from '../hooks';


interface NewsletterItemsListProps {
  editing: boolean;
  stopEditing?: () => void;
  items: StoreNewsletterItem[];
  newsletterId: number;
}

export function NewsletterItemsList(props: NewsletterItemsListProps) {
  const { items, newsletterId, editing, stopEditing } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const { fetchNewsletter, deleteNewsletterItems } = useStore(
    useShallow((state) => ({
      fetchNewsletter: state.newsletters.fetch,
      deleteNewsletterItems: state.newsletterItems.deleteItems,
    }))
  );

  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    new Set()
  );

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [deletingItems, setDeletingItems] = useState(false);

  const [addTemplateDialogOpen, setAddTemplateDialogOpen] = useState(false);

  const handleOpenAddTemplateDialog = () => setAddTemplateDialogOpen(true);
  const handleCloseAddTemplateDialog = () => {
    setAddTemplateDialogOpen(false);
    // handleMakeUnSelectable();
  };

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
      {editing &&
        <>
          <Fab onClick={stopEditing} sx={{ position: 'fixed', bottom: 32, right: 32, bgcolor: 'red', color: 'white' }}>
            <CloseIcon />
          </Fab>
          {selectedItems.length > 0 && <Fab variant="extended" onClick={handleOpenAddTemplateDialog} sx={{ position: 'fixed', bottom: 32 }}>
            <TemplateIcon sx={{ mr: 1 }} />
            Create Template
          </Fab>}
        </>
      }

      <AddItemTemplateDialog
        open={addTemplateDialogOpen}
        handleClose={handleCloseAddTemplateDialog}
        items={selectedItems}
      />
      <AddItemsDialog />
      <ToggleList
        items={items}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
        selectable={editing}
        onDelete={handleDeleteItems}
        renderItem={(item: StoreNewsletterItem) => (
          <NewsletterItemCard item={item} />
        )}
      />
    </>
  );
}
