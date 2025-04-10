import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { NotificationsProvider, useUser } from '@frontend/hooks';
import { theme } from '@frontend/theme';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { trpc, trpcClient } from '../trpc';
import { router } from './AppRoutes';
import { RouterProvider, useNavigate } from 'react-router-dom';
import { LocationProvider } from './components';
import Cookies from 'js-cookie';
import { getConfig } from '@frontend/config';

const config = getConfig();

export const App = () => {
  // const navigate = useNavigate();
  // const queryClient = new QueryClient();

  // const { fetchUser } = useUser();

  // const checkSession = useCallback(async () => {
  //   const cookieName = config.SESSION_COOKIE_NAME;
  //   const sessionId = _.isUndefined(cookieName)
  //     ? undefined
  //     : Cookies.get(cookieName);
  //   console.log(sessionId);
  //   if (!sessionId) {
  //     navigate('/login');
  //   } else {
  //     fetchUser();
  //   }
  // }, [navigate, fetchUser]);

  // useEffect(() => {
  //   checkSession();
  // }, [checkSession]);

  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <LocationProvider>
          {/* <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}> */}
          <RouterProvider router={router} />
          {/* </QueryClientProvider>
        </trpc.Provider> */}
        </LocationProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
};
