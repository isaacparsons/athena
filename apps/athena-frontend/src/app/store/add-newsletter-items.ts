import _ from 'lodash';
import { nanoid } from 'nanoid';
import {
  NewsletterPostPostName,
  TempNewsletterPostIds,
  DeepPartial,
  mapToArray,
  CreateNewsletterPostBatchItem,
  NewsletterPostBase,
  Nullable,
} from '@athena/common';
import { create, StateCreator } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {} from '@redux-devtools/extension';

type ParentId = string | null;

export type NewsletterPostDetailsType = NewsletterPostPostName;
export type FileMap = Record<string, File>;

export type AddStoreNewsletterPost = (
  parentId: ParentId,
  item: Omit<CreateNewsletterPostBatchItem, 'temp'>,
  option?: {
    file?: File;
    temp?: TempNewsletterPostIds;
  }
) => void;

export type UpdateStoreNewsletterPost = <
  T extends NewsletterPostDetailsType = NewsletterPostDetailsType
>(
  id: string,
  item: DeepPartial<CreateNewsletterPostBatchItem<T>>
) => void;

export interface CreateNewsletterPostsSlice {
  files: FileMap;
  newsletterId: Nullable<number>;
  existingItem: Nullable<NewsletterPostBase>;
  data: Record<string, CreateNewsletterPostBatchItem>;
  openDialog: (
    newsletterId: number,
    existingItem: Nullable<NewsletterPostBase>
  ) => void;
  addItem: AddStoreNewsletterPost;
  removeItem: (id: string) => void;
  updateItemDetails: UpdateStoreNewsletterPost;
  reset: () => void;
}

const DEFAULT_DATA = {
  existingItem: null,
  newsletterId: null,
  data: {},
  files: {},
};

export const createCreateNewslettersItemsSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  CreateNewsletterPostsSlice
> = (set, get) => ({
  ...DEFAULT_DATA,
  openDialog: (newsletterId: number, existingItem: Nullable<NewsletterPostBase>) =>
    set((state) => {
      state.existingItem = existingItem;
      state.newsletterId = newsletterId;
    }),
  addItem: (
    parentId: ParentId,
    item: Omit<CreateNewsletterPostBatchItem, 'temp'>,
    options?: {
      file?: File;
      temp?: TempNewsletterPostIds;
    }
  ) =>
    set((state) => {
      // items with temp specified:
      // items where parentId is null, should have a parentId = parentId
      // all other items should be added without setting temp

      const id = options?.temp?.id ?? nanoid();

      if (options?.temp && options.temp.parentId === null) {
        state.data[id] = {
          ...item,
          temp: { ...options.temp, parentId: parentId },
        };
      }

      if (options?.temp && options.temp.parentId !== null) {
        state.data[id] = {
          ...item,
          temp: options.temp,
        };
      }

      if (!options || !options?.temp) {
        const previousItem = mapToArray(state.data).find(
          (i) => i.temp.parentId === parentId && i.temp.nextId === null
        );
        state.data[id] = {
          ...item,
          temp: {
            id,
            nextId: null,
            prevId: previousItem?.temp.id ?? null,
            parentId: parentId,
          },
        };
        if (previousItem) state.data[previousItem.temp.id].temp.nextId = id;
      }
      if (options?.file) state.files[id] = options.file;
    }),
  removeItem: (id: string) =>
    set((state) => {
      delete state.data[id];
    }),
  updateItemDetails: <
    T extends NewsletterPostDetailsType = NewsletterPostDetailsType
  >(
    id: string,
    item: DeepPartial<CreateNewsletterPostBatchItem<T>>
  ) =>
    set((state) => {
      state.data[id] = _.merge(state.data[id], item);
    }),
  reset: () => set(DEFAULT_DATA),
});

export type Slices = CreateNewsletterPostsSlice;

export const useAddItemsStore = create<Slices>()(
  devtools(
    immer(
      subscribeWithSelector((...a) => ({
        ...createCreateNewslettersItemsSlice(...a),
      }))
    )
  )
);
