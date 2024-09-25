import { NextFunction, Response, Router } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';
import { NewNewsletter, Newsletter } from '../db/tables/newsletter';
import { AthenaResponseBuilder } from '../util/response-format';
import { NewsletterItemType, NewsletterItem } from '../db/tables';
import { ReadNewsletter } from '../api';
import { GCSManager } from '../services/gcs';
import _ from 'lodash';
import { NewsletterDAO } from '../db/dao/newsletter';

const router = Router();

export type CreateNewsletterPhotoItemResponse = {
  item: NewsletterItem;
  details: NewsletterItemType;
};

export type CreateNewsletterInput = Pick<
  NewNewsletter,
  'name' | 'startDate' | 'endDate'
>;

router.get(
  '/',
  isAuthenticated(
    async (req: AuthenticatedRequest, res, next: NextFunction) => {
      try {
        const newsletters = await new NewsletterDAO(
          req.db,
          req.user.userId
        ).get();
        res.send(
          new AthenaResponseBuilder<Newsletter[]>().setData(newsletters).build()
        );
      } catch (error) {
        res.send(new AthenaResponseBuilder().setError(error));
      }
    }
  )
);

router.post(
  '/',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const input: CreateNewsletterInput = req.body;

      try {
        const newsletter = await new NewsletterDAO(
          req.db,
          req.user.userId
        ).create(input);
        res.send(
          new AthenaResponseBuilder<Newsletter>().setData(newsletter).build()
        );
      } catch (error) {
        res.send(new AthenaResponseBuilder().setError(error));
      }
    }
  )
);

router.get(
  '/:newsletterId',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { newsletterId } = req.params;
      const id = parseInt(newsletterId);

      try {
        const gcsManager = new GCSManager();
        const newsletter = await new NewsletterDAO(
          req.db,
          req.user.userId
        ).getById(id);

        const itemsWithSignedUrls = await Promise.all(
          newsletter.items.map(async (item) => {
            const url = await gcsManager.getSignedUrl(item.id.toString());
            return _.set(item, ['details', 'url'], url);
          })
        );

        res.send(
          new AthenaResponseBuilder<ReadNewsletter>()
            .setData({
              ...newsletter,
              items: itemsWithSignedUrls,
            })
            .build()
        );
      } catch (error) {
        res.send(new AthenaResponseBuilder().setError(error));
      }
    }
  )
);

router.delete(
  '/:newsletterId',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { newsletterId } = req.params;
      const id = parseInt(newsletterId);

      try {
        await new NewsletterDAO(req.db, req.user.userId).delete(id);
        res.send(new AthenaResponseBuilder().build());
      } catch (error) {
        res.send(new AthenaResponseBuilder().setError(error));
      }

      res.send(new AthenaResponseBuilder().build());
    }
  )
);

export default router;
