import { useMemo, useState } from 'react';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import {
  CustomFab,
  AddNewsletterDialog,
  UserNewsletters,
  CustomContainer,
} from '../components';
import { CircularProgress } from '@mui/material';
import { mapToArray } from '../../util';

export function Newsletters() {
  const { newsletters, loading } = useStore(
    useShallow((state) => ({
      newsletters: state.newsletters.data,
      loading: state.newsletters.loading,
    }))
  );
  const [addNewsletterDialogOpen, setAddNewsletterDialogOpen] = useState(false);
  const handleOpenAddNewsletterDialog = () => setAddNewsletterDialogOpen(true);
  const handleCloseAddNewsletterDialog = () =>
    setAddNewsletterDialogOpen(false);

  const newslettersArr = useMemo(() => mapToArray(newsletters), [newsletters]);

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
          <UserNewsletters newsletters={newslettersArr} />
          <CustomFab onClick={handleOpenAddNewsletterDialog} />
        </>
      )}
    </CustomContainer>
  );
}
