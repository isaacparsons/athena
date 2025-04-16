import { useState } from 'react';
import {
  CustomContainer,
  AddFab,
  CreateNewsletterDialog,
  UserNewsletters,
} from '@frontend/components';
import { CircularProgress } from '@mui/material';
import { useUser } from '@frontend/store';

export function Newsletters() {
  const { newsletters, loading } = useUser();
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
