import { Router, Response, NextFunction } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';
import {
  formatResponseError,
  formatResponseSuccess,
} from '../util/response-format';

const router = Router();

router.get(
  '/',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const user = await req.db
        .selectFrom('user')
        .where('id', '=', req.user.userId)
        .selectAll()
        .executeTakeFirst();

      if (!user) res.send(formatResponseError(new Error('Not logged in')));
      res.send(formatResponseSuccess(user));
    }
  )
);

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

export default router;
