import { useMemo, useState } from 'react';
import { useStore } from '../store';
import {
  CustomFab,
  AddNewsletterDialog,
  UserNewsletters,
} from '../components/index';
import { useShallow } from 'zustand/react/shallow';
import { mapToArray } from '../../util/helpers';
import { CustomContainer } from '../components/common/CustomContainer';
import { CircularProgress } from '@mui/material';

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
