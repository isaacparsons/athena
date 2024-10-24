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
    data: StoreNewsletterItemTemplatesData;
    fetch: (id: number) => Promise<void>;
    save: (input: CreateNewsletterItemTemplateInput) => Promise<number>;
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
    },
    save: async (input: CreateNewsletterItemTemplateInput) => {
      set((state) => {
        state.newsletterItemTemplates.loading = true;
      });
      const id = await asyncTrpcClient.newsletterItemTemplates.create.mutate(
        input
      );
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
