import _ from 'lodash';
import { StateCreator } from 'zustand';
import {
  NewsletterItemDetails,
  NewsletterItemTemplateBase,
  CreateNewsletterItemTemplateInput,
} from '@athena/athena-common';
import { Slices } from '.';
import { asyncTrpcClient } from '../../trpc';

export type ItemTemplateDetailsType<T = void> = T extends void
  ? {
      details?: NewsletterItemDetails | undefined;
    }
  : {
      details: T;
    };

export type StoreNewsletterItemTemplate<T = void> = NewsletterItemTemplateBase;
//  & ItemTemplateDetailsType<T>;

type StoreNewsletterItemTemplatesData = Record<
  number,
  StoreNewsletterItemTemplate
>;

export interface NewsletterItemTemplatesSlice {
  newsletterItemTemplates: {
    loading: boolean;
    error: string | null;
    data: StoreNewsletterItemTemplatesData;
    fetch: (id: number) => Promise<void>;
    save: (input: CreateNewsletterItemTemplateInput) => Promise<void>;
    addTemplates: (
      templates: Omit<NewsletterItemTemplateBase, 'items'>[]
    ) => void;
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
        state.newsletterItemTemplates.error = null;
      });
      const template = await asyncTrpcClient.newsletterItemTemplates.get.query({
        id,
      });
      set((state) => {
        state.newsletterItemTemplates.loading = false;
        state.newsletterItemTemplates.error = null;
        const { templates, ...rest } = template;
        state.newsletterItemTemplates.data[template.id] = rest;
        templates.forEach((t) => {
          state.newsletterItemTemplates.data[t.id] = t;
        });
      });
    },
    save: async (input: CreateNewsletterItemTemplateInput) => {
      set((state) => {
        state.newsletterItemTemplates.loading = true;
        state.newsletterItemTemplates.error = null;
      });
      const id = await asyncTrpcClient.newsletterItemTemplates.create.mutate(
        input
      );
      set((state) => {
        state.newsletterItemTemplates.loading = true;
        state.newsletterItemTemplates.error = null;
      });
      get().newsletterItemTemplates.fetch(id);
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
