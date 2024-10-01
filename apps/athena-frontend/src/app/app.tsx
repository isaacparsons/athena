import { Route, Routes } from 'react-router-dom';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { Newsletter, Home, Login } from './pages/index';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { APIProvider, StateProvider, AuthProvider } from './context/index';

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
                  {/* <Route path="/login" element={<Login />} />
                  <Route
                    path="newsletters/:newsletterId"
                    element={<Newsletter />}
                  /> */}
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
