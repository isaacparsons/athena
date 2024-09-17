import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Appbar from '../common/Appbar';
import { useAuthContext } from '../context/auth';
import Newsletters from '../components/newsletters';

export function Home() {
  const navigate = useNavigate();
  const user = useAuthContext();
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
      <Newsletters />
    </Box>
  );
}

export default Home;
