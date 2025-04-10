// import {
//   createTRPCProxyClient,
//   createTRPCReact,
//   httpBatchLink,
// } from '@trpc/react-query';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { AppRouter } from '@backend/trpc';
const apiUrl = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/trpc`;
const adminSecret = `${process.env.REACT_APP_ADMIN_SECRET}`;

const headers = adminSecret
  ? {
      'admin-secret': adminSecret,
    }
  : {};

export const asyncTrpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: apiUrl,
      async headers() {
        return headers;
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
