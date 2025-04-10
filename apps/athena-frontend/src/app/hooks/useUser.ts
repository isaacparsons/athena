import { useStore } from '@frontend/store';
import { useShallow } from 'zustand/react/shallow';

export const useUser = () => {
  const { user, fetchUser, logout, loading } = useStore(
    useShallow((state) => ({
      user: state.user.data,
      loading: state.user.loading,
      fetchUser: state.user.fetch,
      logout: state.user.logout,
    }))
  );
  return { fetchUser, user, logout, loading };
};
