import { trpc, loggedInProcedure } from '..';
import {
  getNewsletterInput,
  postNewsletterInput,
  updateNewsletterInput,
  deleteNewsletterInput,
} from '@athena/common';

const router = trpc.router({
  get: loggedInProcedure.input(getNewsletterInput).query(({ input, ctx }) => {
    return ctx.dao.newsletter.get(input.newsletterId);
  }),
  post: loggedInProcedure.input(postNewsletterInput).mutation(({ ctx, input }) => {
    return ctx.dao.newsletter.post(ctx.user.userId, input);
  }),
  update: loggedInProcedure
    .input(updateNewsletterInput)
    .mutation(({ ctx, input }) => {
      return ctx.dao.newsletter.update(ctx.user.userId, input);
    }),
  delete: loggedInProcedure
    .input(deleteNewsletterInput)
    .mutation(({ ctx, input }) => {
      return ctx.dao.newsletter.delete(ctx.user.userId, input.id);
    }),
});

export default router;
