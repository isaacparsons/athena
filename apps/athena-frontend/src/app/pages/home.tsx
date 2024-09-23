import { useNavigate } from 'react-router-dom';
import { Button, Box, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Appbar, Newsletters } from '../components/index';
import { useAuthContext } from '../context/auth';

export function Home() {
  const navigate = useNavigate();
  const user = useAuthContext();

  return (
    <Box sx={{ height: '100vh' }}>
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
        <Newsletters />
      </Container>
    </Box>
  );
}

export default Home;
