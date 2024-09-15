import * as React from 'react';

import { SignInPage, AppProvider, SupportedAuthProvider } from '@toolpad/core';

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
        signIn={() => {
          console.log('hi');
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
