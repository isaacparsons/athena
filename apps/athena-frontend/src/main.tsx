import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './app/app';
import AuthProvider from './app/context/auth';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <CssBaseline />
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>
  </AuthProvider>
);
