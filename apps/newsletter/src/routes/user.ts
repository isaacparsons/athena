import { Router } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';
import { formatResponseSuccess } from '../util/response-format';

const router = Router();

router.get('/me', isAuthenticated, async (req: AuthenticatedRequest, res) => {
  const user = await req.db
    .selectFrom('user')
    .where('id', '=', req.user.userId)
    .selectAll()
    .executeTakeFirst();

  res.send(formatResponseSuccess(user));
});

export default router;
