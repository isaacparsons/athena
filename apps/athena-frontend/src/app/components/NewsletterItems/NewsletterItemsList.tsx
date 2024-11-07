import { useMemo, useState } from 'react';
import { Fab } from '@mui/material';
import { ToggleList, NewsletterItemCard, AddItemsDialog, AddItemTemplateDialog } from '..';
import { DeleteIcon, TemplateIcon } from '../../icons';
import { StoreNewsletterItem, useStore } from '../../store';
import { useShallow } from 'zustand/react/shallow';
import { usePromiseWithNotification } from '../../hooks';


interface NewsletterItemsListProps {
  items: StoreNewsletterItem[];
  newsletterId: number;
  parentId: number | null;
}

export function NewsletterItemsList({ items, newsletterId, parentId }: NewsletterItemsListProps) {
  const promiseWithNotifications = usePromiseWithNotification();
  const { fetchNewsletter, deleteNewsletterItems, selectedItemIds, selectItemIds, editing, setEditing } = useStore(
    useShallow((state) => ({
      fetchNewsletter: state.newsletters.fetch,
      deleteNewsletterItems: state.newsletterItems.deleteItems,
      selectedItemIds: state.newsletterItems.selectedItemIds,
      selectItemIds: state.newsletterItems.selectItemIds,
      editing: state.newsletterItems.editing,
      setEditing: state.newsletterItems.setEditing
    }))
  );

  const [deletingItems, setDeletingItems] = useState(false);
  const [addTemplateDialogOpen, setAddTemplateDialogOpen] = useState(false);

  const handleOpenAddTemplateDialog = () => setAddTemplateDialogOpen(true);
  const handleCloseAddTemplateDialog = () => {
    setAddTemplateDialogOpen(false);
    handleFinishEditing()
  };
  const handleFinishEditing = () => {
    selectItemIds([])
    setEditing(false)
  }
  const handleDeleteItems = async (ids: number[]) => {
    setDeletingItems(true);
    promiseWithNotifications.execute(deleteNewsletterItems(ids), {
      successMsg: 'Items deleted!',
      errorMsg: 'Unable to delete items :(',
      onSuccess: () => {
        fetchNewsletter(newsletterId);
        setDeletingItems(false);
        handleFinishEditing()
      },
    });
  };

  const filteredItems = useMemo(() => items.filter((i) => i.parentId === parentId), [items, parentId]);

  const selectedItems = useMemo(() => {
    return filteredItems.filter((i) => selectedItemIds.includes(i.id));
  }, [filteredItems, selectedItemIds]);

  return (
    <>

      {editing && <Fab
        disabled={selectedItemIds.length === 0}
        onClick={() => handleDeleteItems(Array.from(selectedItemIds))}
        sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'red', color: 'white' }}>
        <DeleteIcon />
      </Fab>}
      {selectedItems.length > 0 && <Fab variant="extended" onClick={handleOpenAddTemplateDialog} sx={{ position: 'fixed', bottom: 32 }}>
        <TemplateIcon sx={{ mr: 1 }} />
        Create Template
      </Fab>}

      <AddItemTemplateDialog
        open={addTemplateDialogOpen}
        handleClose={handleCloseAddTemplateDialog}
        items={selectedItems}
      />
      <AddItemsDialog />
      <ToggleList
        items={filteredItems}
        selectedItemIds={new Set(selectedItemIds)}
        setSelectedItemIds={(items) => selectItemIds(Array.from(items))}
        selectable={editing}
        renderItem={(props) => (<NewsletterItemCard {...props} />)}
      />
    </>
  );
}
