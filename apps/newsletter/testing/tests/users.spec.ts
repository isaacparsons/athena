// import { inferProcedureInput } from '@trpc/server';
// import { AppRouter, appRouter as router } from '../../src/routes/index';
// import { createContext } from '../../src/trpc/context';

// describe('user routes', () => {
//   test('get', async () => {
//     // type Input = inferProcedureInput<AppRouter['users']['get']>;
//     // const input: Input = {
//     //   userId: 123,
//     // };
//     const user = await router.users.get({
//       ctx: createContext({ req: {} as any, res: {} as any }),
//       path: '',
//       rawInput: { userId: 1 },
//       type: router.users.get._type,
//     });
//     expect(user).toEqual({
//       id: 1,
//       firstName: 'SUPER',
//       lastName: 'USER',
//       email: 'isaac.2962@gmail.com',
//     });
//   });
// });
