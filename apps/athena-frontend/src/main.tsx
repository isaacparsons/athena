import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <CssBaseline />
    <StrictMode>
      <App />
    </StrictMode>
  </>
);
