import { trpc, loggedInProcedure } from '..';

export const userRouter = trpc.router({
  read: loggedInProcedure.query(({ ctx }) => {
    return ctx.dao.user.read(ctx.user.userId);
  }),
  newsletters: loggedInProcedure.query(({ ctx }) => {
    return ctx.dao.user.newsletters(ctx.user.userId);
  }),
  templates: loggedInProcedure.query(({ ctx }) => {
    return ctx.dao.template.readByUserId(ctx.user.userId);
  }),
});

export type UserRouter = typeof userRouter;
