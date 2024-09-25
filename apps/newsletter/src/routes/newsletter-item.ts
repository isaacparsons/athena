import { Router, Response, NextFunction } from 'express';
import { isAuthenticated, AuthenticatedRequest } from '../middleware/auth';
import { AthenaResponseBuilder } from '../util/response-format';
import multer from 'multer';
import fs from 'node:fs';
import { CreateNewsletterPhotoItemResponse } from './newsletter';
import { Transaction } from 'kysely';
import { Database } from '../db/db';
import { NewsletterItemDAO } from '../db/dao/newsletter-item';
import { validateNewsletterItemPhotoUploadRequest } from '../util/validation';
import { GCSManager } from '../services/gcs';
import { UserDAO } from '../db/dao/user';
import { LocationDAO } from '../db/dao/location';
import { NewsletterItemPhotoDAO } from '../db/dao/newsletter-item-photo';

const router = Router();
const upload = multer({ dest: 'photos/' });

router.delete(
  '/:newsletterItemId',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { newsletterId, newsletterItemId } = req.params;

      try {
        await new NewsletterItemDAO(req.db, req.user.userId).delete(
          parseInt(newsletterId),
          parseInt(newsletterItemId)
        );
        res.send(new AthenaResponseBuilder().build());
      } catch (error) {
        res.send(new AthenaResponseBuilder().setError(error).build());
      }
    }
  )
);

router.post(
  '/photo',
  upload.single('photo'),
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
        const userId = req.user.userId;
        const input = validateNewsletterItemPhotoUploadRequest(req);
        const newsletter = await new UserDAO(req.db, userId).newsletter(
          input.newsletterId
        );
        if (!newsletter) {
          throw new Error(`no newsletter with id: ${input.newsletterId}`);
        }
        const result = await req.db
          .transaction()
          .execute(async (trx: Transaction<Database>) => {
            const location = await new LocationDAO(trx).post(input.location);
            const newsletterItem = await new NewsletterItemDAO(
              trx,
              userId
            ).post(input.newsletterItem);

            const newsletterItemPhoto = await new NewsletterItemPhotoDAO(
              trx
            ).post({
              newsletterItemId: newsletterItem.id,
              locationId: location.id,
              ...input.newsletterItemPhoto,
              link: '123',
            });

            // TODO: fix this so its not using my local path
            const photoPath =
              '/Users/isaacparsons/Documents/projects/athena/' +
              input.file.path;

            new GCSManager().uploadPhoto(photoPath, newsletterItemPhoto.id);

            return {
              item: newsletterItem,
              details: newsletterItemPhoto,
            };
          });

        await fs.promises.unlink(input.file.path);

        res.send(
          new AthenaResponseBuilder<CreateNewsletterPhotoItemResponse>()
            .setData(result)
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
