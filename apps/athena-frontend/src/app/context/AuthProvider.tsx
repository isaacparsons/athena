// import { useCallback, useEffect, useState } from 'react';
// import { ReadUser } from '../types';
// import Cookies from 'js-cookie';
// import { AuthContext, useAPI } from './index';
// import { useNavigate } from 'react-router-dom';

// const SESSION_COOKIE_NAME = 'newsletter_session';

// export type AuthProviderProps = {
//   children: React.ReactNode;
// };

// export function AuthProvider(props: AuthProviderProps) {
//   const { children } = props;
//   const api = useAPI();
//   const navigate = useNavigate();

//   const [user, setUser] = useState<ReadUser | null>(null);

//   const checkSession = useCallback(async () => {
//     const sessionId = Cookies.get(SESSION_COOKIE_NAME);
//     if (!sessionId) {
//       navigate('/login');
//     }
//     if (sessionId && !user) {
//       const response = await api.read<ReadUser>(`/users/`);
//       setUser(response);
//     }
//   }, [api, navigate, user]);

//   useEffect(() => {
//     checkSession();
//   }, [checkSession]);

//   return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
// }
