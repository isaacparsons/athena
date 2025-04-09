import _ from 'lodash';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { Slices } from '@athena/store';
import { CreateNewsletter, ReadNewsletter } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';

export interface NewslettersSlice {
  newsletters: {
    loading: boolean;
    data: Record<number, ReadNewsletter>;
    fetch: (id: number) => Promise<void>;
    create: (newsletter: CreateNewsletter) => Promise<number>;
    // update: (newsletter: UpdateNewsletter) => Promise<number>;
  };
}

export const createNewslettersSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  NewslettersSlice
> = (set, get) => ({
  newsletters: {
    loading: false,
    data: {},
    fetch: async (id: number) => {
      set((state) => {
        state.newsletters.loading = true;
      });
      const newsletter = await asyncTrpcClient.newsletters.read.query({
        id,
      });
      set((state) => {
        state.newsletters.loading = false;
        state.newsletters.data[newsletter.id] = newsletter;

        _.values(state.newsletterPosts.data)
          .filter((p) => p.id === id)
          .forEach((p) => _.unset(state.newsletters.data, [p.id]));

        newsletter.posts.forEach((p) => {
          state.newsletterPosts.data[p.id] = p;
        });
      });
    },
    create: async (newsletter: CreateNewsletter) => {
      const id = await asyncTrpcClient.newsletters.create.mutate(newsletter);
      await get().newsletters.fetch(id);
      await get().user.fetch();
      return id;
    },
  },
});
