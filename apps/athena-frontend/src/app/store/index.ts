import _ from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { createUserSlice, UserSlice } from './user';
import { createNewslettersSlice, NewslettersSlice } from './newsletters';
import { NewsletterItemsSlice } from './newsletter-items';
import { createNewsletterItemsSlice } from './newsletter-items';

export type Slices = UserSlice & NewslettersSlice & NewsletterItemsSlice;

export const useStore = create<Slices>()(
  devtools(
    immer(
      subscribeWithSelector((...a) => ({
        ...createUserSlice(...a),
        ...createNewslettersSlice(...a),
        ...createNewsletterItemsSlice(...a),
      }))
    )
  )
);

export * from './user';
export * from './newsletters';
export * from './newsletter-items';
export * from './add-newsletter-items';
