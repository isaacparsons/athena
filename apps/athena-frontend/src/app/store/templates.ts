import _ from 'lodash';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { Slices, useStore } from '@frontend/store';
import { CreateTemplate, ReadTemplate, UpdateTemplate } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useMemo } from 'react';

export interface TemplatesSlice {
  templates: {
    loading: boolean;
    data: Record<number, ReadTemplate>;
    fetch: (id: number) => Promise<ReadTemplate>;
    create: (template: CreateTemplate) => Promise<number>;
    update: (input: UpdateTemplate) => Promise<number>;
  };
}

export const createTemplatesSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  TemplatesSlice
> = (set, get) => ({
  templates: {
    loading: false,
    data: {},
    fetch: async (id: number) => {
      set((state) => {
        state.templates.loading = true;
      });
      const template = await asyncTrpcClient.templates.read.query({
        id,
      });
      set((state) => {
        state.templates.loading = false;
        state.templates.data[template.id] = template;
      });
      return template;
    },
    create: async (template: CreateTemplate) => {
      const id = await asyncTrpcClient.templates.create.mutate(template);
      await get().templates.fetch(id);
      await get().user.fetch();
      return id;
    },
    update: async (input: UpdateTemplate) => {
      const id = await asyncTrpcClient.templates.update.mutate(input);
      await get().templates.fetch(id);
      await get().user.fetch();
      return id;
    },
  },
});

export const useTemplates = () => {
  return useStore(
    useShallow((state) => ({
      createTemplate: state.templates.create,
      updateTemplate: state.templates.update,
    }))
  );
};

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
