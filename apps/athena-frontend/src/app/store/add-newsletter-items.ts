import _ from 'lodash';
import {
  CreateNewsletterItemDetailsInput,
  LocationInput,
  logObject,
  NewsletterItemType,
} from '@athena/athena-common';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { mapToArray } from '../../util/helpers';
import { asyncTrpcClient } from '../../trpc';
import axios from 'axios';

type NullableId = number | null;

export interface StoreAddNewsletterItemDetailsBase<T = NewsletterItemType> {
  type: T;
  name: string;
}

export interface StoreAddNewsletterItemDetailsText
  extends StoreAddNewsletterItemDetailsBase<NewsletterItemType.text> {
  description?: string;
  link?: string;
}

export interface StoreAddNewsletterItemDetailsMedia
  extends StoreAddNewsletterItemDetailsBase<NewsletterItemType.media> {
  fileName: string;
  caption?: string;
  file: File;
}

export type StoreAddNewsletterItemDetails =
  | StoreAddNewsletterItemDetailsText
  | StoreAddNewsletterItemDetailsMedia;

export interface StoreAddNewsletterItemInput<
  T = StoreAddNewsletterItemDetails
> {
  title: string;
  date?: string;
  location: LocationInput;
  details: T;
}

export interface StoreAddNewsletterItem<T = StoreAddNewsletterItemDetails>
  extends StoreAddNewsletterItemInput<T> {
  temp: {
    id: number;
    nextItemId: NullableId;
    previousItemId: NullableId;
    parentId: NullableId;
  };
}

export type StoreAddNewsletterItemsData = Record<
  number,
  StoreAddNewsletterItem
>;

export type StoreAddNewsletterItemsExistingItem = {
  newsletterId: number;
  parentId: NullableId;
  nextItemId: NullableId;
  previousItemId: NullableId;
};

export type StoreUpdateNewsletterItemDetails<
  T = StoreAddNewsletterItemDetails
> = Omit<Partial<T>, 'type'> & Pick<StoreAddNewsletterItemDetails, 'type'>;

export type StoreUpdateNewsletterItem<T extends StoreAddNewsletterItemDetails> =
  {
    details?: StoreUpdateNewsletterItemDetails<T>;
    item?: Partial<StoreAddNewsletterItemInput>;
  };

export interface CreateNewsletterItemsSlice {
  nextAvailableId: number;
  uploading: boolean;
  existingItem: StoreAddNewsletterItemsExistingItem | null;
  data: StoreAddNewsletterItemsData;
  openDialog: (existingItem: StoreAddNewsletterItemsExistingItem) => void;
  addItems: (
    parentId: NullableId,
    items: StoreAddNewsletterItemInput[]
  ) => void;
  removeItem: (id: number) => void;
  updateItemDetails: <T extends StoreAddNewsletterItemDetails>(
    id: number,
    item: StoreUpdateNewsletterItem<T>
  ) => void;
  upload: () => Promise<void>;
  reset: () => void;
}

const DEFAULT_DATA = {
  nextAvailableId: 1,
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
  addItems: (parentId: NullableId, items: StoreAddNewsletterItemInput[]) =>
    set((state) => {
      items.forEach((i) => {
        const previousItem = mapToArray(state.data).find(
          (i) => i.temp.parentId === parentId && i.temp.nextItemId === null
        );
        const id = state.nextAvailableId;
        state.data[id] = {
          temp: {
            id,
            nextItemId: null,
            previousItemId: previousItem?.temp.id ?? null,
            parentId: parentId,
          },
          ...i,
        };
        if (previousItem) state.data[previousItem.temp.id].temp.nextItemId = id;
        state.nextAvailableId = id + 1;
      });
    }),
  removeItem: (id: number) =>
    set((state) => {
      delete state.data[id];
    }),
  updateItemDetails: <T extends StoreAddNewsletterItemDetails>(
    id: number,
    item: StoreUpdateNewsletterItem<T>
  ) =>
    set((state) => {
      const existing = state.data[id];
      state.data[id] = {
        ...existing,
        ...(item.item ?? {}),
        details: {
          ...existing.details,
          ...(item.details ?? {}),
        } as T,
      };
    }),
  upload: async () => {
    set((state) => {
      state.uploading = true;
    });
    const data = get().data;
    const existingItem = get().existingItem;
    const items = mapToArray(data);
    const mediaItemIds = items
      .filter((i) => i.details.type === NewsletterItemType.media)
      .map((i) => ({ id: i.temp.id.toString() }));
    const signedUrls =
      await asyncTrpcClient.newsletterItems.getItemUploadLinks.query({
        items: mediaItemIds,
      });
    const signedUrlsMap = new Map(
      signedUrls.map((su) => [_.parseInt(su.id), su])
    );

    if (existingItem === null) return;

    const batch = await Promise.all(
      items.map(async (item) => {
        let itemDetails = item.details as CreateNewsletterItemDetailsInput;
        if (item.details.type === NewsletterItemType.media) {
          const d = item.details as StoreAddNewsletterItemDetailsMedia;
          const itemUploadInfo = signedUrlsMap.get(item.temp.id);
          if (!itemUploadInfo) throw new Error('no signed url to upload photo');
          await axios.put(itemUploadInfo.url, d.file);
          itemDetails = {
            ...d,
            fileName: itemUploadInfo.fileName,
          };
        }
        return {
          ...item,
          details: itemDetails,
        };
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
