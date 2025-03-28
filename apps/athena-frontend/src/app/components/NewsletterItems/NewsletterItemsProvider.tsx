// import _ from 'lodash';
// import { useShallow } from 'zustand/react/shallow';
// import { CircularProgress, IconButton } from '@mui/material';
// import { useMemo } from 'react';
// import {
//   ActionBar,
//   CustomContainer,
//   BackButton,
//   NewsletterPostsList,
//   CustomFab,
// } from '@athena/components';
// import { useAddItemsStore, useStore } from '@athena/store';
// import { EditIcon, CloseIcon } from '@athena/icons';
// import { mapToArray } from '@athena/common';

// interface NewsletterPostsProvider {
//   newsletterId: number;
//   parentId: number | null;
//   children?: React.ReactNode;
// }

// export function NewsletterPostsProvider({
//   newsletterId,
//   parentId,
//   children,
// }: NewsletterPostsProvider) {
//   const { loading, newsletterItems, editing, setEditing } = useStore(
//     useShallow((state) => ({
//       // newsletters: state.newsletters.data,
//       loading: state.newsletters.loading,
//       newsletterItems: state.newsletterItems.data,
//       editing: state.newsletterItems.editing,
//       setEditing: state.newsletterItems.setEditing,
//     }))
//   );

//   const { openDialog } = useAddItemsStore(
//     useShallow((state) => ({ openDialog: state.openDialog }))
//   );

//   const items = useMemo(
//     () => mapToArray(newsletterItems).filter((i) => i.newsletterId === newsletterId),
//     [newsletterId, newsletterItems]
//   );

//   const handleOpenMediaItemsDialog = () => {
//     const lastItem = parentId
//       ? _.omit(newsletterItems[parentId], ['childrenIds'])
//       : null;
//     openDialog(newsletterId, lastItem);
//   };

//   if (loading) return <CircularProgress />;

//   return (
//     <>
//       <ActionBar backBtn={<BackButton />}>
//         <IconButton size="large" onClick={() => setEditing(!editing)}>
//           {editing ? (
//             <CloseIcon sx={{ color: 'secondary.light' }} />
//           ) : (
//             <EditIcon htmlColor="#fff" fontSize="inherit" />
//           )}
//         </IconButton>
//       </ActionBar>
//       <CustomContainer>
//         {children}
//         <NewsletterPostsList
//           parentId={parentId}
//           newsletterId={newsletterId}
//           items={items}
//         />
//       </CustomContainer>
//       {!editing && <CustomFab onClick={handleOpenMediaItemsDialog} />}
//     </>
//   );
// }
