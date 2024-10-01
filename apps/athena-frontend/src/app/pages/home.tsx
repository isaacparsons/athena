import { useNavigate } from 'react-router-dom';
import { Button, Box, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useMemo, useState } from 'react';
import {
  AddNewsletterDialog,
  CustomFab,
  Appbar,
  Newsletters,
} from '../components/index';
import {
  useStateContext,
  useStateDispatchContext,
  useAPI,
  useAuthContext,
} from '../context/index';
import { ReadUserNewsletter } from '../types';

export function Home() {
  const navigate = useNavigate();
  const user = useAuthContext();
  const api = useAPI();
  const state = useStateContext();
  const dispatch = useStateDispatchContext();

  const [loading, setLoading] = useState(true);

  const getNewsletters = async () => {
    setLoading(true);
    const response = await api.read<ReadUserNewsletter[]>(`/users/newsletters`);
    dispatch({
      entityType: 'newsletters',
      type: 'fetched',
      payload: response ?? [],
    });
    setLoading(false);
  };

  useEffect(() => {
    getNewsletters();
  }, []);

  const newsletters = useMemo(() => {
    return Array.from(state.newsletters).map(([key, value]) => value);
  }, [state]);

  const [addNewsletterDialogOpen, setAddNewsletterDialogOpen] = useState(false);

  const handleOpenAddNewsletterDialog = () => {
    setAddNewsletterDialogOpen(true);
  };

  const handleCloseAddNewsletterDialog = () => {
    getNewsletters();
    setAddNewsletterDialogOpen(false);
  };

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
        <Newsletters newsletters={newsletters} />
      </Container>
      <CustomFab onClick={handleOpenAddNewsletterDialog} />
    </Box>
  );
}
