import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from './context';

export const trpc = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();
