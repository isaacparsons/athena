import { Router, Response, NextFunction } from 'express';
import { isAuthenticated, AuthenticatedRequest } from '../middleware/auth';
import { AthenaResponseBuilder } from '../util/response-format';
import { CreateNewsletterPhotoItemResponse } from './newsletter';

import { NewsletterItemTextDAO } from '../db/dao/newsletter-item-text';

const router = Router();

router.post(
  '/text',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
        res.send(
          new AthenaResponseBuilder<CreateNewsletterPhotoItemResponse>()
            // .setData(result)
            .build()
        );
      } catch (error) {
        res.send(
          new AthenaResponseBuilder<CreateNewsletterPhotoItemResponse>()
            .setError(error)
            .build()
        );
      }
    }
  )
);

export default router;
