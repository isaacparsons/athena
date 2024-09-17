import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { api } from '../../api';

const SESSION_COOKIE_NAME = 'newsletter_session';
const API_HOST = 'http://localhost';
const API_PORT = 3000;

const path = `${API_HOST}:${API_PORT}`;

interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
}

export type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<User | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);

  const checkSession = async () => {
    const sessionId = Cookies.get(SESSION_COOKIE_NAME);
    if (sessionId) {
      const response = await api.users.getMe();
      setUser(response.data);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
