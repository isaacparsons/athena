import { Route, Routes } from 'react-router-dom';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { Newsletter, Home, Login } from './pages/index';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../trpc';
// import { APIProvider, StateProvider, AuthProvider } from './context/index';

export function App() {
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/api/v1/trpc',

        async headers() {
          return {
            'admin-secret': '123456',
          };
        },
      }),
    ],
  });

  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {/* <APIProvider>
        <StateProvider>
          <AuthProvider> */}
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
            {/* </AuthProvider>
        </StateProvider>
      </APIProvider> */}
          </QueryClientProvider>
        </trpc.Provider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;
