import { Router } from 'express';
import userRoutes from './user';
import newsletterRoutes from './newsletter';
import authRoutes from './auth';

const router = Router({ mergeParams: true });

router.use('/newsletters', newsletterRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
