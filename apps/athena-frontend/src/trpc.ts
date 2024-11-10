import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from '@trpc/react-query';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { AppRouter } from '@athena/trpc';

const apiUrl = 'http://localhost:3000/api/v1/trpc';

export const asyncTrpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: apiUrl,
      async headers() {
        return {
          'admin-secret': '123456',
        };
      },
    }),
  ],
});

export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: apiUrl,
      async headers() {
        return {
          'admin-secret': '123456',
        };
      },
    }),
  ],
});
