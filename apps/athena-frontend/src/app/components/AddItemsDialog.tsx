import _ from 'lodash';
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
  FormatSize as FormatSizeIcon,
  PermMedia as PermMediaIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

import { useMemo, useRef, useState } from 'react';
import { useNotifications } from '@toolpad/core';
import { useShallow } from 'zustand/react/shallow';
import { AddItemCard, BackButtonIcon } from './index';
import { NewsletterItemType, range } from '@athena/athena-common';
import { useStore, useAddItemsStore } from '../store';
import { mapToArray } from '../../util/helpers';
import { CreateItemFromTemplateDialog } from './CreateItemFromTemplateDialog';
import { ActionBar } from './common/ActionBar';

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

  const notifications = useNotifications();
  const [tempParentId, setTempParentId] = useState<null | number>(null);
  const [
    createItemFromTemplateDialogOpen,
    setCreateItemFromTemplateDialogOpen,
  ] = useState(false);

  const handleOpenCreateItemFromTemplateDialog = () =>
    setCreateItemFromTemplateDialogOpen(false);
  const handleCloseCreateItemFromTemplateDialog = () =>
    setCreateItemFromTemplateDialogOpen(false);

  const handleItemClick = (id: number) => setTempParentId(id);

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
          type: NewsletterItemType.media,
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
          type: NewsletterItemType.text,
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
      <Dialog fullScreen open={true}>
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
              startIcon={<AssignmentIcon />}
              onClick={handleOpenCreateItemFromTemplateDialog}
            >
              {'From Template'}
            </Button>
            <Button startIcon={<FormatSizeIcon />} onClick={handleAddTextItem}>
              {'Text'}
            </Button>
            <Button startIcon={<PermMediaIcon />} onClick={handleAddMediaItem}>
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
        open={createItemFromTemplateDialogOpen}
        onClose={handleCloseCreateItemFromTemplateDialog}
        onSubmit={() => console.log('on submit')}
      />
    </>
  );
}
