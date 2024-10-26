import _ from 'lodash';
import { StateCreator } from 'zustand';
import {
  NewsletterItem,
  NewsletterItemBase,
  NewsletterItemDetails,
  logObject,
} from '@athena/athena-common';
import { Slices } from '.';
import { asyncTrpcClient } from '../../trpc';

const mapToStoreItem = (item: NewsletterItem): StoreNewsletterItem => {
  return {
    ..._.omit(item, ['children']),
    childrenIds: item.children.map((c) => c.id),
  };
};

export type ItemDetailsType<T = void> = T extends void
  ? // | (NewsletterItemDetailsText | NewsletterItemDetailsMedia)
    {
      details?: NewsletterItemDetails | undefined;
    }
  : {
      details: T;
    };

export type StoreNewsletterItem<T = void> = Omit<
  NewsletterItem,
  'children' | 'details'
> & {
  childrenIds: number[];
} & ItemDetailsType<T>;

type NewsletterItemsData = Record<number, StoreNewsletterItem>;

export interface NewsletterItemsSlice {
  newsletterItems: {
    loading: boolean;
    data: Record<number, StoreNewsletterItem>;
    fetch: (id: number) => Promise<void>;
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
    data: {},
    fetch: async (id: number) => {
      set((state) => {
        state.newsletterItems.loading = true;
      });
      const item = await asyncTrpcClient.newsletterItems.get.query({
        newsletterItemId: id,
      });
      set((state) => {
        state.newsletterItems.loading = false;
        state.newsletterItems.data[item.id] = mapToStoreItem(item);
        item.children.forEach((i) => {
          state.newsletterItems.data[i.id] = {
            ...i,
            childrenIds: [],
          };
        });
        return state;
      });
    },
    deleteItems: async (ids: number[]) => {
      set((state) => {
        state.newsletterItems.loading = true;
      });
      await asyncTrpcClient.newsletterItems.deleteMany.mutate({
        newsletterItemIds: ids,
      });
      set((state) => {
        state.newsletterItems.loading = false;
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
