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
    data: Record<number, StoreNewsletter>;
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
    data: {},
    fetch: async (id: number) => {
      set((state) => {
        state.newsletters.loading = true;
      });
      const newsletter = await asyncTrpcClient.newsletters.get.query({
        newsletterId: id,
      });
      set((state) => {
        state.newsletters.loading = false;
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
