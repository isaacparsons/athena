import { trpc, loggedInProcedure } from '..';
import { nanoid } from 'nanoid';
import {
  createManyNewsletterPosts,
  deleteBatchInput,
  getInput,
  getPostUploadLinks,
  updateNewsletterPosts,
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
          const fileName = `${ctx.user.userId}-${nanoid()}`;
          const url = await ctx.gcs.getSignedUrl(fileName, 'write');
          return {
            url,
            id: post.id,
            fileName,
          };
        })
      );
    }),

  createMany: loggedInProcedure
    .input(createManyNewsletterPosts)
    .mutation(async ({ input, ctx }) => {
      return ctx.dao.newsletterPost.createMany(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateNewsletterPosts)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterPost.update(ctx.user.userId, input);
    }),
  deleteMany: loggedInProcedure
    .input(deleteBatchInput)
    .mutation(async ({ input, ctx }) => {
      return ctx.dao.newsletterPost.deleteMany(ctx.user.userId, input);
    }),
});
export default router;
