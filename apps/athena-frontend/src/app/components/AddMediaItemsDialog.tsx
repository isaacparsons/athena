// import {
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useNotifications } from '@toolpad/core';
// import { Carousel } from '../components/index';
// import {
//   useAPI,
//   CreateNewsletterItemWithId,
//   useAddNewsletterItemsContext,
//   useAddNewsletterItemsDispatchContext,
// } from '../context/index';

// interface AddMediaItemsDialogProps {
//   open: boolean;
//   handleClose: () => void;
//   newsletterId: number;
// }
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

// export function AddMediaItemsDialog(props: AddMediaItemsDialogProps) {
//   const { open, handleClose, newsletterId } = props;
//   const api = useAPI();
//   const addNewsletterItemsDispatch = useAddNewsletterItemsDispatchContext();
//   const addNewsletterItemsContext = useAddNewsletterItemsContext();
//   const notifications = useNotifications();

//   const [uploading, setUploading] = useState(false);

//   // useEffect(() => {
//   //   addNewsletterItemsDispatch({
//   //     entityType: 'newsletter-items',
//   //     action: 'added',
//   //     payload: items,
//   //   });
//   // }, []);

//   const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;
//     const items = [];
//     for (let i = 0; i < files.length; i++) {
//       const file = files.item(i);
//       if (file) {
//         const { lastModified, name, size, type } = file;
//         items.push({
//           id: addNewsletterItemsContext.size + i + 1,
//           title: name,
//           newsletterId,
//           file,
//           details: {
//             name,
//             format: type,
//             size,
//             location: {},
//             date: new Date(lastModified),
//           },
//         });
//       }
//     }
//     addNewsletterItemsDispatch({
//       entityType: 'newsletter-items',
//       action: 'added',
//       payload: items,
//     });
//   };

//   const handleUploadFiles = async () => {
//     setUploading(true);
//     const data = Array.from(addNewsletterItemsContext).map(([key, item]) => {
//       const { file, details, title, date } = item;
//       const { caption, format, size, location, name } = details;
//       const {
//         countryCode,
//         lattitude,
//         longitude,
//         name: locationName,
//       } = location;
//       const formData = new FormData();
//       formData.append('photo', file);
//       formData.append('name', name);
//       formData.append('title', title);
//       if (date) formData.append('date', date);
//       if (caption) formData.append('caption', caption);
//       if (format) formData.append('format', format);
//       if (locationName) formData.append('locationName', locationName);
//       if (countryCode) formData.append('countryCode', countryCode);
//       if (lattitude) formData.append('lattitude', lattitude.toString());
//       if (longitude) formData.append('longitude', longitude.toString());
//       return formData;
//     });
//     for (let i = 0; i < data.length; i++) {
//       await api.upload(`/newsletters/${newsletterId}/items/photo`, data[i]);
//       notifications.show('Item(s) added successfully!', {
//         autoHideDuration: 3000,
//         severity: 'success',
//       });
//       handleClose();
//     }
//     setUploading(false);
//   };

//   return (
//     <Dialog fullScreen open={open} onClose={handleClose}>
//       <DialogTitle>Add Media</DialogTitle>
//       <DialogContent>
//         {addNewsletterItemsContext.size === 0 ? (
//           <input
//             type="file"
//             multiple
//             name="media"
//             onChange={handleFileSelection}
//           />
//         ) : (
//           <Carousel />
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button
//           type="submit"
//           onClick={handleUploadFiles}
//           disabled={
//             Array.from(addNewsletterItemsContext).length === 0 || uploading
//           }
//         >
//           {uploading ? <CircularProgress /> : 'Upload'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
