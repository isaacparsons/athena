import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useNotifications } from '@toolpad/core';
import { useShallow } from 'zustand/react/shallow';
import { Carousel } from '../components/index';
import { asyncTrpcClient } from '../../trpc';
import axios from 'axios';
import { ItemUploadLink } from '@athena/athena-common';
import {
  StoreAddNewsletterMediaItem,
  StoreMediaItems,
  useStore,
} from '../store';

interface AddMediaItemsDialogProps {
  open: boolean;
  handleClose: () => void;
  newsletterId: number;
}

type UploadItem = {
  signedUrl: ItemUploadLink;
  item: StoreAddNewsletterMediaItem;
};

const mapMediaItemsToArray = (
  items: StoreMediaItems
): StoreAddNewsletterMediaItem[] =>
  Object.keys(items).map((i) => items[Number(i)]);

function matchSignedUrlWithItem(
  signedUrls: ItemUploadLink[],
  items: StoreMediaItems
) {
  return signedUrls.map((su) => ({
    signedUrl: su,
    item: items[Number(su.id)],
  }));
}

async function uploadMediaItem(
  newsletterId: number,
  previousItemId: number | null,
  uploadItem: UploadItem
) {
  const signedUrl = uploadItem.signedUrl;
  const item = uploadItem.item;
  await axios.put(signedUrl.url, item.file);

  return asyncTrpcClient.newsletterItems.create.mutate({
    newsletterId: Number(newsletterId),
    title: item.title,
    parentId: null,
    nextItemId: null,
    previousItemId: previousItemId,
    details: {
      name: item.details.name,
      type: 'media',
      fileName: signedUrl.fileName,
    },
  });
}

export function AddMediaItemsDialog(props: AddMediaItemsDialogProps) {
  const { open, handleClose, newsletterId } = props;
  const { mediaItems, addMediaItem, fetchNewsletter } = useStore(
    useShallow((state) => ({
      mediaItems: state.mediaItems,
      addMediaItem: state.addMediaItem,
      fetchNewsletter: state.newsletters.fetch,
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
        addMediaItem({
          tempId: Object.keys(mediaItems).length + i + 1,
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
    const itemsArr = mapMediaItemsToArray(mediaItems);
    const itemIds = itemsArr.map((i) => ({ id: i.tempId.toString() }));
    const signedUrls =
      await asyncTrpcClient.newsletterItems.getItemUploadLinks.query({
        items: itemIds,
      });

    const uploadItems = matchSignedUrlWithItem(signedUrls, mediaItems);

    await uploadItems.reduce(
      async (promiseChain: Promise<number | null>, uploadItem) => {
        const previousUploadedItemId = await promiseChain;

        return uploadMediaItem(
          newsletterId,
          previousUploadedItemId,
          uploadItem
        );
      },
      Promise.resolve(null)
    );
    await fetchNewsletter(Number(newsletterId));
    setUploading(false);
    handleClose();
  };

  const addItemsVisible = useMemo(() => {
    return Object.keys(mediaItems).length === 0;
  }, [mediaItems]);

  const items = useMemo(() => {
    return Object.keys(mediaItems).map((key) => mediaItems[Number(key)]);
  }, [mediaItems]);

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogTitle>Add Media</DialogTitle>
      <DialogContent>
        {addItemsVisible ? (
          <input
            type="file"
            multiple
            name="media"
            onChange={handleFileSelection}
          />
        ) : (
          <Carousel items={items} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          onClick={handleUploadFiles}
          disabled={Object.keys(mediaItems).length === 0 || uploading}
        >
          {uploading ? <CircularProgress /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
