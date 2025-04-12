import { useStore } from '@frontend/store';
import { useShallow } from 'zustand/react/shallow';

export const useNewsletters = () => {
  return useStore(
    useShallow((state) => ({
      fetch: state.newsletters.fetch,
      newsletters: state.newsletters.data,
      loading: state.newsletters.loading,
    }))
  );
};
