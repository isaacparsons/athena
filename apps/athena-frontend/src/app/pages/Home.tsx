import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@frontend/store';
import { RoutePaths } from '@frontend/config';

export function Home() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate(RoutePaths.newsletters);
  }, [user, navigate]);

  if (loading) return <CircularProgress />;
  return null;
}
