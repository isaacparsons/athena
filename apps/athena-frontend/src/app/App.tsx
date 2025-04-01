import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { NotificationsProvider } from '@athena/hooks';
import { theme } from '@athena/theme';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { trpc, trpcClient } from '../trpc';
import { router } from './AppRoutes';
import { RouterProvider } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@athena/store';

export const App = () => {
  // const queryClient = new QueryClient();

  const { fetchUser } = useStore(
    useShallow((state) => ({ fetchUser: state.user.fetch }))
  );

  // const checkSession = useCallback(async () => {
  //   const sessionId = Cookies.get(SESSION_COOKIE_NAME);
  //   if (!sessionId) {
  //     navigate('/login');
  //   }
  // }, [api, navigate, user]);

  useEffect(() => {
    // checkSession();
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        {/* <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}> */}
        <RouterProvider router={router} />
        {/* </QueryClientProvider>
        </trpc.Provider> */}
      </NotificationsProvider>
    </ThemeProvider>
  );
};
