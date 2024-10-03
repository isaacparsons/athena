import { userRouter } from './user';
import newsletterRoutes from './newsletter';
import newsletterItemRoutes from './newsletter-item';
import { trpc } from '../trpc/trpc';

export const appRouter = trpc.router({
  users: userRouter,
  newsletters: newsletterRoutes,
  newsletterItems: newsletterItemRoutes,
});

export type AppRouter = typeof appRouter;

export {} from './user';
export {
  CreateNewsletterInput,
  ReadNewsletterInput,
  UpdateNewsletterInput,
  DeleteNewsletterInput,
  NewsletterInput,
} from './newsletter';

export {
  CreateNewsletterItemInput,
  ReadNewsletterItemInput,
  UpdateNewsletterItemInput,
  DeleteNewsletterItemInput,
  NewsletterItemInput,
  LocationInput,
} from './newsletter-item';
