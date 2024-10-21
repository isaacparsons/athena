import _ from 'lodash';
import {
  LocationInput,
  NewsletterItemBase,
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
} from '@athena/athena-common';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing

type BaseItem = Pick<NewsletterItemBase, 'date' | 'title'> & {
  tempId: number;
  location: LocationInput;
};

type StoreUpdateNewsletterMediaItemDetails = Pick<
  NewsletterItemDetailsMedia,
  'caption' | 'name'
>;
export type StoreAddNewsletterMediaItem = BaseItem & {
  details: StoreUpdateNewsletterMediaItemDetails & {
    type: 'media';
  };
  file: File;
};

type StoreUpdateNewsletterTextItemDetails = Pick<
  NewsletterItemDetailsText,
  'description' | 'name' | 'link'
>;
export type StoreAddNewsletterTextItem = BaseItem & {
  details: StoreUpdateNewsletterTextItemDetails & {
    type: 'text';
  };
};

export type StoreItem =
  | StoreAddNewsletterMediaItem
  | StoreAddNewsletterTextItem;

export type StoreItems = Record<number, StoreItem>;

export interface CreateNewsletterItemsSlice {
  items: StoreItems;
  addItem: (item: StoreItem) => void;
  removeItem: (id: number) => void;
  updateItemDetails: (
    id: number,
    details:
      | Partial<StoreUpdateNewsletterMediaItemDetails>
      | Partial<StoreUpdateNewsletterTextItemDetails>
  ) => void;
}

export const createCreateNewslettersItemsSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  CreateNewsletterItemsSlice
> = (set, get) => ({
  nextItemId: null,
  previousItemId: null,
  items: {},
  addItem: (item: StoreItem) => {
    set((state) => {
      state.items[item.tempId] = item;
    });
  },
  removeItem: (id: number) => {
    set((state) => {
      delete state.items[id];
    });
  },
  updateItemDetails: (
    id: number,
    details:
      | Partial<StoreUpdateNewsletterMediaItemDetails>
      | Partial<StoreUpdateNewsletterTextItemDetails>
  ) => {
    set((state) => {
      if (state.items[id].details.type === 'text') {
        const oldItem = state.items[id] as StoreAddNewsletterTextItem;
        state.items[id] = {
          ...(oldItem as StoreAddNewsletterTextItem),
          details: {
            ...oldItem.details,
            ...(details as Partial<StoreUpdateNewsletterTextItemDetails>),
          },
        };
      }
      if (state.items[id].details.type === 'media') {
        const oldItem = state.items[id] as StoreAddNewsletterMediaItem;
        state.items[id] = {
          ...(oldItem as StoreAddNewsletterMediaItem),
          details: {
            ...oldItem.details,
            ...(details as Partial<StoreUpdateNewsletterMediaItemDetails>),
          },
        };
      }
    });
  },
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
