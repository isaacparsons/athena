import _ from 'lodash';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { Slices } from '@athena/store';
import { Template } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';

export interface TemplatesSlice {
  templates: {
    loading: boolean;
    data: Record<number, Template>;
    fetch: (id: number) => Promise<void>;
    // create: (template: CreateTemplate) => Promise<number>;
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
        state.newsletters.loading = true;
      });
      const template = await asyncTrpcClient.templates.get.query({
        id,
      });
      set((state) => {
        state.templates.loading = false;
        state.templates.data[template.id] = template;
      });
    },
    // create: async (newsletter: CreateNewsletter) => {
    //   const id = await asyncTrpcClient.newsletters.create.mutate(newsletter);
    //   await get().newsletters.fetch(id);
    //   return id;
    // },
  },
});
