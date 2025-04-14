import _ from 'lodash';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { Slices, useStore } from '@frontend/store';
import { CreateNewsletter, ReadNewsletter, UpdateNewsletter } from '@athena/common';
import { asyncTrpcClient } from '../../trpc';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useMemo } from 'react';

export interface NewslettersSlice {
  newsletters: {
    loading: boolean;
    data: Record<number, ReadNewsletter>;
    fetch: (id: number) => Promise<void>;
    create: (input: CreateNewsletter) => Promise<number>;
    update: (input: UpdateNewsletter) => Promise<number>;
    delete: (id: number) => Promise<number>;
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

        const existingPosts = _.values(state.newsletterPosts.data).filter(
          (p) => p.newsletterId === id
        );

        const deletedPosts = _.differenceBy(
          existingPosts,
          newsletter.posts,
          (p) => p.id
        );
        deletedPosts.forEach((p) => {
          delete state.newsletterPosts.data[p.id];
        });
        newsletter.posts.forEach((p) => {
          state.newsletterPosts.data[p.id] = p;
        });
      });
    },
    create: async (input: CreateNewsletter) => {
      const id = await asyncTrpcClient.newsletters.create.mutate(input);
      await get().newsletters.fetch(id);
      await get().user.fetch();
      return id;
    },
    update: async (input: UpdateNewsletter) => {
      const id = await asyncTrpcClient.newsletters.update.mutate(input);
      await get().newsletters.fetch(input.id);
      await get().user.fetch();
      return id;
    },
    delete: async (id: number) => {
      const deletedId = await asyncTrpcClient.newsletters.delete.mutate({ id });
      set((state) => {
        delete state.newsletters.data[id];
      });
      await get().user.fetch();
      return deletedId;
    },
  },
});

export const useNewsletters = () => {
  return useStore(
    useShallow((state) => ({
      fetch: state.newsletters.fetch,
      deleteNewsletter: state.newsletters.delete,
      create: state.newsletters.create,
      update: state.newsletters.update,
      newsletters: state.newsletters.data,
      loading: state.newsletters.loading,
    }))
  );
};

export const useNewsletter = (newsletterId: number) => {
  const { newsletters, fetch, loading } = useNewsletters();

  useEffect(() => {
    if (!newsletters[newsletterId] && !loading) fetch(newsletterId);
  }, [newsletters, newsletterId, fetch, loading]);

  return useMemo(() => {
    return {
      loading,
      newsletter: newsletters[newsletterId],
    };
  }, [newsletterId, newsletters, loading]);
};
