// import {
//   createTRPCProxyClient,
//   createTRPCReact,
//   httpBatchLink,
// } from '@trpc/react-query';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { AppRouter } from '@backend/trpc';
import { getConfig } from '@frontend/config';

const config = getConfig();
const headers = config.ADMIN_SECRET
  ? {
      'admin-secret': config.ADMIN_SECRET,
    }
  : {};

console.log(`${process.env.NODE_ENV}`);
export const asyncTrpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: config.API_URL,
      async headers() {
        return headers;
      },
      async fetch(url, options) {
        return fetch(url, {
          ...options,
          // credentials: 'include',
        });
      },
    }),
  ],
});

// export const trpc = createTRPCReact<AppRouter>();
// export const trpcClient = trpc.createClient({
//   links: [
//     httpBatchLink({
//       url: apiUrl,
//       async headers() {
//         return {
//           'admin-secret': '123456',
//         };
//       },
//     }),
//   ],
// });
