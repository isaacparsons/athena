import { userRouter } from './user';
import newsletterRoutes from './newsletter';
import newsletterItemRoutes from './newsletter-post';
// import newsletterItemTemplateRoutes from './newsletter-item-template';
import { trpc } from '..';

export const appRouter = trpc.router({
  users: userRouter,
  newsletters: newsletterRoutes,
  newsletterPosts: newsletterItemRoutes,
  // newsletterItemTemplates: newsletterItemTemplateRoutes,
});

export type AppRouter = typeof appRouter;

export type RouterEndpoint = keyof Omit<
  AppRouter,
  'createCaller' | 'getErrorShape' | '_def'
>;

export type RouterEndpointType<T extends RouterEndpoint = RouterEndpoint> =
  keyof Omit<AppRouter[T], 'createCaller' | 'getErrorShape' | '_def'>;

export type NewsletterRoute = RouterEndpointType<'newsletters'>;
export type NewsletterPostRoute = RouterEndpointType<'newsletterPosts'>;
export type UserRoute = RouterEndpointType<'newsletters'>;
