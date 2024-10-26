import { useTheme, Button } from '@mui/material';
import { StoreNewsletterItem, useAddItemsStore, useStore } from '../store';

import { ToggleList } from './ToggleList';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddItemTemplateDialog } from './AddItemTemplateDialog';
import { AddItemsDialog } from './AddItemsDialog';
import { useShallow } from 'zustand/react/shallow';
import { NewsletterItemCard } from './common/NewsletterItemCard';
import { usePromiseWithNotification } from '../hooks/usePromiseWithNotification';

interface NewsletterItemsListProps {
  editing: boolean;
  parentId: number | null;
  items: StoreNewsletterItem[];
  newsletterId: number;
}

export function NewsletterItemsList(props: NewsletterItemsListProps) {
  const { items, newsletterId, parentId, editing } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const { fetchNewsletter, deleteNewsletterItems } = useStore(
    useShallow((state) => ({
      fetchNewsletter: state.newsletters.fetch,
      deleteNewsletterItems: state.newsletterItems.deleteItems,
    }))
  );

  const theme = useTheme();
  const navigate = useNavigate();

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
      <Button onClick={handleOpenAddTemplateDialog}>Press me</Button>
    </>
  );
}
