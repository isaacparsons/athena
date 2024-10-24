import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useStore } from '../../store';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';

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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCloseDrawer = () => setDrawerOpen(false);
  const handleOpenDrawer = () => setDrawerOpen(true);

  return (
    <AppBar position="static">
      <Drawer open={drawerOpen} onClose={handleCloseDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleCloseDrawer}
        >
          <List>
            <DrawerListItem
              text={'Home'}
              icon={<HomeIcon />}
              onClick={() => navigate('/')}
            />
            <DrawerListItem
              text={'Templates'}
              icon={<FileCopyIcon />}
              onClick={() => navigate('/templates')}
            />
          </List>
          <Divider />
          <List>
            <DrawerListItem text={'Settings'} icon={<SettingsIcon />} />
          </List>
        </Box>
      </Drawer>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleOpenDrawer}
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

interface DrawerListItemProps {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function DrawerListItem(props: DrawerListItemProps) {
  const { text, icon, onClick } = props;
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
