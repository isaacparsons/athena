import { useMemo, useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import {
  ActionBar,
  BackButtonIcon,
  AddNewsletterItems,
} from '../components'

import { useStore, useAddItemsStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { mapToArray } from '../../util';

export function AddItemsDialog() {
  const { fetchNewsletter, fetchNewsletterItems } = useStore(
    useShallow((state) => ({
      fetchNewsletter: state.newsletters.fetch,
      fetchNewsletterItems: state.newsletterItems.fetch,
    }))
  );
  const { items, existingItem, reset, uploading, upload, addItems, removeItem, updateItemDetails } =
    useAddItemsStore(
      useShallow((state) => ({
        existingItem: state.existingItem,
        items: state.data,
        reset: state.reset,
        uploading: state.uploading,
        upload: state.upload,
        addItems: state.addItems,
        removeItem: state.removeItem,
        updateItemDetails: state.updateItemDetails
      }))
    );


  const [tempParentId, setTempParentId] = useState<null | string>(null);
  const handleItemClick = (id: string) => setTempParentId(id);
  const handleUploadFiles = async () => {
    await upload();
    if (existingItem) {
      if (existingItem.parentId === null) {
        await fetchNewsletter(Number(existingItem.newsletterId));
      } else {
        await fetchNewsletterItems(existingItem.parentId);
      }
    }
    reset();
  };

  const handleBackBtnClick = () => {
    setTempParentId((prev) => (prev ? items[prev].temp.parentId : prev));
  };

  const itemsArr = useMemo(
    () => mapToArray(items).filter((i) => i.temp.parentId === tempParentId),
    [items, tempParentId]
  );

  return (
    <Dialog fullScreen open={Boolean(existingItem)}>
      <ActionBar
        title="Add Items"
        backBtn={
          tempParentId !== null ? (
            <BackButtonIcon onClick={handleBackBtnClick} />
          ) : null
        }
      />
      <DialogContent>
        <AddNewsletterItems
          handleItemClick={handleItemClick}
          parentId={tempParentId}
          items={itemsArr}
          addItems={addItems}
          removeItem={removeItem}
          updateItemDetails={updateItemDetails}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={reset}>Cancel</Button>
        <Button
          type="submit"
          onClick={handleUploadFiles}
          disabled={Object.keys(items).length === 0 || uploading}
        >
          {uploading ? <CircularProgress /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
