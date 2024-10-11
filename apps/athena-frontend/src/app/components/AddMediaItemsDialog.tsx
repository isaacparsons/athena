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
import { useStore } from '../store/store';

import { Carousel } from '../components/index';
import { asyncTrpcClient, trpc, trpcClient } from '../../trpc';
import { getQueryKey } from '@trpc/react-query';
import axios from 'axios';

interface AddMediaItemsDialogProps {
  open: boolean;
  handleClose: () => void;
  newsletterId: number;
}

export function AddMediaItemsDialog(props: AddMediaItemsDialogProps) {
  const { open, handleClose, newsletterId } = props;
  const createMediaItem = trpc.newsletterItems.create.useMutation();
  const { mediaItems, addMediaItem } = useStore(
    useShallow((state) => ({
      mediaItems: state.mediaItems,
      addMediaItem: state.addMediaItem,
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
    // get signed upload urls
    const items = Object.keys(mediaItems).map((i) => ({
      id: mediaItems[Number(i)].tempId.toString(),
    }));
    const signedUrls =
      await asyncTrpcClient.newsletterItems.getItemUploadLinks.query({
        items,
      });

    // signedUrls.reduce(async (promiseChain, url) => {
    //     const previousUploadededImg =
    // }, Promise.resolve())

    const item = mediaItems[Number(signedUrls[0].id)];
    const signedUrl = signedUrls[0];
    await axios.put(signedUrl.url, mediaItems[Number(signedUrl.id)].file);

    const res = await createMediaItem.mutateAsync({
      newsletterId: Number(newsletterId),
      title: item.title,
      parentId: null,
      nextItemId: null,
      previousItemId: null,
      details: {
        name: item.details.name,
        type: 'media',
        fileName: signedUrl.fileName,
      },
    });
    console.log(res);

    // sequentially upload each item, using the previous
    // uploaded items id for the previous Id, and null as nextId

    setUploading(false);
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
