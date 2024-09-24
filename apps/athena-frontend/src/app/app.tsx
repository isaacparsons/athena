import { Route, Routes } from 'react-router-dom';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import Login from './pages/Login';
import Home from './pages/Home';
import AuthProvider from './context/AuthProvider';
import Newsletter from './pages/Newsletter';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { StateProvider } from './context/StateProvider';
import APIProvider from './context/APIProvider';

export function App() {
  return (
    <NotificationsProvider>
      <APIProvider>
        <StateProvider>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <Box sx={{ flex: 1, minHeight: '100vh', bgcolor: grey[200] }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="newsletters/:newsletterId"
                    element={<Newsletter />}
                  />
                </Routes>
              </Box>
            </ThemeProvider>
          </AuthProvider>
        </StateProvider>
      </APIProvider>
    </NotificationsProvider>
  );
}

export default App;
