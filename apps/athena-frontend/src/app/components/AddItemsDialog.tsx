import _ from 'lodash';
import { useMemo, useRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,

} from '@mui/material';

import {
  CreateItemFromTemplateDialog,
  ActionBar,
  AddItemCard,
  BackButtonIcon,
} from '../components'

import {
  TextIcon,
  MediaIcon,
  TemplateIcon
} from '../icons'
import { range, NewsletterItemTypeName } from '@athena/athena-common';
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
  const { items, existingItem, addItems, reset, uploading, upload } =
    useAddItemsStore(
      useShallow((state) => ({
        existingItem: state.existingItem,
        items: state.data,
        addItems: state.addItems,
        reset: state.reset,
        uploading: state.uploading,
        upload: state.upload,
      }))
    );


  const [tempParentId, setTempParentId] = useState<null | string>(null);
  const [
    createItemFromTemplateDialogOpen,
    setCreateItemFromTemplateDialogOpen,
  ] = useState(false);

  const handleOpenCreateItemFromTemplateDialog = () =>
    setCreateItemFromTemplateDialogOpen(true);
  const handleCloseCreateItemFromTemplateDialog = () =>
    setCreateItemFromTemplateDialogOpen(false);

  const handleItemClick = (id: string) => setTempParentId(id);

  const inputFile = useRef<HTMLInputElement | null>(null);

  const itemsArr = useMemo(
    () => mapToArray(items).filter((i) => i.temp.parentId === tempParentId),
    [items, tempParentId]
  );

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _files = event.target.files;
    if (!_files) return;
    const files = range(_files.length)
      .map((idx) => _files.item(idx))
      .filter((f) => !_.isNil(f))
      .map((f) => ({
        title: '',
        date: new Date(f.lastModified).toISOString(),
        location: undefined,
        details: {
          name: f.name,
          caption: '',
          type: 'media' as NewsletterItemTypeName,
          fileName: '',
          file: f,
        },
      }));

    addItems(tempParentId, files);
  };

  const handleAddTextItem = () =>
    addItems(tempParentId, [
      {
        title: '',
        date: new Date().toISOString(),
        location: undefined,
        details: {
          name: '',
          type: 'text',
        },
      },
    ]);

  const handleAddMediaItem = () => {
    if (inputFile.current) inputFile.current.click();
  };

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

  return (
    <>
      <Dialog fullScreen open={Boolean(existingItem)}>
        <ActionBar
          backBtn={
            tempParentId !== null ? (
              <BackButtonIcon onClick={handleBackBtnClick} />
            ) : null
          }
        />
        <DialogTitle>Add Items</DialogTitle>
        <DialogContent>
          <input
            type="file"
            multiple
            ref={inputFile}
            style={{ display: 'none' }}
            name="media"
            onChange={handleFileSelection}
          />
          <List>
            {itemsArr.map((item) => (
              <ListItem key={item.temp.id}>
                <AddItemCard
                  item={item}
                  onClick={() => handleItemClick(item.temp.id)}
                />
              </ListItem>
            ))}
          </List>
          <ButtonGroup>
            <Button
              startIcon={<TemplateIcon />}
              onClick={handleOpenCreateItemFromTemplateDialog}
            >
              {'From Template'}
            </Button>
            <Button startIcon={<TextIcon />} onClick={handleAddTextItem}>
              {'Text'}
            </Button>
            <Button startIcon={<MediaIcon />} onClick={handleAddMediaItem}>
              {'Media'}
            </Button>
          </ButtonGroup>
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
      <CreateItemFromTemplateDialog
        parentId={tempParentId}
        open={createItemFromTemplateDialogOpen}
        onClose={handleCloseCreateItemFromTemplateDialog}
      />
    </>
  );
}
