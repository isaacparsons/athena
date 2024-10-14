import { Box, Container } from '@mui/material';
import { useMemo, useState } from 'react';
import { useStore } from '../store';
import {
  Appbar,
  CustomFab,
  AddNewsletterDialog,
  UserNewsletters,
} from '../components/index';
import { useShallow } from 'zustand/react/shallow';

export function Home() {
  const { newsletters, getNewsletters } = useStore(
    useShallow((state) => ({
      newsletters: state.newsletters.data,
      getNewsletters: state.newsletters.getNewsletters,
    }))
  );
  const [addNewsletterDialogOpen, setAddNewsletterDialogOpen] = useState(false);

  const newslettersArr = useMemo(() => getNewsletters(), [newsletters]);

  const handleOpenAddNewsletterDialog = () => setAddNewsletterDialogOpen(true);
  const handleCloseAddNewsletterDialog = () =>
    setAddNewsletterDialogOpen(false);

  return (
    <Box sx={{ height: '100vh' }}>
      <AddNewsletterDialog
        open={addNewsletterDialogOpen}
        onClose={handleCloseAddNewsletterDialog}
      />

      <Appbar title="Newsletter" />
      <Container sx={{ flex: 1, minHeight: '100vh' }} maxWidth="md">
        <UserNewsletters newsletters={newslettersArr} />
      </Container>
      <CustomFab onClick={handleOpenAddNewsletterDialog} />
    </Box>
  );
}
