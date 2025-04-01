import {
  createCustomFab,
  CustomContainer,
  CustomList,
  CustomListItem,
} from '@athena/components';
import { AddIcon } from '@athena/icons';
import { useStore } from '@athena/store';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { NewsletterPostsController } from '../../components/common/NewsletterPosts/NewsletterPostsController';

export function Template() {
  //   const { loading, itemTemplates } = useStore(
  //     useShallow((state) => ({
  //       itemTemplates: state.user.data?.newsletterItemTemplates ?? [],
  //       loading: state.newsletterItemTemplates.loading,
  //     }))
  //   );

  const [editing, setEditing] = useState(false);
  const [createTemplateDialogOpen, setCreateTemplateDialogOpen] = useState(false);
  const handleOpenCreateTemplateDialog = () => setCreateTemplateDialogOpen(true);
  const handleCloseCreateTemplateDialog = () => setCreateTemplateDialogOpen(false);

  return (
    <CustomContainer>
      <></>
    </CustomContainer>
  );
}
