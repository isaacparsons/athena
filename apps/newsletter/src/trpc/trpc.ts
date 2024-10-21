import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from './context';

export const trpc = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create({
    errorFormatter(opts) {
      const { shape, error } = opts;
      console.log(error);
      return shape;
    },
  });

export const publicProcedure = trpc.procedure;
