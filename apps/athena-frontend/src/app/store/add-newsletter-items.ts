import _ from 'lodash';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import {
  LocationInput,
  NewsletterItemBase,
  NewsletterItemDetailsMedia,
} from '@athena/athena-common';
import { Slices } from '.';

export type StoreAddNewsletterMediaItem = Pick<
  NewsletterItemBase,
  'date' | 'title'
> & {
  location: LocationInput;
  details: Pick<NewsletterItemDetailsMedia, 'caption' | 'name'> & {
    type: 'media';
  };
  file: File;
  tempId: number;
};

export type StoreMediaItems = Record<number, StoreAddNewsletterMediaItem>;

export interface CreateNewsletterItemsSlice {
  mediaItems: Record<number, StoreAddNewsletterMediaItem>;
  addMediaItem: (mediaItem: StoreAddNewsletterMediaItem) => void;
  removeMediaItem: (id: number) => void;
}

export const createCreateNewslettersItemsSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  CreateNewsletterItemsSlice
> = (set, get) => ({
  mediaItems: {},
  addMediaItem: (mediaItem: StoreAddNewsletterMediaItem) => {
    set((state) => {
      state.mediaItems[mediaItem.tempId] = mediaItem;
    });
  },
  removeMediaItem: (id: number) => {
    set((state) => {
      delete state.mediaItems[id];
    });
  },
});
