import { createTRPCReact } from '@trpc/react-query';
// import type { AppRouter } from '@athena/backend';
import { AppRouter } from '@athena/backend';

export const trpc = createTRPCReact<AppRouter>();
