import { useNavigate } from 'react-router-dom';
import { Button, Box, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useMemo, useState } from 'react';
// import { useBearStore } from '../context/state';
import { trpc } from '../../trpc';
import { useStore } from '../store/store';
import {
  //   AddNewsletterDialog,
  //   CustomFab,
  Appbar,
  UserNewsletters,
} from '../components/index';
// import {
//   useStateContext,
//   useStateDispatchContext,
//   useAPI,
//   useAuthContext,
// } from '../context/index';

export function Home() {
  const navigate = useNavigate();
  // const user = useAuthContext();
  // const api = useAPI();
  // const state = useStateContext();
  // const dispatch = useStateDispatchContext();

  // const [loading, setLoading] = useState(true);

  // const getNewsletters = async () => {
  //   setLoading(true);
  //   const response = await api.read<ReadUserNewsletter[]>(`/users/newsletters`);
  //   dispatch({
  //     entityType: 'newsletters',
  //     type: 'fetched',
  //     payload: response ?? [],
  //   });
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getNewsletters();
  // }, []);

  // const newsletters = useMemo(() => {
  //   return Array.from(state.newsletters).map(([key, value]) => value);
  // }, [state]);

  // const [addNewsletterDialogOpen, setAddNewsletterDialogOpen] = useState(false);

  // const handleOpenAddNewsletterDialog = () => {
  //   setAddNewsletterDialogOpen(true);
  // };

  // const handleCloseAddNewsletterDialog = () => {
  //   getNewsletters();
  //   setAddNewsletterDialogOpen(false);
  // };

  // const increase = useBearStore((state) => state.increase);
  const { fetchedUser, fetchedNewsletter } = useStore();
  const { data, isFetching, isFetched } = trpc.users.get.useQuery();
  const newsletterQuery = trpc.newsletters.get.useQuery({ newsletterId: 1 });

  useEffect(() => {
    if (data) fetchedUser(data);
  }, [isFetched, data]);

  const { user } = useStore();

  return (
    <Box sx={{ height: '100vh' }}>
      {/* <AddNewsletterDialog
        open={addNewsletterDialogOpen}
        onClose={handleCloseAddNewsletterDialog}
      />
      */}
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
      {/* <CustomFab onClick={handleOpenAddNewsletterDialog} /> */}
    </Box>
  );
}
