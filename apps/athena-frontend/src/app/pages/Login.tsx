import { getConfig } from '@frontend/config';
import { useUser } from '@frontend/hooks';
import {
  SignInPage,
  AppProvider,
  SupportedAuthProvider,
  AuthProvider,
} from '@toolpad/core';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePaths } from '../AppRoutes';

const config = getConfig();
const googleId = 'google' as SupportedAuthProvider;
const providers = [{ id: googleId, name: 'Google' }];
const BRANDING = {
  //   logo: (
  //     <img
  //       src="https://mui.com/static/logo.svg"
  //       alt="MUI logo"
  //       style={{ height: 24 }}
  //     />
  //   ),
  title: 'Athena',
};

export function Login() {
  const { user, fetchUser } = useUser();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (user) return <Navigate to={RoutePaths.home} replace={true} />;

  return (
    <AppProvider branding={BRANDING}>
      <SignInPage
        signIn={(
          provider: AuthProvider,
          formData?: unknown,
          callbackUrl?: string
        ) => {
          window.location.href = config.GOOGLE_AUTH_URL;
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
