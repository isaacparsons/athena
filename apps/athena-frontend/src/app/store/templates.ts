import _ from 'lodash';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { Slices } from '@athena/store';
import { CreateTemplate, Template } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';

export interface TemplatesSlice {
  templates: {
    loading: boolean;
    data: Record<number, Template>;
    fetch: (id: number) => Promise<Template>;
    create: (template: CreateTemplate) => Promise<number>;
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
      const template = await asyncTrpcClient.templates.get.query({
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
  },
});
