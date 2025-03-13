import { useState } from 'react';
import { useStore } from '@athena/store';
import { useShallow } from 'zustand/react/shallow';
import {
  CustomFab,
  AddNewsletterDialog,
  UserNewsletters,
  CustomContainer,
} from '@athena/components';
import { CircularProgress } from '@mui/material';

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
          <AddNewsletterDialog
            open={addNewsletterDialogOpen}
            onClose={handleCloseAddNewsletterDialog}
          />
          <UserNewsletters newsletters={newsletters} />
          <CustomFab onClick={handleOpenAddNewsletterDialog} />
        </>
      )}
    </CustomContainer>
  );
}
