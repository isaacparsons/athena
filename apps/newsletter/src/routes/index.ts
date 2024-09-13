import { Router } from 'express';
import userRoute from './user';
import newsletterRoute from './newsletter';

const router = Router({ mergeParams: true });

router.use('/newsletters', newsletterRoute);
router.use('/users', userRoute);

export default router;
