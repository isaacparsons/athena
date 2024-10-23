import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  SpeedDial,
  SpeedDialAction,
} from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useMemo, useRef, useState } from 'react';
import { useNotifications } from '@toolpad/core';
import { useShallow } from 'zustand/react/shallow';
import { AddItemCard, CustomSpeedDial } from './index';
import { asyncTrpcClient } from '../../trpc';
import axios from 'axios';
import { ItemUploadLink, NewsletterItemType } from '@athena/athena-common';
import {
  StoreAddNewsletterMediaItem,
  StoreItems,
  useStore,
  StoreItem,
  StoreAddNewsletterTextItem,
  useAddItemsStore,
} from '../store';

interface AddItemsDialogProps {
  open: boolean;
  handleClose: () => void;
  newsletterId: number;
  parentId: number | null;
}

type UploadItem = {
  signedUrl: ItemUploadLink;
  item: StoreAddNewsletterMediaItem;
};

const mapItemsToArray = (items: StoreItems): StoreItem[] =>
  Object.keys(items).map((i) => items[Number(i)]);

async function uploadMediaItem(
  newsletterId: number,
  previousItemId: number | null,
  parentId: number | null,
  uploadItem: UploadItem
) {
  const signedUrl = uploadItem.signedUrl;
  const item = uploadItem.item;
  await axios.put(signedUrl.url, item.file);

  return asyncTrpcClient.newsletterItems.create.mutate({
    newsletterId: Number(newsletterId),
    title: item.title,
    parentId: parentId,
    nextItemId: null,
    previousItemId: previousItemId,
    details: {
      name: item.details.name,
      type: NewsletterItemType.media,
      fileName: signedUrl.fileName,
    },
  });
}

async function uploadTextItem(
  newsletterId: number,
  previousItemId: number | null,
  parentId: number | null,
  item: StoreAddNewsletterTextItem
) {
  return asyncTrpcClient.newsletterItems.create.mutate({
    newsletterId: Number(newsletterId),
    title: item.title,
    parentId: parentId,
    nextItemId: null,
    previousItemId: previousItemId,
    details: {
      name: item.details.name,
      description: item.details.description ?? undefined,
      link: item.details.link ?? undefined,
      type: NewsletterItemType.text,
    },
  });
}

export function AddItemsDialog(props: AddItemsDialogProps) {
  const { open, handleClose, newsletterId, parentId } = props;
  const { fetchNewsletter, fetchNewsletterItems } = useStore(
    useShallow((state) => ({
      fetchNewsletter: state.newsletters.fetch,
      fetchNewsletterItems: state.newsletterItems.fetch,
    }))
  );
  const { items, addItem } = useAddItemsStore(
    useShallow((state) => ({
      items: state.items,
      addItem: state.addItem,
    }))
  );
  const notifications = useNotifications();
  const [uploading, setUploading] = useState(false);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const { lastModified, name } = file;
        addItem({
          tempId: Object.keys(items).length + i + 1,
          title: name,
          date: new Date(lastModified).toISOString(),
          location: undefined,
          details: {
            name: name,
            caption: '',
            type: 'media',
          },
          file: file,
        });
      }
    }
  };

  const handleUploadFiles = async () => {
    setUploading(true);
    const itemsArr = mapItemsToArray(items);
    const mediaItems = itemsArr.filter((i) => i.details.type === 'media');
    const mediaItemIds = mediaItems.map((i) => ({ id: i.tempId.toString() }));
    const signedUrls =
      await asyncTrpcClient.newsletterItems.getItemUploadLinks.query({
        items: mediaItemIds,
      });

    await itemsArr.reduce(
      async (promiseChain: Promise<number | null>, item) => {
        const previousUploadedItemId = await promiseChain;

        if (item.details.type === 'media') {
          const url = signedUrls.find((i) => Number(i.id) === item.tempId);
          if (url) {
            return uploadMediaItem(
              newsletterId,
              previousUploadedItemId,
              parentId,
              {
                item: item as StoreAddNewsletterMediaItem,
                signedUrl: url,
              }
            );
          } else return promiseChain;
        } else if (item.details.type === 'text') {
          return uploadTextItem(
            newsletterId,
            previousUploadedItemId,
            parentId,
            item as StoreAddNewsletterTextItem
          );
        } else return promiseChain;
      },
      Promise.resolve(null)
    );
    if (parentId === null) {
      await fetchNewsletter(Number(newsletterId));
    } else {
      await fetchNewsletterItems(parentId);
    }
    setUploading(false);
    handleClose();
  };

  const itemsArr = useMemo(() => {
    return Object.keys(items).map((key) => items[Number(key)]);
  }, [items]);

  const handleAddTextItem = () => {
    addItem({
      tempId: Object.keys(items).length + 1,
      title: '',
      date: new Date().toISOString(),
      location: undefined,
      details: {
        name: '',
        description: null,
        link: null,
        type: 'text',
      },
    });
  };
  const inputFile = useRef<HTMLInputElement | null>(null);
  const handleAddMediaItem = () => {
    if (inputFile.current) inputFile.current.click();
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <CustomSpeedDial
        styles={{ bottom: 64 }}
        overrideIcon={<SpeedDialIcon />}
        actions={[
          {
            icon: <AssignmentIcon />,
            name: 'From Template',
            onClick: () => console.log('template'),
          },
          {
            icon: <FormatSizeIcon />,
            name: 'Text',
            onClick: handleAddTextItem,
          },
          {
            icon: <PermMediaIcon />,
            name: 'Media',
            onClick: handleAddMediaItem,
          },
        ]}
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
          {itemsArr.map((item) => {
            return (
              <ListItem sx={{ padding: 0 }} key={item.tempId}>
                <AddItemCard item={item} />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
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
