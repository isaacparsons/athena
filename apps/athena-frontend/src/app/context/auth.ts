import { createContext, useContext } from 'react';
import { User } from 'types/types';

export const AuthContext = createContext<User | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};
