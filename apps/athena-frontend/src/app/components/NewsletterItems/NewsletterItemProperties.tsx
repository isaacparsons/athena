// import { Stack, Typography } from '@mui/material';
// import { CustomLocationInput, CustomDate } from '@frontend/components';
// import { StoreNewsletterPost, useStore } from '@frontend/store';
// import { useShallow } from 'zustand/react/shallow';
// import { CreateLocation } from '@athena/common';

// interface NewsletterPostPropertiesProps {
//   item: StoreNewsletterPost;
// }

// export function NewsletterPostProperties({ item }: NewsletterPostPropertiesProps) {
//   const { editing, setUpdatedItem, updatedItem } = useStore(
//     useShallow((state) => ({
//       editing: state.newsletterItems.editing,
//       setUpdatedItem: state.newsletterItems.setUpdatedItem,
//       updatedItem: state.newsletterItems.updatedItem,
//     }))
//   );

//   const handleUpdateLocation = (location: CreateLocation) => {
//     setUpdatedItem({
//       id: item.id,
//       newsletterId: item.newsletterId,
//       ...location,
//     });
//   };

//   const handleUpdateDate = (date: string | null) => {
//     setUpdatedItem({
//       id: item.id,
//       newsletterId: item.newsletterId,
//       date,
//     });
//   };

//   return (
//     <Stack
//       sx={{
//         bgcolor: 'secondary.light',
//         borderRadius: 10,
//         p: 2,
//         mb: 1,
//       }}
//       spacing={1}
//       alignItems="flex-start"
//     >
//       <Typography variant="h6">{item.details.name}</Typography>
//       <CustomLocationInput
//         readonly={!editing}
//         location={updatedItem?.location ? updatedItem.location : item.location}
//         onChange={handleUpdateLocation}
//       />
//       <CustomDate
//         value={
//           updatedItem?.date
//             ? updatedItem.date
//             : item.date !== null
//             ? item.date
//             : undefined
//         }
//         readonly={!editing}
//         onChange={handleUpdateDate}
//       />
//     </Stack>
//   );
// }
