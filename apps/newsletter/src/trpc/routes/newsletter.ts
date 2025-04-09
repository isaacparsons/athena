import { trpc, loggedInProcedure } from '..';
import {
  createNewsletterSchema,
  deleteSchema,
  readSchema,
  inviteNewsletterUser,
  updateNewsletterSchema,
} from '@athena/common';

const router = trpc.router({
  read: loggedInProcedure.input(readSchema).query(async ({ input, ctx }) => {
    return await ctx.dao.newsletter.read(input.id);
  }),
  create: loggedInProcedure
    .input(createNewsletterSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.dao.newsletter.create(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateNewsletterSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.dao.newsletter.update(ctx.user.userId, input);
    }),
  delete: loggedInProcedure.input(deleteSchema).mutation(async ({ ctx, input }) => {
    return await ctx.dao.newsletter.delete(ctx.user.userId, input.id);
  }),
  inviteUser: loggedInProcedure
    .input(inviteNewsletterUser)
    .mutation(async ({ ctx, input }) => {
      return ctx.dao.newsletter.inviteUser(ctx.user.userId, input);
    }),
});

export default router;
