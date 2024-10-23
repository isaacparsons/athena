import _ from 'lodash';
import { StateCreator } from 'zustand';
import { Newsletter, NewsletterBase } from '@athena/athena-common';
import { asyncTrpcClient } from '../../trpc';
import { Slices } from '.';

export type StoreNewsletter = Omit<Newsletter, 'items'> & {
  itemIds: number[];
};

export interface NewslettersSlice {
  newsletters: {
    loading: boolean;
    error: string | null;
    data: Record<number, StoreNewsletter>;
    getNewsletters: () => StoreNewsletter[];
    getNewsletterById: (id: number) => StoreNewsletter | null;
    fetch: (id: number) => Promise<void>;
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
    error: null,
    data: {},
    getNewsletters: () => Object.values(get().newsletters.data),
    getNewsletterById: (id: number) => get().newsletters.data[id] ?? null,
    fetch: async (id: number) => {
      set((state) => {
        state.newsletters.loading = true;
        state.newsletters.error = null;
      });
      const newsletter = await asyncTrpcClient.newsletters.get.query({
        newsletterId: id,
      });
      set((state) => {
        state.newsletters.loading = false;
        state.newsletters.error = null;
        state.newsletters.data[newsletter.id] = {
          ..._.omit(newsletter, ['items']),
          itemIds: newsletter.items.map((i) => i.id),
        };
      });
      get().newsletterItems.addItems(newsletter.items);
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
