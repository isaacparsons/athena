import _ from 'lodash';
import axios from 'axios';
import {
  CreateManyNewsletterPosts,
  DeleteBatchInput,
  //   CreateNewsletterPostBatchItem,
  NewsletterPost,
  NewsletterPostTypeName,
  //   NewsletterPostPostName,
  NodePosition,
  //   UpdateNewsletterPost,
} from '@athena/common';
import {
  // FileMap,
  Slices,
} from '@athena/store';
import { StateCreator } from 'zustand';
import type {} from '@redux-devtools/extension';
import { asyncTrpcClient } from '../../trpc';
// import { mapToStoreItem, traverseItemIds } from '../../util';

export type FileMap = Record<string, File>;

// export type StoreNewsletterPost<
//   T extends NewsletterPostPostName = NewsletterPostPostName
// > = Omit<NewsletterPost<T>, 'children'> & {
//   childrenIds: number[];
// };

// export type StoreNewsletterPost = Omit<NewsletterPost, 'children'>;

export interface NewsletterPostsSlice {
  newsletterPosts: {
    loading: boolean;
    data: Record<number, NewsletterPost>;
    saving: boolean;
    create: (input: CreateManyNewsletterPosts, files?: FileMap) => Promise<void>;
    delete: (newsletterId: number, input: DeleteBatchInput) => Promise<void>;

    // editing: boolean;
    // selectedItemIds: number[];
    // uploading: boolean;
    // setEditing: (editing: boolean) => void;
    // updatedItem: UpdateNewsletterPost | null;
    // setUpdatedItem: (item: UpdateNewsletterPost | null) => void;
    // update: () => Promise<void>;
    // selectItemIds: (itemsIds: number[]) => void;
    // fetch: (id: number) => Promise<void>;
    // upload: (
    //   newsletterId: number,
    //   position: NodePosition,
    //   batch: CreateNewsletterPostBatchItem[],
    //   files: FileMap
    // ) => Promise<void>;
  };
}

const DEFAULT_DATA = {
  loading: false,
  data: {},
  saving: false,
  //   editing: false,
  //   selectedItemIds: [],
  //   uploading: false,
  //   updatedItem: null,
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
      const post = await asyncTrpcClient.newsletterPosts.get.query({
        id,
      });
      set((state) => {
        state.newsletterPosts.loading = false;
        state.newsletterPosts.data[post.id] = post;

        post.children?.forEach((child) => {
          state.newsletterPosts.data[child.id] = child;
        });
      });
    },
    // setEditing: (editing: boolean) => {
    //   set((state) => {
    //     state.newsletterPosts.editing = editing;
    //   });
    // },
    // selectItemIds: (itemsIds: number[]) => {
    //   set((state) => {
    //     state.newsletterItems.selectedItemIds = traverseItemIds(
    //       _.cloneDeep(state.newsletterItems.data),
    //       [],
    //       _.cloneDeep(itemsIds)
    //     );
    //   });
    // },
    // setUpdatedItem: (item: UpdateNewsletterPost | null) => {
    //   set((state) => {
    //     state.newsletterItems.updatedItem = item
    //       ? {
    //           ...(state.newsletterItems.updatedItem ?? {}),
    //           ...item,
    //         }
    //       : null;
    //   });
    // },
    // update: async () => {
    //   const item = get().newsletterItems.updatedItem;
    //   if (!item) return;

    //   await asyncTrpcClient.newsletterItems.update.mutate(item);
    //   await get().newsletters.fetch(item.newsletterId);

    //   set((state) => {
    //     state.newsletterItems.editing = false;
    //     state.newsletterItems.updatedItem = null;
    //   });
    // },

    create: async (input: CreateManyNewsletterPosts, files?: FileMap) => {
      set((state) => {
        state.newsletterPosts.saving = true;
      });

      const signedUrls =
        files === undefined
          ? []
          : await asyncTrpcClient.newsletterPosts.getPostUploadLinks.query({
              posts: Object.keys(files).map((id) => ({ id })),
            });

      const signedUrlsMap = new Map(signedUrls.map((su) => [su.id, su]));

      const posts = await Promise.all(
        input.posts.map(async (post) => {
          if (post.details.type === NewsletterPostTypeName.Media) {
            const itemUploadInfo = signedUrlsMap.get(post.tempPosition.id);
            const file = _.get(files, post.tempPosition.id);

            if (!itemUploadInfo || !file) throw new Error('invalid file');
            await axios.put(itemUploadInfo.url, file);
            post.details.fileName = itemUploadInfo.fileName;
          }
          return post;
        })
      );

      await asyncTrpcClient.newsletterPosts.createMany.mutate({
        ...input,
        posts,
      });

      await get().newsletters.fetch(input.newsletterId);

      set((state) => {
        state.newsletterPosts.saving = false;
      });
    },
    delete: async (newsletterId: number, input: DeleteBatchInput) => {
      set((state) => {
        state.newsletterPosts.saving = true;
      });
      await asyncTrpcClient.newsletterPosts.deleteMany.mutate(input);
      // await get().newsletters.fetch(newsletterId);
      set((state) => {
        state.newsletterPosts.saving = false;
      });
    },
  },
});
