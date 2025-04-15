import { trpc, loggedInProcedure } from '..';
import {
  createTemplateSchema,
  deleteSchema,
  readSchema,
  updateTemplateSchema,
} from '@athena/common';

const router = trpc.router({
  read: loggedInProcedure.input(readSchema).query(async ({ input, ctx }) => {
    await ctx.dao.template.readMember(ctx.user.userId, input.id);
    return ctx.dao.template.read(input.id);
  }),
  create: loggedInProcedure
    .input(createTemplateSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.dao.template.create(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateTemplateSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.dao.template.readMember(ctx.user.userId, input.id);
      return ctx.dao.template.update(ctx.user.userId, input);
    }),
  delete: loggedInProcedure.input(deleteSchema).mutation(async ({ input, ctx }) => {
    await ctx.dao.template.readMember(ctx.user.userId, input.id);
    return ctx.dao.template.delete(ctx.user.userId, input.id);
  }),
});
export default router;
