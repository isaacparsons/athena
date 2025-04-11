import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter, createContext } from '../trpc';

export const trpcMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
  onError(opts) {
    const { error, type, path, input, ctx, req } = opts;
    console.error('Error:', error);
    // if (error.code === 'INTERNAL_SERVER_ERROR') {
    // }
  },
});
