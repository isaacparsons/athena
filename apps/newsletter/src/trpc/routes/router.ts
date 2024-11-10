import { userRouter } from './user';
import newsletterRoutes from './newsletter';
import newsletterItemRoutes from './newsletter-item';
import newsletterItemTemplateRoutes from './newsletter-item-template';
import { trpc } from '..';

export const appRouter = trpc.router({
  users: userRouter,
  newsletters: newsletterRoutes,
  newsletterItems: newsletterItemRoutes,
  newsletterItemTemplates: newsletterItemTemplateRoutes,
});

export type AppRouter = typeof appRouter;
