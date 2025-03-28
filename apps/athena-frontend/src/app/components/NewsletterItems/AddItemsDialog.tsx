// import { useShallow } from 'zustand/react/shallow';
// import { useMemo, useState } from 'react';
// import { Button, CircularProgress } from '@mui/material';
// import {
//   ActionBar,
//   BackButtonIcon,
//   AddNewsletterPosts,
//   StyledDialog,
//   StyledDialogContent,
//   StyledDialogActions,
// } from '@athena/components';
// import { useStore, useAddItemsStore } from '@athena/store';
// import { mapToArray } from '@athena/common';

// export function AddItemsDialog() {
//   const { uploading, upload } = useStore(
//     useShallow((state) => ({
//       uploading: state.newsletterItems.uploading,
//       upload: state.newsletterItems.upload,
//     }))
//   );
//   const {
//     files,
//     items,
//     existingItem,
//     reset,
//     addItem,
//     removeItem,
//     updateItemDetails,
//     newsletterId,
//   } = useAddItemsStore(
//     useShallow((state) => ({
//       existingItem: state.existingItem,
//       newsletterId: state.newsletterId,
//       files: state.files,
//       items: state.data,
//       reset: state.reset,
//       addItem: state.addItem,
//       removeItem: state.removeItem,
//       updateItemDetails: state.updateItemDetails,
//     }))
//   );

//   const [tempParentId, setTempParentId] = useState<null | string>(null);
//   const handleItemClick = (id: string) => setTempParentId(id);
//   const handleUploadFiles = async () => {
//     if (!newsletterId || !existingItem) return;
//     const position = {
//       parentId: existingItem.id,
//       nextId: null,
//       prevId: null,
//     };
//     await upload(newsletterId, position, mapToArray(items), files);
//     reset();
//   };

//   const handleBackBtnClick = () => {
//     setTempParentId((prev) => (prev ? items[prev].temp.parentId : prev));
//   };

//   const itemsArr = useMemo(
//     () => mapToArray(items).filter((i) => i.temp.parentId === tempParentId),
//     [items, tempParentId]
//   );

//   const parentItem = useMemo(
//     () => (tempParentId ? items[tempParentId] : null),
//     [tempParentId, items]
//   );

//   if (!newsletterId) return null;

//   return (
//     <StyledDialog fullScreen open={newsletterId !== null}>
//       <ActionBar
//         title="Add Items"
//         backBtn={
//           tempParentId ? <BackButtonIcon onClick={handleBackBtnClick} /> : null
//         }
//       />
//       <StyledDialogContent>
//         <AddNewsletterPosts
//           files={files}
//           newsletterId={newsletterId}
//           handleItemClick={handleItemClick}
//           parentItem={parentItem}
//           items={itemsArr}
//           addItem={addItem}
//           removeItem={removeItem}
//           updateItemDetails={updateItemDetails}
//         />
//       </StyledDialogContent>
//       <StyledDialogActions>
//         <Button onClick={reset}>Cancel</Button>
//         <Button
//           type="submit"
//           onClick={handleUploadFiles}
//           disabled={Object.keys(items).length === 0 || uploading}
//         >
//           {uploading ? <CircularProgress /> : 'Upload'}
//         </Button>
//       </StyledDialogActions>
//     </StyledDialog>
//   );
// }
