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
