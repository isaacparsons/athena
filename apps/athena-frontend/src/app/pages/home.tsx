import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  BoxProps,
  IconButton,
  Button,
  Typography,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Appbar from '../common/Appbar';

export function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Appbar
        title="Newsletter"
        right={
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        }
      />
    </Box>
  );
}

export default Home;
