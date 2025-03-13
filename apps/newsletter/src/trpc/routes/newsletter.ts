import { trpc, loggedInProcedure } from '..';
import {
  createNewsletter,
  deleteInput,
  getInput,
  updateNewsletter,
} from '@athena/common';

const router = trpc.router({
  get: loggedInProcedure.input(getInput).query(({ input, ctx }) => {
    return ctx.dao.newsletter.get(input.id);
  }),
  post: loggedInProcedure.input(createNewsletter).mutation(({ ctx, input }) => {
    return ctx.dao.newsletter.post(ctx.user.userId, input);
  }),
  update: loggedInProcedure.input(updateNewsletter).mutation(({ ctx, input }) => {
    return ctx.dao.newsletter.update(ctx.user.userId, input);
  }),
  delete: loggedInProcedure.input(deleteInput).mutation(({ ctx, input }) => {
    return ctx.dao.newsletter.delete(ctx.user.userId, input.id);
  }),
});

export default router;
