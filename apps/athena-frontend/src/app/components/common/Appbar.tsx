import { useState } from 'react';
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
import {
  AccountCircleIcon,
  MenuIcon,
  TemplateIcon,
  SettingsIcon,
  HomeIcon,
} from '@frontend/icons';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@frontend/config';
import { useUser } from '@frontend/store';

interface AppbarProps {
  title: string;
}

export function Appbar(props: AppbarProps) {
  const { title } = props;

  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCloseDrawer = () => setDrawerOpen(false);
  const handleOpenDrawer = () => setDrawerOpen(true);

  return (
    <AppBar position="static">
      <Drawer open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={handleCloseDrawer}>
          <List>
            <DrawerListItem
              text={'Home'}
              icon={<HomeIcon />}
              onClick={() => navigate(RoutePaths.home)}
            />
            <DrawerListItem
              text={'Templates'}
              icon={<TemplateIcon />}
              onClick={() => navigate(RoutePaths.templates)}
            />
            <DrawerListItem
              text={'Account'}
              icon={<AccountCircleIcon />}
              onClick={() => navigate(RoutePaths.account)}
            />
          </List>
          <Divider />
          <List>
            <DrawerListItem text={'Settings'} icon={<SettingsIcon />} />
            {user ? (
              <ListItem key={'logout'} disablePadding>
                <Button variant={'outlined'} color="error" onClick={logout}>
                  Logout
                </Button>
              </ListItem>
            ) : (
              <ListItem key={'login'} disablePadding>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </ListItem>
            )}
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
      </Toolbar>
    </AppBar>
  );
}

interface DrawerListItemProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function DrawerListItem(props: DrawerListItemProps) {
  const { text, icon, onClick } = props;
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={onClick}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
