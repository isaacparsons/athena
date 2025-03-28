import { useState } from 'react';
import { useStore } from '@athena/store';
import { useShallow } from 'zustand/react/shallow';
import { CustomContainer, createCustomFab } from '@athena/components';
import { CircularProgress } from '@mui/material';
import { CreateNewsletterDialog, UserNewsletters } from './';
import { AddIcon } from '@athena/icons';

const AddFab = createCustomFab(AddIcon);

export function Newsletters() {
  const { newsletters, loading } = useStore(
    useShallow((state) => ({
      newsletters: state.user.data?.newsletters ?? [],
      loading: state.user.loading,
    }))
  );
  const [addNewsletterDialogOpen, setAddNewsletterDialogOpen] = useState(false);
  const handleOpenAddNewsletterDialog = () => setAddNewsletterDialogOpen(true);
  const handleCloseAddNewsletterDialog = () => setAddNewsletterDialogOpen(false);

  return (
    <CustomContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <CreateNewsletterDialog
            open={addNewsletterDialogOpen}
            onClose={handleCloseAddNewsletterDialog}
          />
          <UserNewsletters data={newsletters} />
          <AddFab onClick={handleOpenAddNewsletterDialog} />
        </>
      )}
    </CustomContainer>
  );
}
