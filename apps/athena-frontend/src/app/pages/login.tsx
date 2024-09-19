import * as React from 'react';
import {
  SignInPage,
  AppProvider,
  SupportedAuthProvider,
  AuthProvider,
} from '@toolpad/core';

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

export default function Login() {
  return (
    <AppProvider branding={BRANDING}>
      <SignInPage
        signIn={(
          provider: AuthProvider,
          formData?: unknown,
          callbackUrl?: string
        ) => {
          window.location.href = 'http://localhost:3000/v1/auth/google';
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
