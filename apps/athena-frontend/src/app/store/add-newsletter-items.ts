import _ from 'lodash';
import axios from 'axios';
import { nanoid } from 'nanoid';

import {
  NewsletterItemTypeName,
  CreateNewsletterItemInput,
  TempNewsletterItemIds,
  CreateItemDetailsInput,
  NewsletterItem,
  isMediaDetailsInput,
  DeepPartial,
} from '@athena/athena-common';
import { create, StateCreator } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {} from '@redux-devtools/extension';
import { mapToArray } from '../../util';
import { asyncTrpcClient } from '../../trpc';

type ParentId = string | null;

export type NewsletterItemDetailsType = NewsletterItemTypeName | undefined;

export type StoreItemDetails<
  T extends NewsletterItemDetailsType = NewsletterItemDetailsType
> = T extends 'media'
  ? CreateItemDetailsInput<'media'> & { file: File | null }
  : T extends 'text'
  ? CreateItemDetailsInput<T>
  : undefined;

export type StoreAddNewsletterItemInput<
  T extends NewsletterItemDetailsType = NewsletterItemDetailsType
> = Omit<
  CreateNewsletterItemInput,
  'newsletterId' | 'nextItemId' | 'previousItemId' | 'parentId' | 'details'
> & {
  details: StoreItemDetails<T>;
} & { temp?: TempNewsletterItemIds };

export type StoreAddNewsletterItem<
  T extends NewsletterItemDetailsType = NewsletterItemDetailsType
> = StoreAddNewsletterItemInput<T> & { temp: TempNewsletterItemIds };

export type StoreAddNewsletterItemsData = Record<string, StoreAddNewsletterItem>;

export type StoreAddNewsletterItemsExistingItem = Pick<
  NewsletterItem,
  'newsletterId' | 'parentId' | 'nextItemId' | 'previousItemId'
>;

export interface CreateNewsletterItemsSlice {
  uploading: boolean;
  existingItem: StoreAddNewsletterItemsExistingItem | null;
  data: StoreAddNewsletterItemsData;
  openDialog: (existingItem: StoreAddNewsletterItemsExistingItem) => void;
  addItems: (parentId: ParentId, items: StoreAddNewsletterItemInput[]) => void;
  removeItem: (id: string) => void;
  updateItemDetails: <
    T extends NewsletterItemDetailsType = NewsletterItemDetailsType
  >(
    id: string,
    item: DeepPartial<StoreAddNewsletterItemInput<T>>
  ) => void;
  upload: () => Promise<void>;
  reset: () => void;
}

const DEFAULT_DATA = {
  uploading: false,
  existingItem: null,
  data: {},
};

export const createCreateNewslettersItemsSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  CreateNewsletterItemsSlice
> = (set, get) => ({
  ...DEFAULT_DATA,
  openDialog: (existingItem: StoreAddNewsletterItemsExistingItem) =>
    set((state) => {
      state.existingItem = existingItem;
    }),
  addItems: (parentId: ParentId, items: StoreAddNewsletterItemInput[]) =>
    set((state) => {
      // items with temp specified:
      // items where parentId is null, should have a parentId = parentId
      // all other items should be added without setting temp
      const itemsWithTemp = items.filter((i) => i.temp !== undefined);

      itemsWithTemp
        .filter((i) => i.temp?.parentId === null)
        .forEach((i) => {
          if (i.temp === undefined) return;
          state.data[i.temp.id] = { ...i, temp: { ...i.temp, parentId: parentId } };
        });

      itemsWithTemp
        .filter((i) => i.temp?.parentId !== null && i.temp !== undefined)
        .forEach((i) => {
          if (i.temp) {
            state.data[i.temp.id] = { ...i, temp: i.temp };
          }
        });

      // items without temp specified:
      const itemsWithoutTemp = items.filter((i) => i.temp === undefined);
      itemsWithoutTemp.forEach((i) => {
        const id = nanoid();
        const previousItem = mapToArray(state.data).find(
          (i) => i.temp.parentId === parentId && i.temp.nextId === null
        );
        state.data[id] = {
          temp: {
            id,
            nextId: null,
            prevId: previousItem?.temp.id ?? null,
            parentId: parentId,
          },
          ...i,
        };
        if (previousItem) state.data[previousItem.temp.id].temp.nextId = id;
      });
    }),
  removeItem: (id: string) =>
    set((state) => {
      delete state.data[id];
    }),
  updateItemDetails: <
    T extends NewsletterItemDetailsType = NewsletterItemDetailsType
  >(
    id: string,
    item: DeepPartial<StoreAddNewsletterItemInput<T>>
  ) =>
    set((state) => {
      state.data[id] = _.merge(state.data[id], item);
    }),
  upload: async () => {
    set((state) => {
      state.uploading = true;
    });
    const data = get().data;
    const existingItem = get().existingItem;
    const items = mapToArray(data);
    const mediaItemIds = items
      .filter((i) => i.details?.type === 'media')
      .map((i) => ({ id: i.temp.id.toString() }));
    const signedUrls =
      await asyncTrpcClient.newsletterItems.getItemUploadLinks.query({
        items: mediaItemIds,
      });
    const signedUrlsMap = new Map(signedUrls.map((su) => [su.id, su]));

    if (existingItem === null) return;

    const batch = await Promise.all(
      items.map(async (item) => {
        let resolvedItem = item;
        const itemUploadInfo = signedUrlsMap.get(item.temp.id);
        if (isMediaDetailsInput(item.details)) {
          const { details } = item;
          if (!itemUploadInfo) throw new Error('no signed url to upload photo');
          await axios.put(itemUploadInfo.url, details.file);
          const fileName = itemUploadInfo.fileName as string;
          resolvedItem = {
            ...item,
            details: {
              ...details,
              fileName,
            },
          };
        }
        return { newsletterId: existingItem.newsletterId, ...resolvedItem };
      })
    );

    await asyncTrpcClient.newsletterItems.createBatch.mutate({
      newsletterId: existingItem.newsletterId,
      parentId: existingItem.parentId,
      nextItemId: existingItem.nextItemId,
      previousItemId: existingItem.previousItemId,
      batch: batch,
    });

    set((state) => {
      state.uploading = false;
    });
  },
  reset: () => set(DEFAULT_DATA),
});

export type Slices = CreateNewsletterItemsSlice;

export const useAddItemsStore = create<Slices>()(
  devtools(
    immer(
      subscribeWithSelector((...a) => ({
        ...createCreateNewslettersItemsSlice(...a),
      }))
    )
  )
);
