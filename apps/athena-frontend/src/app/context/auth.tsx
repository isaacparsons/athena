import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// axios.defaults.withCredentials = true

const SESSION_COOKIE_NAME = 'newsletter_session';

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

  useEffect(() => {
    const sessionId = Cookies.get(SESSION_COOKIE_NAME);
    if (sessionId) {
      axios
        .get('http://localhost:3000/v1/users/me', { withCredentials: true })
        .then(function (response) {
          console.log(response);
        });
    }
  }, []);

  //   const login = () => {
  //     setAuthenticated(true);
  //   };
  //   const logout = () => {
  //     setAuthenticated(false);
  //   };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
