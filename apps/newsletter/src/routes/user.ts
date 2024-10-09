import { trpc } from '../trpc/trpc';
import { z } from 'zod';
import { loggedInProcedure } from '../procedures/logged-in';

export const userRouter = trpc.router({
  get: loggedInProcedure.query(({ ctx }) => {
    return ctx.dao.user.get(ctx.user.userId);
  }),
  newsletters: loggedInProcedure.query(({ ctx }) => {
    return ctx.dao.user.newsletters(ctx.user.userId);
  }),
});

export type UserRouter = typeof userRouter;
