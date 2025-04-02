import { createCustomFab, CustomContainer } from '@athena/components';
import { AddIcon } from '@athena/icons';
import { useStore } from '@athena/store';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { UserTemplates } from './UserTemplates';
import { CircularProgress } from '@mui/material';

const AddFab = createCustomFab(AddIcon);

export function Templates() {
  const { templates, loading } = useStore(
    useShallow((state) => ({
      templates: state.user.data?.templates ?? [],
      loading: state.user.loading,
    }))
  );
  console.log({
    templates,
  });

  // const [editing, setEditing] = useState(false);
  // const [createTemplateDialogOpen, setCreateTemplateDialogOpen] = useState(false);
  // const handleOpenCreateTemplateDialog = () => setCreateTemplateDialogOpen(true);
  // const handleCloseCreateTemplateDialog = () => setCreateTemplateDialogOpen(false);

  return (
    <CustomContainer>
      {loading ? <CircularProgress /> : <UserTemplates data={templates} />}
      {/* <AddFab onClick={handleOpenCreateTemplateDialog} /> */}
    </CustomContainer>
  );
}
