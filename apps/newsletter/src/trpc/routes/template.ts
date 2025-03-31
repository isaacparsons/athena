import { trpc, loggedInProcedure } from '..';
import {
  createTemplate,
  deleteInput,
  getInput,
  updateTemplate,
} from '@athena/common';

const router = trpc.router({
  get: loggedInProcedure.input(getInput).query(({ input, ctx }) => {
    return ctx.dao.template.get(input.id);
  }),
  create: loggedInProcedure.input(createTemplate).mutation(({ input, ctx }) => {
    return ctx.dao.template.create(ctx.user.userId, input);
  }),
  update: loggedInProcedure.input(updateTemplate).mutation(({ input, ctx }) => {
    return ctx.dao.template.update(ctx.user.userId, input);
  }),
  delete: loggedInProcedure.input(deleteInput).mutation(({ input, ctx }) => {
    return ctx.dao.template.delete(ctx.user.userId, input.id);
  }),
});
export default router;
