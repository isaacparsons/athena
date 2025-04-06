import { trpc, loggedInProcedure } from '..';
import {
  createTemplateSchema,
  deleteInput,
  readInput,
  updateTemplateSchema,
} from '@athena/common';

const router = trpc.router({
  read: loggedInProcedure.input(readInput).query(({ input, ctx }) => {
    return ctx.dao.template.read(input.id);
  }),
  create: loggedInProcedure
    .input(createTemplateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.dao.template.create(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateTemplateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.dao.template.update(ctx.user.userId, input);
    }),
  delete: loggedInProcedure.input(deleteInput).mutation(({ input, ctx }) => {
    return ctx.dao.template.delete(ctx.user.userId, input.id);
  }),
});
export default router;
