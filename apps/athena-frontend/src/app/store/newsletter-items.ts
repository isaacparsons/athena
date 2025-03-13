import _ from 'lodash';
import axios from 'axios';
import {
  CreateNewsletterPostBatchItem,
  NewsletterPost,
  NewsletterPostPostName,
  NodePosition,
  UpdateNewsletterPost,
} from '@athena/common';
import { FileMap, Slices } from '@athena/store';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { asyncTrpcClient } from '../../trpc';
import { mapToStoreItem, traverseItemIds } from '../../util';

export type StoreNewsletterPost<
  T extends NewsletterPostPostName = NewsletterPostPostName
> = Omit<NewsletterPost<T>, 'children'> & {
  childrenIds: number[];
};

export interface NewsletterPostsSlice {
  newsletterItems: {
    loading: boolean;
    data: Record<number, StoreNewsletterPost>;
    editing: boolean;
    selectedItemIds: number[];
    uploading: boolean;
    setEditing: (editing: boolean) => void;
    updatedItem: UpdateNewsletterPost | null;
    setUpdatedItem: (item: UpdateNewsletterPost | null) => void;
    update: () => Promise<void>;
    selectItemIds: (itemsIds: number[]) => void;
    fetch: (id: number) => Promise<void>;
    upload: (
      newsletterId: number,
      position: NodePosition,
      batch: CreateNewsletterPostBatchItem[],
      files: FileMap
    ) => Promise<void>;
    deleteItems: (newsletterId: number) => Promise<void>;
  };
}

const DEFAULT_DATA = {
  uploading: false,
  loading: false,
  data: {},
  editing: false,
  selectedItemIds: [],
  updatedItem: null,
};

export const createNewsletterPostsSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  NewsletterPostsSlice
> = (set, get) => ({
  newsletterItems: {
    ...DEFAULT_DATA,
    setEditing: (editing: boolean) => {
      set((state) => {
        state.newsletterItems.editing = editing;
      });
    },
    selectItemIds: (itemsIds: number[]) => {
      set((state) => {
        state.newsletterItems.selectedItemIds = traverseItemIds(
          _.cloneDeep(state.newsletterItems.data),
          [],
          _.cloneDeep(itemsIds)
        );
      });
    },
    setUpdatedItem: (item: UpdateNewsletterPost | null) => {
      set((state) => {
        state.newsletterItems.updatedItem = item
          ? {
              ...(state.newsletterItems.updatedItem ?? {}),
              ...item,
            }
          : null;
      });
    },
    update: async () => {
      const item = get().newsletterItems.updatedItem;
      if (!item) return;

      await asyncTrpcClient.newsletterItems.update.mutate(item);
      await get().newsletters.fetch(item.newsletterId);

      set((state) => {
        state.newsletterItems.editing = false;
        state.newsletterItems.updatedItem = null;
      });
    },
    fetch: async (id: number) => {
      set((state) => {
        state.newsletterItems.loading = true;
      });
      const item = await asyncTrpcClient.newsletterItems.get.query({
        id,
      });
      set((state) => {
        state.newsletterItems.loading = false;
        state.newsletterItems.data[item.id] = mapToStoreItem(item);

        item.children.forEach((child) => {
          state.newsletterItems.data[child.id] = mapToStoreItem({
            ...child,
            children: [],
          });
        });
      });
    },
    upload: async (
      newsletterId: number,
      position: NodePosition,
      batch: CreateNewsletterPostBatchItem[],
      files: FileMap
    ) => {
      set((state) => {
        state.newsletterItems.uploading = true;
      });

      const signedUrls =
        await asyncTrpcClient.newsletterItems.getItemUploadLinks.query({
          items: Object.keys(files).map((id) => ({ id })),
        });

      const signedUrlsMap = new Map(signedUrls.map((su) => [su.id, su]));

      const newBatch = await Promise.all(
        batch.map(async (item) => {
          const newItem = _.cloneDeep(item);
          if (newItem.details.type === NewsletterPostPostName.Media) {
            const itemUploadInfo = signedUrlsMap.get(newItem.temp.id);
            const file = files[newItem.temp.id];
            if (!itemUploadInfo || !file) throw new Error('invalid file');
            await axios.put(itemUploadInfo.url, file);
            newItem.details.fileName = itemUploadInfo.fileName;
          }
          return newItem;
        })
      );

      await asyncTrpcClient.newsletterItems.createBatch.mutate({
        newsletterId,
        position,
        batch: newBatch,
      });

      await get().newsletters.fetch(newsletterId);

      set((state) => {
        state.newsletterItems.uploading = false;
      });
    },
    deleteItems: async (newsletterId: number) => {
      set((state) => {
        state.newsletterItems.loading = true;
      });
      const ids = get().newsletterItems.selectedItemIds;
      await asyncTrpcClient.newsletterItems.deleteMany.mutate({
        ids,
      });
      await get().newsletters.fetch(newsletterId);
      set((state) => {
        state.newsletterItems.loading = false;
      });
    },
  },
});
