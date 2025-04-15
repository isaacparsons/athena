import _ from 'lodash';
import axios from 'axios';
import {
  CreateManyNewsletterPosts,
  DeleteMany,
  NewsletterPost,
  NewsletterPostTypeName,
  ReadNewsletterPost,
  UpdateManyNewsletterPosts,
} from '@athena/common';
import { Slices, useStore } from '@frontend/store';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { asyncTrpcClient } from '../../trpc';
import { useShallow } from 'zustand/react/shallow';

export interface NewsletterPostsSlice {
  newsletterPosts: {
    loading: boolean;
    data: Record<number, ReadNewsletterPost>;
    saving: boolean;
    fetch: (id: number) => Promise<ReadNewsletterPost>;
    create: (
      input: CreateManyNewsletterPosts,
      files?: [string, File][]
    ) => Promise<void>;
    update: (
      newsletterId: number,
      input: UpdateManyNewsletterPosts,
      files?: [string, File][]
    ) => Promise<void>;
    delete: (newsletterId: number, input: DeleteMany) => Promise<void>;
  };
}

const DEFAULT_DATA = {
  loading: false,
  data: {},
  saving: false,
};

export const createNewsletterPostsSlice: StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  NewsletterPostsSlice
> = (set, get) => ({
  newsletterPosts: {
    ...DEFAULT_DATA,
    fetch: async (id: number) => {
      set((state) => {
        state.newsletterPosts.loading = true;
      });
      const post = await asyncTrpcClient.newsletterPosts.read.query({
        id,
      });
      set((state) => {
        state.newsletterPosts.loading = false;
        state.newsletterPosts.data[post.id] = post;

        post.children?.forEach((child) => {
          state.newsletterPosts.data[child.id] = child;
        });
      });
      return post;
    },
    create: async (input: CreateManyNewsletterPosts, files?: [string, File][]) => {
      set((state) => {
        state.newsletterPosts.saving = true;
      });

      const signedUrls =
        files === undefined
          ? []
          : await asyncTrpcClient.newsletterPosts.readPostUploadLinks.query({
              posts: files.map(([id]) => ({ id })),
            });

      const signedUrlsMap = new Map(signedUrls.map((su) => [su.id, su]));

      const posts = await Promise.all(
        input.posts.map(async (post) => {
          if (post.details.type === NewsletterPostTypeName.Media) {
            const itemUploadInfo = signedUrlsMap.get(post.tempPosition.id);
            const file = files?.find((f) => f[0] === post.tempPosition.id);

            if (!itemUploadInfo || !file) throw new Error('invalid file');
            await axios.put(itemUploadInfo.url, file[1]);
            post.details.fileName = itemUploadInfo.fileName;
          }
          return post;
        })
      );

      const postIds = await asyncTrpcClient.newsletterPosts.createMany.mutate({
        ...input,
        posts,
      });

      await get().newsletters.fetch(input.newsletterId);

      await Promise.all(postIds.map(async (id) => get().newsletterPosts.fetch(id)));

      set((state) => {
        state.newsletterPosts.saving = false;
      });
    },
    update: async (
      newsletterId: number,
      input: UpdateManyNewsletterPosts,
      files?: [string, File][]
    ) => {
      set((state) => {
        state.newsletterPosts.saving = true;
      });
      // TODO update images if necessary
      await asyncTrpcClient.newsletterPosts.updateMany.mutate(input);
      await get().newsletters.fetch(newsletterId);
      set((state) => {
        state.newsletterPosts.saving = false;
      });
    },
    delete: async (newsletterId: number, input: DeleteMany) => {
      set((state) => {
        state.newsletterPosts.saving = true;
      });
      await asyncTrpcClient.newsletterPosts.deleteMany.mutate(input);
      await get().newsletters.fetch(newsletterId);
      set((state) => {
        state.newsletterPosts.saving = false;
      });
    },
  },
});

export const useNewsletterPosts = (newsletterId: number) => {
  const { posts, createPosts, updatePosts, deletePosts, loading, fetchPosts } =
    useStore(
      useShallow((state) => ({
        fetchPosts: state.newsletterPosts.fetch,
        posts: state.newsletterPosts.data,
        loading: state.newsletterPosts.loading,
        createPosts: state.newsletterPosts.create,
        updatePosts: state.newsletterPosts.update,
        deletePosts: state.newsletterPosts.delete,
      }))
    );
  return {
    loading,
    posts: Object.values(posts).filter(
      (p) => p.newsletterId === newsletterId
    ) as NewsletterPost[],
    createPosts,
    updatePosts,
    deletePosts,
    fetchPosts,
  };
};
