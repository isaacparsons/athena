import { useStore } from '@frontend/store';
import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const useTemplate = (id: number | undefined) => {
  const { loading, templates, fetchTemplate } = useStore(
    useShallow((state) => ({
      templates: state.templates.data,
      fetchTemplate: state.templates.fetch,
      loading: state.templates.loading,
    }))
  );

  useEffect(() => {
    if (id) fetchTemplate(id);
  }, [id, fetchTemplate]);

  const template = useMemo(() => {
    return id === undefined ? undefined : templates[id];
  }, [id, templates]);

  return { template, loading };
};
