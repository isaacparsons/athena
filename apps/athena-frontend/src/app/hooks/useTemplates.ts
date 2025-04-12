import { useStore } from '@frontend/store';
import { useShallow } from 'zustand/react/shallow';

export const useTemplates = () => {
  return useStore(
    useShallow((state) => ({
      createTemplate: state.templates.create,
    }))
  );
};
