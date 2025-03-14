import { trpc, loggedInProcedure } from '..';
import * as nanoid from 'nanoid';
import {
  createNewsletterPost,
  createNewsletterPostsBatch,
  deleteBatchInput,
  getInput,
  getPostUploadLinks,
  updateNewsletterPost,
} from '@athena/common';

const router = trpc.router({
  get: loggedInProcedure.input(getInput).query(async ({ input, ctx }) => {
    return ctx.dao.newsletterPost.get(input.id);
  }),
  getPostUploadLinks: loggedInProcedure
    .input(getPostUploadLinks)
    .query(async ({ input, ctx }) => {
      return Promise.all(
        input.posts.map(async (post) => {
          const fileName = `${ctx.user.userId}-${nanoid.nanoid()}`;
          const url = await ctx.gcs.getSignedUrl(fileName, 'write');
          return {
            url,
            id: post.id,
            fileName,
          };
        })
      );
    }),

  create: loggedInProcedure
    .input(createNewsletterPost)
    .mutation(async ({ input, ctx }) => {
      return ctx.dao.newsletterPost.post(ctx.user.userId, input);
    }),
  createBatch: loggedInProcedure
    .input(createNewsletterPostsBatch)
    .mutation(async ({ input, ctx }) => {
      return ctx.dao.newsletterPost.postBatch(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateNewsletterPost)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterPost.update(ctx.user.userId, input);
    }),
  deleteMany: loggedInProcedure
    .input(deleteBatchInput)
    .mutation(async ({ input, ctx }) => {
      return ctx.dao.newsletterPost.deleteMany(input);
    }),
});
export default router;
