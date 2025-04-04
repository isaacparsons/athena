import _ from 'lodash';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { Slices } from '@athena/store';
import { CreateNewsletter, Newsletter, NewsletterPost } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';

export type StoreNewsletter = Newsletter;

export interface NewslettersSlice {
  newsletters: {
    loading: boolean;
    data: Record<number, StoreNewsletter>;
    fetch: (id: number) => Promise<void>;
    create: (newsletter: CreateNewsletter) => Promise<number>;
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
      const newsletter = await asyncTrpcClient.newsletters.get.query({
        id,
      });
      set((state) => {
        state.newsletters.loading = false;
        state.newsletters.data[newsletter.id] = newsletter;

        state.newsletterPosts.data = resetNewsletterPosts(
          id,
          state.newsletterPosts.data
        );
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

const resetNewsletterPosts = (
  newsletterId: number,
  data: Record<number, NewsletterPost>
) => {
  const newData = { ...data };
  _.values(data)
    .filter((p) => p.newsletterId === newsletterId)
    .forEach((p) => _.unset(newData, [p.id]));

  return newData;
};
