import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { createContext } from './context';

export const trpc = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

const publicProcedure = trpc.procedure;

export const loggedInProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  if (!ctx.req.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: {
      user: ctx.req.user,
    },
  });
});
