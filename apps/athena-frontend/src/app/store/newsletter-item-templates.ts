import {
  NewsletterItemTemplateBase,
  CreateNewsletterItemTemplateInput,
  NewsletterItemTemplate,
} from '@athena/athena-common';
import { Slices } from '../store';
import { StateCreator } from 'zustand';
import { asyncTrpcClient } from '../../trpc';

type StoreNewsletterItemTemplatesData = Record<number, NewsletterItemTemplateBase>;

export interface NewsletterItemTemplatesSlice {
  newsletterItemTemplates: {
    loading: boolean;
    data: StoreNewsletterItemTemplatesData;
    fetch: (id: number) => Promise<NewsletterItemTemplate>;
    save: (input: CreateNewsletterItemTemplateInput) => Promise<number>;
    addTemplates: (templates: Omit<NewsletterItemTemplateBase, 'items'>[]) => void;
  };
}

export const createNewsletterItemTemplatesSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  NewsletterItemTemplatesSlice
> = (set, get) => ({
  newsletterItemTemplates: {
    loading: false,
    error: null,
    data: {},
    fetch: async (id: number) => {
      set((state) => {
        state.newsletterItemTemplates.loading = true;
      });
      const template = await asyncTrpcClient.newsletterItemTemplates.get.query({
        id,
      });
      set((state) => {
        state.newsletterItemTemplates.loading = false;
        const { templates, ...rest } = template;
        state.newsletterItemTemplates.data[template.id] = rest;
        templates.forEach((t) => {
          state.newsletterItemTemplates.data[t.id] = t;
        });
      });
      return template;
    },
    save: async (input: CreateNewsletterItemTemplateInput) => {
      set((state) => {
        state.newsletterItemTemplates.loading = true;
      });
      const id = await asyncTrpcClient.newsletterItemTemplates.create.mutate(input);
      set((state) => {
        state.newsletterItemTemplates.loading = true;
      });
      get().newsletterItemTemplates.fetch(id);
      return id;
    },
    addTemplates: (templates: Omit<NewsletterItemTemplateBase, 'items'>[]) => {
      set((state) => {
        templates.forEach((t) => {
          state.newsletterItemTemplates.data[t.id] = {
            ...t,
            items: [],
          };
        });
      });
    },
  },
});
