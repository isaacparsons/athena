import { NextFunction, Response, Router } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';
import multer from 'multer';
import fs from 'node:fs';
import { NewNewsletter, Newsletter } from '../db/tables/newsletter';
import { AthenaResponseBuilder } from '../util/response-format';
import { NewsletterItemType, NewsletterItem, User } from '../db/tables';
import { Storage } from '@google-cloud/storage';
import { parseEnv } from '../util/parse-env';
import { Kysely, Transaction } from 'kysely';
import { Database } from '../db/db';

const env = parseEnv();

const storage = new Storage({
  keyFilename:
    '/Users/isaacparsons/Documents/projects/athena/apps/newsletter/athena-435518-246fc2bb15a8.json',
});
const bucket = storage.bucket(env.gcs.bucketName);

const upload = multer({ dest: 'photos/' });
const router = Router();

export type Item = NewsletterItem &
  Omit<NewsletterItemType, 'id' | 'newsletterItemId'> & {
    newsletterItemTypeId: number;
  };

export type GetNewsletterResponse = {
  newsletter: Newsletter;
  members: User[];
  items: Item[];
};

interface ImageUploadRequest {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export type CreateNewsletterPhotoItemResponse = {
  item: NewsletterItem;
  details: NewsletterItemType;
};

router.get(
  '/',
  isAuthenticated(
    async (req: AuthenticatedRequest, res, next: NextFunction) => {
      const newsletters = await req.db
        .selectFrom('userNewsletter as un')
        .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
        .where('un.userId', '=', req.user.userId)
        .selectAll('n')
        .execute();

      res.send(
        new AthenaResponseBuilder<Newsletter[]>().setData(newsletters).build()
      );
    }
  )
);

router.post(
  '/',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const input: Pick<NewNewsletter, 'name'> = req.body;

      const newsletter = await req.db
        .transaction()
        .execute(async (trx: Transaction<Database>) => {
          const newsletter = await trx
            .insertInto('newsletter')
            .values({
              ...input,
              ownerId: req.user.userId,
            })
            .returningAll()
            .executeTakeFirstOrThrow();

          await trx
            .insertInto('userNewsletter')
            .values({
              userId: req.user.userId,
              newsletterId: newsletter.id,
            })
            .executeTakeFirstOrThrow();

          return newsletter;
        });

      res.send(
        new AthenaResponseBuilder<Newsletter>().setData(newsletter).build()
      );
    }
  )
);

router.get(
  '/:newsletterId',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { newsletterId } = req.params;
      const id = parseInt(newsletterId);
      const newsletter = await req.db
        .selectFrom('userNewsletter as un')
        .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
        .where('un.userId', '=', req.user.userId)
        .where('un.newsletterId', '=', id)
        .selectAll('n')
        .executeTakeFirst();

      const members = await req.db
        .selectFrom('userNewsletter as un')
        .innerJoin('user as u', 'u.id', 'un.userId')
        .where('un.newsletterId', '=', id)
        .selectAll('u')
        .execute();

      const items = await getPhotoItems(req.db, id);
      const response = new AthenaResponseBuilder<GetNewsletterResponse>();
      if (!newsletter) {
        response.setError(new Error(`no newsletter found with id: ${id}`));
      } else {
        response.setData({
          newsletter,
          members,
          items: items,
        });
      }
      res.send(response.build());
    }
  )
);

const getPhotoItems = async (
  db: Kysely<Database>,
  newsletterId: number
): Promise<Item[]> => {
  const items = await db
    .selectFrom('newsletterItem as ni')
    .innerJoin('newsletterItemPhoto as nip', 'ni.id', 'nip.newsletterItemId')
    .where('ni.newsletterId', '=', newsletterId)
    .select([
      'ni.id',
      'ni.newsletterId',
      'ni.title',
      'ni.created',
      'ni.modified',
      'nip.id as newsletterItemTypeId',
      'nip.link',
      'nip.name',
      'nip.caption',
      'nip.locationId',
      'nip.format',
      'nip.size',
    ])
    .execute();

  return Promise.all(
    items.map(async (item) => {
      const [url] = await storage
        .bucket(env.gcs.bucketName)
        .file(item.newsletterItemTypeId.toString())
        .getSignedUrl({
          version: 'v4',
          action: 'read',
          expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        });
      return {
        ...item,
        link: url,
      };
    })
  );
};

