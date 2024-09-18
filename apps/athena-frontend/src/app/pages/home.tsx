import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Appbar, Newsletters } from '../components/index';
import { useAuthContext } from '../context/auth';
import { api } from '../../api';
import { Newsletter } from 'types/types';

export function Home() {
  const navigate = useNavigate();
  const user = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  const getNewsletters = async () => {
    const response = await api.newsletters.getMyNewsletters();
    console.log(response);
    setNewsletters(response);
    setLoading(false);
  };
  useEffect(() => {
    getNewsletters();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
      {loading ? (
        <CircularProgress />
      ) : (
        <Newsletters newsletters={newsletters} />
      )}
    </Box>
  );
}

export default Home;
