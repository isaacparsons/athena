import { userRouter } from './user';
import newsletterRoutes from './newsletter';
import newsletterItemRoutes from './newsletter-post';
import templateRoutes from './template';
import { trpc } from '..';

export const routes = {
  users: userRouter,
  newsletters: newsletterRoutes,
  newsletterPosts: newsletterItemRoutes,
  templates: templateRoutes,
};

export const appRouter = trpc.router(routes);

export type AppRouter = typeof appRouter;

export type RouterEndpoint = keyof Omit<
  AppRouter,
  'createCaller' | 'getErrorShape' | '_def'
>;

export type RouterEndpointType<T extends RouterEndpoint = RouterEndpoint> =
  keyof Omit<AppRouter[T], 'createCaller' | 'getErrorShape' | '_def'>;
