import { useCallback, useEffect, useState } from 'react';
import { User } from 'types/types';
import Cookies from 'js-cookie';
import { useAPI } from './api';
import { AuthContext } from './auth';
import { useNavigate } from 'react-router-dom';

const SESSION_COOKIE_NAME = 'newsletter_session';

export type Props = {
  children: React.ReactNode;
};

function AuthProvider(props: Props) {
  const { children } = props;
  const api = useAPI();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const checkSession = useCallback(async () => {
    const sessionId = Cookies.get(SESSION_COOKIE_NAME);
    if (!sessionId) {
      navigate('/login');
    }
    if (sessionId && !user) {
      const response = await api.read<User>(`/users/`);
      setUser(response);
    }
  }, [api, navigate, user]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
