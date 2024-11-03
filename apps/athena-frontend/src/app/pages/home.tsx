import { useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SESSION_COOKIE_NAME = 'newsletter_session';

export function Home() {
  const { user, loading } = useStore(
    useShallow((state) => ({
      user: state.user.data,
      loading: state.user.loading,
    }))
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate('/newsletters');
  }, [user, navigate]);

  if (loading) return <CircularProgress />;
  return null;
}
