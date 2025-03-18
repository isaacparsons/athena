import { trpc, loggedInProcedure } from '..';
import {
  createNewsletter,
  deleteInput,
  getInput,
  inviteNewsletterUser,
  updateNewsletter,
} from '@athena/common';

const router = trpc.router({
  get: loggedInProcedure.input(getInput).query(async ({ input, ctx }) => {
    return await ctx.dao.newsletter.get(input.id);
  }),
  post: loggedInProcedure
    .input(createNewsletter)
    .mutation(async ({ ctx, input }) => {
      return await ctx.dao.newsletter.create(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateNewsletter)
    .mutation(async ({ ctx, input }) => {
      return await ctx.dao.newsletter.update(ctx.user.userId, input);
    }),
  delete: loggedInProcedure.input(deleteInput).mutation(async ({ ctx, input }) => {
    return await ctx.dao.newsletter.delete(ctx.user.userId, input.id);
  }),
  inviteUser: loggedInProcedure
    .input(inviteNewsletterUser)
    .mutation(async ({ ctx, input }) => {
      return ctx.dao.newsletter.inviteUser(ctx.user.userId, input);
    }),
});

export default router;
