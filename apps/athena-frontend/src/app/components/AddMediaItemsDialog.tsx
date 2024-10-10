import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNotifications } from '@toolpad/core';
import { useStore } from '../store/store';

import { Carousel } from '../components/index';
interface AddMediaItemsDialogProps {
  open: boolean;
  handleClose: () => void;
  newsletterId: number;
}
// const items: CreateNewsletterItemWithId[] = [
//   {
//     id: 1,
//     file: new File([], 'test1'),
//     newsletterId: 1,
//     title: 'test item 1',
//     details: {
//       name: 'some name',
//       location: {
//         name: null,
//         countryCode: null,
//         longitude: null,
//         lattitude: null,
//       },
//     },
//   },
//   {
//     id: 2,
//     file: new File([], 'test2'),
//     newsletterId: 1,
//     title: 'test item 2',
//     details: {
//       name: 'some name 2',
//       location: {
//         name: null,
//         countryCode: null,
//         longitude: null,
//         lattitude: null,
//       },
//     },
//   },
//   {
//     id: 3,
//     file: new File([], 'test3'),
//     newsletterId: 1,
//     title: 'test item 3',
//     details: {
//       name: 'some name 3',
//       location: {
//         name: null,
//         countryCode: null,
//         longitude: null,
//         lattitude: null,
//       },
//     },
//   },
// ];

export function AddMediaItemsDialog(props: AddMediaItemsDialogProps) {
  const { open, handleClose, newsletterId } = props;
  const { mediaItems, addMediaItem } = useStore();
  const notifications = useNotifications();

  const [uploading, setUploading] = useState(false);

  // useEffect(() => {
  //   addNewsletterItemsDispatch({
  //     entityType: 'newsletter-items',
  //     action: 'added',
  //     payload: items,
  //   });
  // }, []);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const { lastModified, name } = file;
        addMediaItem({
          tempId: Object.keys(mediaItems).length + 1,
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
    // setUploading(true);
    // const data = Array.from(addNewsletterItemsContext).map(([key, item]) => {
    //   const { file, details, title, date } = item;
    //   const { caption, format, size, location, name } = details;
    //   const {
    //     countryCode,
    //     lattitude,
    //     longitude,
    //     name: locationName,
    //   } = location;
    //   const formData = new FormData();
    //   formData.append('photo', file);
    //   formData.append('name', name);
    //   formData.append('title', title);
    //   if (date) formData.append('date', date);
    //   if (caption) formData.append('caption', caption);
    //   if (format) formData.append('format', format);
    //   if (locationName) formData.append('locationName', locationName);
    //   if (countryCode) formData.append('countryCode', countryCode);
    //   if (lattitude) formData.append('lattitude', lattitude.toString());
    //   if (longitude) formData.append('longitude', longitude.toString());
    //   return formData;
    // });
    // for (let i = 0; i < data.length; i++) {
    //   await api.upload(`/newsletters/${newsletterId}/items/photo`, data[i]);
    //   notifications.show('Item(s) added successfully!', {
    //     autoHideDuration: 3000,
    //     severity: 'success',
    //   });
    //   handleClose();
    // }
    // setUploading(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogTitle>Add Media</DialogTitle>
      <DialogContent>
        {Object.keys(mediaItems).length === 0 ? (
          <input
            type="file"
            multiple
            name="media"
            onChange={handleFileSelection}
          />
        ) : (
          <Carousel
            items={Object.keys(mediaItems).map(
              (key) => mediaItems[Number(key)]
            )}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          onClick={handleUploadFiles}
          disabled={
            Object.keys(mediaItems).length === 0 // || uploading
          }
        >
          {uploading ? <CircularProgress /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
