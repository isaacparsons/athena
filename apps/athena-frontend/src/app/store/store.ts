import _ from 'lodash';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { Newsletter, NewsletterItem, User } from '@athena/athena-common';
import {
  createAddNewslettersItemsSlice,
  NewsletterItemsSlice,
} from './add-newsletter-items';

type StoreNewsletter = Omit<Newsletter, 'items'> & {
  itemIds: number[];
};

type StoreNewsletterItem = Omit<NewsletterItem, 'children'> & {
  childrenIds: number[];
};

export interface NewslettersSlice {
  user: User | null;
  newsletters: Record<number, StoreNewsletter>;
  newsletterItems: Record<number, StoreNewsletterItem>;
  fetchedUser: (user: User) => void;
  fetchedNewsletter: (newsletter: Newsletter) => void;
}

export type Slices = NewslettersSlice & NewsletterItemsSlice;

const createNewslettersSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  NewslettersSlice
> = (set, get) => ({
  user: null,
  newsletters: {},
  newsletterItems: {},
  fetchedUser: (user) =>
    set((state) => {
      state.user = user;
    }),
  fetchedNewsletter: (newsletter: Newsletter) =>
    set((state) => {
      const items = newsletter.items;
      state.newsletters[newsletter.id] = {
        ..._.omit(newsletter, ['items']),
        itemIds: items.map((i) => i.id),
      };
      items.forEach((item) => {
        const childrenIds = item.children.map((c) => c.id);
        state.newsletterItems[item.id] = {
          ..._.omit(item, ['children']),
          childrenIds,
        };
      });
    }),
});

export const useStore = create<Slices>()(
  devtools(
    immer((...a) => ({
      ...createNewslettersSlice(...a),
      ...createAddNewslettersItemsSlice(...a),
    }))
  )
);
