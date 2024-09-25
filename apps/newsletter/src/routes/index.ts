import { Router } from 'express';
import userRoutes from './user';
import newsletterRoutes from './newsletter';
import newsletterItemRoutes from './newsletter-item';
import newsletterItemPhotoRoutes from './newsletter-item-photo';
import newsletterItemTextRoutes from './newsletter-item-text';
import authRoutes from './auth';

const router = Router({ mergeParams: true });

router.use('/newsletters', newsletterRoutes);
router.use('/:newsletterId/items', newsletterItemRoutes);
router.use('/:newsletterId/items/photo', newsletterItemPhotoRoutes);
router.use('/:newsletterId/items/text', newsletterItemTextRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
