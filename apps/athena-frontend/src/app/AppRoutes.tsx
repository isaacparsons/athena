import Cookies from 'js-cookie';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
// import Login from './pages/Login';
import { Home } from './pages/Home';
import { Box, CircularProgress } from '@mui/material';
import { Login, Newsletter } from './pages';
import { NotFound } from './pages/NotFound';
import { ReactNode, useCallback, useEffect } from 'react';
import { useStore } from './store';
import { useShallow } from 'zustand/react/shallow';
// import Newsletter from './pages/Newsletter';
// import { useAuthContext } from './context/auth';
import { UserBase } from '@athena/athena-common';

const SESSION_COOKIE_NAME = 'newsletter_session';

export function AppRoutes() {
  const { user, fetchUser, loading } = useStore(
    useShallow((state) => ({
      user: state.user.data,
      fetchUser: state.user.fetch,
      loading: state.user.loading,
    }))
  );
  const navigate = useNavigate();

  // const checkSession = useCallback(async () => {
  //   const sessionId = Cookies.get(SESSION_COOKIE_NAME);
  //   if (!sessionId) {
  //     navigate('/login');
  //   }
  // }, [api, navigate, user]);

  useEffect(() => {
    // checkSession();
    if (!user) fetchUser();
  }, []);

  return (
    <Box sx={{ flex: 1, minHeight: '100vh', bgcolor: grey[200] }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="newsletters/:newsletterId" element={<Newsletter />} />
          <Route path="error" element={<NotFound />} />
        </Routes>
      )}
    </Box>
  );
}

interface ProtectedRouteProps {
  element: ReactNode;
  user: UserBase | null;
}
export function ProtectedRoute(props: ProtectedRouteProps) {
  const { element, user } = props;
  return user ? element : <Navigate to="/login" replace={true} />;
}
