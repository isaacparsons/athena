import { Router, Response, NextFunction } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';
import {
  formatResponseError,
  formatResponseSuccess,
} from '../util/response-format';
import { trpc } from '../trpc/trpc';
import { z } from 'zod';

const getUserInput = trpc.procedure.input(
  z.object({ userId: z.coerce.number() })
);

export const userRouter = trpc.router({
  get: getUserInput.query(({ ctx, input }) => {
    return ctx.dao.user.get(input.userId);
  }),
});

// router.get(
//   '/',
//   isAuthenticated(
//     async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//       try {
//         const user = await req.db
//           .selectFrom('user')
//           .where('id', '=', req.user.userId)
//           .selectAll()
//           .executeTakeFirst();

//         if (!user) res.send(formatResponseError(new Error('Not logged in')));
//         res.send(formatResponseSuccess(user));
//       } catch (error) {
//         console.error(error);
//         res.send(formatResponseError(error));
//       }
//     }
//   )
// );

// TODO: fix this?
// router.get(
//   '/:userId',
//   isAuthenticated(
//     async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//       const { userId } = req.params;
//       const id = parseInt(userId);
//       const user = await req.db
//         .selectFrom('user')
//         .where('id', '=', id)
//         .selectAll()
//         .executeTakeFirst();

//       res.send(formatResponseSuccess(user));
//     }
//   )
// );

export type UserRouter = typeof userRouter;
