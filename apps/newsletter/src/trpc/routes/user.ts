import { trpc, loggedInProcedure } from '..';

export const userRouter = trpc.router({
  get: loggedInProcedure.query(({ ctx }) => {
    return ctx.dao.user.get(ctx.user.userId);
  }),
  newsletters: loggedInProcedure.query(({ ctx }) => {
    return ctx.dao.user.newsletters(ctx.user.userId);
  }),
  templates: loggedInProcedure.query(({ ctx }) => {
    return ctx.dao.template.getByUserId(ctx.user.userId);
  }),
});

export type UserRouter = typeof userRouter;
