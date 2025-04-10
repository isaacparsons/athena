import { useState } from 'react';
import {
  CustomContainer,
  createCustomFab,
  CreateNewsletterDialog,
  UserNewsletters,
} from '@frontend/components';
import { CircularProgress } from '@mui/material';
import { AddIcon } from '@frontend/icons';
import { useNewsletters } from '@frontend/hooks';

const AddFab = createCustomFab(AddIcon);

export function Newsletters() {
  const { newsletters, loading } = useNewsletters();
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
