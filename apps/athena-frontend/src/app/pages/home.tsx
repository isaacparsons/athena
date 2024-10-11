import { useNavigate } from 'react-router-dom';
import { Button, Box, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { trpc } from '../../trpc';
import { useStore } from '../store/store';
import {
  Appbar,
  CustomFab,
  AddNewsletterDialog,
  UserNewsletters,
} from '../components/index';
import { useShallow } from 'zustand/react/shallow';
// import {
//   useAuthContext,
// } from '../context/index';

export function Home() {
  const navigate = useNavigate();
  const { data, isFetching, isFetched } = trpc.users.get.useQuery();
  // const user = useAuthContext();

  const [addNewsletterDialogOpen, setAddNewsletterDialogOpen] = useState(false);
  const handleOpenAddNewsletterDialog = () => {
    setAddNewsletterDialogOpen(true);
  };
  const handleCloseAddNewsletterDialog = () => {
    setAddNewsletterDialogOpen(false);
  };

  const { fetchedUser, fetchedNewsletter } = useStore(
    useShallow((state) => ({
      fetchedUser: state.fetchedUser,
      fetchedNewsletter: state.fetchedNewsletter,
    }))
  );

  useEffect(() => {
    if (data) fetchedUser(data);
  }, [isFetched, data]);

  const { user } = useStore();

  return (
    <Box sx={{ height: '100vh' }}>
      <AddNewsletterDialog
        open={addNewsletterDialogOpen}
        onClose={handleCloseAddNewsletterDialog}
      />

      <Appbar
        title="Newsletter"
        right={
          user ? (
            <AccountCircleIcon />
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )
        }
      />

      <Container sx={{ flex: 1, minHeight: '100vh' }} maxWidth="md">
        {user ? <UserNewsletters newsletters={user.newsletters} /> : null}
      </Container>
      <CustomFab onClick={handleOpenAddNewsletterDialog} />
    </Box>
  );
}
