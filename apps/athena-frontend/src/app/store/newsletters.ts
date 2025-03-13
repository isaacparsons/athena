import _ from 'lodash';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { Slices, StoreNewsletterPost } from '@athena/store';
import { CreateNewsletter, Newsletter, NewsletterBase } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';

export type StoreNewsletter = Omit<Newsletter, 'items'> & {
  itemIds: number[];
};

export interface NewslettersSlice {
  newsletters: {
    loading: boolean;
    data: Record<number, StoreNewsletter>;
    fetch: (id: number) => Promise<void>;
    upload: (newsletter: CreateNewsletter) => Promise<void>;
    addNewsletters: (newsletters: NewsletterBase[]) => void;
  };
}

export const createNewslettersSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  NewslettersSlice
> = (set, get) => ({
  newsletters: {
    loading: false,
    data: {},
    fetch: async (id: number) => {
      set((state) => {
        state.newsletters.loading = true;
      });
      const newsletter = await asyncTrpcClient.newsletters.get.query({
        id,
      });
      console.log({
        newsletter,
      });
      set((state) => {
        state.newsletters.loading = false;
        state.newsletters.data[newsletter.id] = {
          ..._.omit(newsletter, ['items']),
          itemIds: newsletter.items.map((i) => i.id),
        };
        state.newsletterItems.data = newsletter.items.reduce((acc, i) => {
          acc[i.id] = {
            ...i,
            childrenIds: newsletter.items
              .filter((c) => c.position.parentId === i.id)
              .map((c) => c.id),
          };
          return acc;
        }, {} as Record<number, StoreNewsletterPost>);
      });
    },
    upload: async (newsletter: CreateNewsletter) => {
      const id = await asyncTrpcClient.newsletters.post.mutate(newsletter);
      await get().newsletters.fetch(id);
    },
    addNewsletters: (newsletters: NewsletterBase[]) => {
      set((state) => {
        newsletters.forEach((newsletter) => {
          state.newsletters.data[newsletter.id] = {
            ...newsletter,
            itemIds: [],
            members: [],
          };
        });
      });
    },
  },
});
