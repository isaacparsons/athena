import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '../trpc';
import { AppRoutes } from './AppRoutes';
// import { APIProvider, StateProvider, AuthProvider } from './context/index';

export function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {/* <APIProvider>
        <StateProvider>
          <AuthProvider> */}
            <AppRoutes />
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
