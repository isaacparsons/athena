import { userRouter } from './user';
import newsletterRoutes from './newsletter';
import newsletterItemRoutes from './newsletter-item';
import newsletterItemTemplateRoutes from './newsletter-item-template';
import { trpc } from '..';

export * from './user';
export * from './newsletter';
export * from './newsletter-item';
export * from './newsletter-item-template';
export * from './auth';

export const appRouter = trpc.router({
  users: userRouter,
  newsletters: newsletterRoutes,
  newsletterItems: newsletterItemRoutes,
  newsletterItemTemplates: newsletterItemTemplateRoutes,
});

export type AppRouter = typeof appRouter;

export * from './newsletter';
