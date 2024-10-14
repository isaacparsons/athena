import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useStore } from '../../store';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';

interface AppbarProps {
  title: string;
}

export function Appbar(props: AppbarProps) {
  const { title } = props;

  const { user } = useStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {user ? (
          <AccountCircleIcon />
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
