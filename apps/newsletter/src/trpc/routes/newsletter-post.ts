import { trpc, loggedInProcedure } from '..';
import { nanoid } from 'nanoid';
import {
  deleteManySchema,
  readPostUploadLinksSchema,
  readSchema,
  createManyNewsletterPostsSchema,
  updateManyNewsletterPostsSchema,
} from '@athena/common';

const router = trpc.router({
  read: loggedInProcedure.input(readSchema).query(async ({ input, ctx }) => {
    return ctx.dao.newsletterPost.read(input.id);
  }),
  readPostUploadLinks: loggedInProcedure
    .input(readPostUploadLinksSchema)
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
    .input(createManyNewsletterPostsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.dao.newsletterPost.createMany(ctx.user.userId, input);
    }),
  updateMany: loggedInProcedure
    .input(updateManyNewsletterPostsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterPost.updateMany(ctx.user.userId, input);
    }),
  deleteMany: loggedInProcedure
    .input(deleteManySchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.dao.newsletterPost.deleteMany(ctx.user.userId, input);
    }),
});
export default router;
