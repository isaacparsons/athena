// import { useShallow } from 'zustand/react/shallow';
// import { useMemo, useState } from 'react';
// import {
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
// } from '@mui/material';
// import { mapToArray } from '@athena/common';
// import { convertFromTemplateItems } from '../../../util';
// import { useAddItemsStore, useStore } from '@athena/store';
// import { CustomCard, CustomList, CustomListItem } from '@athena/components';

// interface AddItemFromTemplateDialogProps {
//   parentId: string | null;
//   open: boolean;
//   onClose: () => void;
// }

// export function AddItemFromTemplateDialog(props: AddItemFromTemplateDialogProps) {
//   const { parentId, open, onClose } = props;

//   const { loading, newsletterItemTemplates, fetchTemplate } = useStore(
//     useShallow((state) => ({
//       newsletterItemTemplates: state.newsletterItemTemplates.data,
//       fetchTemplate: state.newsletterItemTemplates.fetch,
//       loading: state.newsletterItemTemplates.loading,
//     }))
//   );

//   const { addItem, newsletterId } = useAddItemsStore(
//     useShallow((state) => ({
//       items: state.data,
//       newsletterId: state.newsletterId,
//       addItem: state.addItem,
//     }))
//   );

//   const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

//   const templates = useMemo(
//     () => mapToArray(newsletterItemTemplates),
//     [newsletterItemTemplates]
//   );

//   const handleTemplateSelected = (id: number) => {
//     setSelectedTemplateId((prev) => (prev === id ? null : id));
//   };

//   const handleAddTemplate = async () => {
//     if (selectedTemplateId !== null && newsletterId) {
//       const template = await fetchTemplate(selectedTemplateId);
//       const parentItem = template.items.find((i) => i.position.parentId === null);
//       const templateItems = template.items
//         .map((i) => ({
//           ...i,
//           parentId:
//             i.position.parentId === parentItem?.id ? null : i.position.parentId,
//         }))
//         .filter((i) => i.data);
//       convertFromTemplateItems(newsletterId, templateItems).forEach((t) =>
//         addItem(parentId, t)
//       );
//       onClose();
//     }
//   };

//   return (
//     <Dialog fullWidth open={open} onClose={() => onClose()}>
//       <DialogTitle>{'Create from template'}</DialogTitle>
//       <DialogContent sx={{ width: '100%' }}>
//         <CustomList>
//           {templates.map((template) => (
//             <CustomListItem id={template.id}>
//               <CustomCard
//                 onClick={() => handleTemplateSelected(template.id)}
//                 bgColor={
//                   selectedTemplateId === template.id
//                     ? 'primary.main'
//                     : 'secondary.light'
//                 }
//               >
//                 <Typography
//                   sx={{
//                     color:
//                       selectedTemplateId === template.id
//                         ? 'secondary.light'
//                         : 'primary.main',
//                   }}
//                 >
//                   {template.name}
//                 </Typography>
//               </CustomCard>
//             </CustomListItem>
//           ))}
//         </CustomList>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => onClose()}>Cancel</Button>
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           <Button onClick={handleAddTemplate} autoFocus>
//             submit
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// }
