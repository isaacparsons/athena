import { Router } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';

const router = Router();

router.get('/me', isAuthenticated, async (req: AuthenticatedRequest, res) => {
  const user = await req.db.getUserById(req.user.userId);
  res.send({
    data: user,
  });
});

export default router;