router.delete(
  '/:newsletterId',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { newsletterId } = req.params;
      const newsletter = await req.db
        .selectFrom('newsletter')
        .where('id', '=', parseInt(newsletterId))
        .selectAll()
        .executeTakeFirstOrThrow(
          () => new Error(`newsletter with id: ${newsletterId} does not exist`)
        );

      if (newsletter.ownerId == req.user.userId) {
        throw new Error(`Only an owner can delete a newsletter`);
      }

      await req.db
        .deleteFrom('newsletter')
        .where('id', '=', parseInt(newsletterId))
        .where('ownerId', '=', req.user.userId)
        .execute();

      res.send(new AthenaResponseBuilder().build());
    }
  )
);

router.post(
  '/:newsletterId/items/photo',
  upload.single('photo'),
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { newsletterId: _newsletterId } = req.params;
      const newsletterId = parseInt(_newsletterId);

      if (!req.file) {
        res.send(
          new AthenaResponseBuilder<CreateNewsletterPhotoItemResponse>()
            .setError(new Error('a file must be include'))
            .build()
        );
      }
      const file = req.file as ImageUploadRequest;

      const newsletter = await req.db
        .selectFrom('userNewsletter as un')
        .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
        .where('un.userId', '=', req.user.userId)
        .where('un.newsletterId', '=', newsletterId)
        .selectAll('n')
        .executeTakeFirst();

      if (!newsletter) {
        throw new Error(`no newsletter with id: ${newsletterId}`);
      }

      const result = await req.db
        .transaction()
        .execute(async (trx: Transaction<Database>) => {
          const newsletterItem = await trx
            .insertInto('newsletterItem')
            .values({
              newsletterId,
              title: file.originalname,
            })
            .returningAll()
            .executeTakeFirstOrThrow();

          const newsletterItemPhoto = await trx
            .insertInto('newsletterItemPhoto')
            .values({
              newsletterItemId: newsletterItem.id,
              link: '123',
              name: file.originalname,
            })
            .returningAll()
            .executeTakeFirstOrThrow();

          // TODO: fix this so its not using my local path
          const photoPath =
            '/Users/isaacparsons/Documents/projects/athena/' + file.path;

          try {
            const gcsFile = (
              await bucket.upload(photoPath, {
                destination: newsletterItemPhoto.id.toString(),
              })
            )[0];
            console.log(gcsFile);
            console.log(gcsFile.cloudStorageURI);
          } catch (error) {
            console.log(error);
            throw error;
          }

          return {
            item: newsletterItem,
            details: newsletterItemPhoto,
          };
        });

      await fs.promises.unlink(file.path);

      res.send(
        new AthenaResponseBuilder<CreateNewsletterPhotoItemResponse>()
          .setData(result)
          .build()
      );
    }
  )
);

router.delete(
  '/:newsletterId/items/:newsletterItemId',
  isAuthenticated(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { newsletterId, newsletterItemId } = req.params;
      // check if user is a member of the newsletter
      await req.db
        .selectFrom('userNewsletter as un')
        .innerJoin('user as u', 'u.id', 'un.userId')
        .where('un.newsletterId', '=', parseInt(newsletterId))
        .selectAll()
        .executeTakeFirstOrThrow(
          () =>
            new Error(`must be a member of the newsletter to delete an item`)
        );

      await req.db
        .deleteFrom('newsletterItem')
        .where('id', '=', parseInt(newsletterItemId))
        .execute();

      res.send(new AthenaResponseBuilder().build());
    }
  )
);

export default router;
