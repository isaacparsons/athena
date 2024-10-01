import { userRouter } from './user';
import newsletterRoutes from './newsletter';
// import authRoutes from './auth';
import { trpc } from '../trpc/trpc';

export const appRouter = trpc.router({
  users: userRouter,
  newsletters: newsletterRoutes,
});

export type AppRouter = typeof appRouter;
