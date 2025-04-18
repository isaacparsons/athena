import _ from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { createUserSlice, UserSlice } from './user';
import { createNewslettersSlice, NewslettersSlice } from './newsletters';
import {
  createNewsletterPostsSlice,
  NewsletterPostsSlice,
} from './newsletter-posts';
import { createTemplatesSlice, TemplatesSlice } from './templates';

export type Slices = UserSlice &
  NewslettersSlice &
  NewsletterPostsSlice &
  TemplatesSlice;

export const useStore = create<Slices>()(
  devtools(
    immer(
      subscribeWithSelector((...a) => ({
        ...createUserSlice(...a),
        ...createNewslettersSlice(...a),
        ...createNewsletterPostsSlice(...a),
        ...createTemplatesSlice(...a),
      }))
    )
  )
);

export * from './user';
export * from './newsletters';
export * from './newsletter-posts';
export * from './templates';
