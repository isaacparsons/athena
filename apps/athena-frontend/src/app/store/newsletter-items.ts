import _ from 'lodash';
import { StateCreator } from 'zustand';
import { NewsletterItem, NewsletterItemBase } from '@athena/athena-common';
import { Slices } from '.';
import { asyncTrpcClient } from '../../trpc';

export type StoreNewsletterItem = Omit<NewsletterItem, 'children'> & {
  childrenIds: number[];
};

type NewsletterItemsData = Record<number, StoreNewsletterItem>;

export interface NewsletterItemsSlice {
  newsletterItems: {
    loading: boolean;
    error: string | null;
    data: Record<number, StoreNewsletterItem>;
    getItems: () => StoreNewsletterItem[];
    fetch: () => Promise<void>;
    deleteItems: (ids: number[]) => Promise<void>;
    addItems: (items: NewsletterItemBase[]) => void;
  };
}

export const createNewsletterItemsSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  NewsletterItemsSlice
> = (set, get) => ({
  newsletterItems: {
    loading: false,
    error: null,
    data: {},
    getItems: () => Object.values(get().newsletterItems.data),
    fetch: async () => {
      return;
    },
    deleteItems: async (ids: number[]) => {
      await asyncTrpcClient.newsletterItems.deleteMany.mutate({
        newsletterItemIds: ids,
      });
      set((state) => {
        Object.values(state.newsletters.data).forEach((newsletter) => {
          newsletter.itemIds = _.difference(newsletter.itemIds, ids);
        });
        const newItems = Object.values(state.newsletterItems.data).reduce(
          (newState, item) => {
            if (ids.includes(item.id)) {
              return newState;
            }
            newState[item.id] = item;
            return newState;
          },
          {} as NewsletterItemsData
        );

        state.newsletterItems.data = newItems;
      });
    },
    addItems: (items: NewsletterItemBase[]) => {
      set((state) => {
        items.forEach((item) => {
          state.newsletterItems.data[item.id] = {
            ...item,
            childrenIds: [],
          };
        });
      });
    },
  },
});
