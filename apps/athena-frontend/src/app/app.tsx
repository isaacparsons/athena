import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import AuthProvider from './context/auth';
import Newsletter from './pages/newsletter/index';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ flex: 1, minHeight: '100vh', bgcolor: grey[200] }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="newsletters/:newsletterId" element={<Newsletter />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
