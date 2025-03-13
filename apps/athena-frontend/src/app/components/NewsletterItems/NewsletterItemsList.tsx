import { useShallow } from 'zustand/react/shallow';
import { useMemo, useState } from 'react';
import { Fab } from '@mui/material';
import {
  ToggleList,
  NewsletterPostCard,
  AddItemsDialog,
  AddItemTemplateDialog,
} from '@athena/components';
import { DeleteIcon, TemplateIcon } from '@athena/icons';
import { StoreNewsletterPost, useStore } from '@athena/store';
import { usePromiseWithNotification } from '@athena/hooks';

interface NewsletterPostsListProps {
  items: StoreNewsletterPost[];
  newsletterId: number;
  parentId: number | null;
}

export function NewsletterPostsList({
  items,
  newsletterId,
  parentId,
}: NewsletterPostsListProps) {
  const promiseWithNotifications = usePromiseWithNotification();
  const {
    fetchNewsletter,
    deleteNewsletterPosts,
    selectedItemIds,
    selectItemIds,
    editing,
    setEditing,
  } = useStore(
    useShallow((state) => ({
      fetchNewsletter: state.newsletters.fetch,
      deleteNewsletterPosts: state.newsletterItems.deleteItems,
      selectedItemIds: state.newsletterItems.selectedItemIds,
      selectItemIds: state.newsletterItems.selectItemIds,
      editing: state.newsletterItems.editing,
      setEditing: state.newsletterItems.setEditing,
    }))
  );

  const [deletingItems, setDeletingItems] = useState(false);
  const [addTemplateDialogOpen, setAddTemplateDialogOpen] = useState(false);

  const handleOpenAddTemplateDialog = () => setAddTemplateDialogOpen(true);
  const handleCloseAddTemplateDialog = () => {
    setAddTemplateDialogOpen(false);
    handleFinishEditing();
  };
  const handleFinishEditing = () => {
    selectItemIds([]);
    setEditing(false);
  };
  const handleDeleteItems = async () => {
    setDeletingItems(true);
    promiseWithNotifications.execute(deleteNewsletterPosts(newsletterId), {
      successMsg: 'Items deleted!',
      errorMsg: 'Unable to delete items :(',
      onSuccess: () => {
        fetchNewsletter(newsletterId);
        setDeletingItems(false);
        handleFinishEditing();
      },
    });
  };

  const filteredItems = useMemo(
    () => items.filter((i) => i.position.parentId === parentId),
    [items, parentId]
  );

  const selectedItems = useMemo(() => {
    return filteredItems.filter((i) => selectedItemIds.includes(i.id));
  }, [filteredItems, selectedItemIds]);

  return (
    <>
      {editing && (
        <Fab
          disabled={selectedItemIds.length === 0}
          onClick={handleDeleteItems}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: 'red',
            color: 'white',
          }}
        >
          <DeleteIcon />
        </Fab>
      )}
      {selectedItems.length > 0 && (
        <Fab
          variant="extended"
          onClick={handleOpenAddTemplateDialog}
          sx={{ position: 'fixed', bottom: 32 }}
        >
          <TemplateIcon sx={{ mr: 1 }} />
          Create Template
        </Fab>
      )}

      <AddItemTemplateDialog
        newsletterId={newsletterId}
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
        renderItem={(props) => <NewsletterPostCard {...props} />}
      />
    </>
  );
}
