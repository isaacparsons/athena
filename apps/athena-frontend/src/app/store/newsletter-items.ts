import _ from 'lodash';
import {
  NewsletterItem,
  NewsletterItemBase,
  NewsletterItemTypeName,
} from '@athena/athena-common';
import { Slices } from '../store';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { asyncTrpcClient } from '../../trpc';
import { mapToArray } from '../../util';

const mapToStoreItem = <T extends NewsletterItemTypeName = NewsletterItemTypeName>(
  item: NewsletterItem<T>
): StoreNewsletterItem<T> => {
  return {
    ..._.omit(item, ['children']),
    childrenIds: item.children.map((c) => c.id),
  };
};

export const traverseItemIds = (
  items: Record<number, StoreNewsletterItem>,
  selectedIds: number[],
  ids: number[]
) => _traverseItemIds(items, selectedIds, ids);

const _traverseItemIds = (
  items: Record<number, StoreNewsletterItem>,
  selectedIds: number[],
  ids: number[]
) => {
  if (ids.length === 0) return _.uniq(selectedIds);

  selectedIds.push(...ids);
  return _traverseItemIds(
    items,
    selectedIds,
    _.flatMap(ids, (id) => {
      const item = items[id];
      return item.childrenIds;
    })
  );
};

export type StoreNewsletterItem<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> = NewsletterItemBase<T> & {
  childrenIds: number[];
};

type NewsletterItemsData = Record<number, StoreNewsletterItem>;

export interface NewsletterItemsSlice {
  newsletterItems: {
    loading: boolean;
    data: Record<number, StoreNewsletterItem>;
    editing: boolean;
    setEditing: (editing: boolean) => void;
    selectedItemIds: number[];
    selectItemIds: (itemsIds: number[]) => void;
    fetch: (id: number) => Promise<void>;
    deleteItems: (ids: number[]) => Promise<void>;
    addItems: <T extends NewsletterItemTypeName = NewsletterItemTypeName>(
      newsletterId: number,
      items: NewsletterItemBase<T>[]
    ) => void;
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
    editing: false,
    setEditing: (editing: boolean) => {
      set((state) => {
        state.newsletterItems.editing = editing;
      });
    },
    selectedItemIds: [],
    selectItemIds: (itemsIds: number[]) => {
      set((state) => {
        state.newsletterItems.selectedItemIds = traverseItemIds(
          _.cloneDeep(state.newsletterItems.data),
          _.cloneDeep(state.newsletterItems.selectedItemIds),
          _.cloneDeep(itemsIds)
        );
      });
    },
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
    addItems: <T extends NewsletterItemTypeName = NewsletterItemTypeName>(
      newsletterId: number,
      items: NewsletterItemBase<T>[]
    ) => {
      set((state) => {
        items.forEach((item) => {
          state.newsletterItems.data[item.id] = {
            ...item,
            childrenIds: [],
          };
        });
        const newsletterItems = mapToArray(state.newsletterItems.data).filter(
          (i) => i.newsletterId === newsletterId
        );

        newsletterItems.forEach((item) => {
          state.newsletterItems.data[item.id].childrenIds = newsletterItems
            .filter((i) => i.parentId === item.id)
            .map((i) => i.id);
        });
      });
    },
  },
});
