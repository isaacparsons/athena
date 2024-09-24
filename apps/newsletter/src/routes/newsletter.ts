import { NextFunction, Response, Router } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';
import multer from 'multer';
import fs from 'node:fs';
import { NewNewsletter, Newsletter } from '../db/tables/newsletter';
import { AthenaResponseBuilder } from '../util/response-format';
import { NewsletterItemType, NewsletterItem } from '../db/tables';
import { Storage } from '@google-cloud/storage';
import { parseEnv } from '../util/parse-env';
import { Kysely, Transaction } from 'kysely';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { Database } from '../db/db';
import { ReadNewsletter, ReadNewsletterItem } from '../api';
import { nullify } from '../util/helpers';

const env = parseEnv();

const storage = new Storage({
  keyFilename:
    '/Users/isaacparsons/Documents/projects/athena/apps/newsletter/athena-435518-246fc2bb15a8.json',
});
const bucket = storage.bucket(env.gcs.bucketName);

const upload = multer({ dest: 'photos/' });
const router = Router();

// export type Item = NewsletterItem &
//   Omit<NewsletterItemType, 'id' | 'newsletterItemId'> & {
//     newsletterItemTypeId: number;
//   };

// export type GetNewsletterResponse = {
//   newsletter: Newsletter;
//   members: User[];
//   items: Item[];
// };

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
              created: new Date().toISOString(),
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
      const response = new AthenaResponseBuilder<ReadNewsletter>();
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

// type NewsletterItemPhotoWithLocation = Omit<
//   NewsletterItemPhoto,
//   'newsletterItemId' | 'locationId'
// > & {
//   location: Location | null;
// };

// type NewsletterItemWithDetails = NewsletterItem & {
//   details: NewsletterItemPhotoWithLocation;
// };

const getPhotoItems = async (
  db: Kysely<Database>,
  newsletterId: number
): Promise<ReadNewsletterItem[]> => {
  const items = await db
    .selectFrom('newsletterItem as ni')
    .select((eb) => [
      'id',
      'newsletterId',
      'title',
      'created',
      'modified',
      'creatorId',
      'modifierId',
      jsonObjectFrom(
        eb
          .selectFrom('newsletterItemPhoto as nip')
          .select((eb2) => [
            'nip.id',
            'nip.link',
            'nip.name',
            'nip.name',
            'nip.caption',
            'nip.format',
            'nip.size',
            jsonObjectFrom(
              eb2
                .selectFrom('location as l')
                .select([
                  'l.id',
                  'l.name',
                  'l.countryCode',
                  'l.longitude',
                  'l.lattitude',
                ])
                .whereRef('nip.locationId', '=', 'l.id')
            ).as('location'),
          ])
          .whereRef('nip.newsletterItemId', '=', 'ni.id')
      ).as('details'),
    ])
    .where('ni.newsletterId', '=', newsletterId)
    .execute();

  const filteredItems = items.filter(
    (item): item is ReadNewsletterItem =>
      item.details !== null && item.details !== undefined
  );

  return Promise.all(
    filteredItems.map(async (item) => {
      let link = item.details?.link;
      if (item.details?.id) {
        const [url] = await storage
          .bucket(env.gcs.bucketName)
          .file(item.details.id.toString())
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
          });
        link = url;
      }

      return {
        ...item,
        details: {
          ...item.details,
          link,
        },
      };
    })
  );
  // const items = await db
  //   .selectFrom('newsletterItem as ni')
  //   .innerJoin('newsletterItemPhoto as nip', 'ni.id', 'nip.newsletterItemId')
  //   .where('ni.newsletterId', '=', newsletterId)
  //   .select([
  //     'ni.id',
  //     'ni.title',
  //     'ni.created',
  //     'ni.modified',
  //     'nip.id as newsletterItemTypeId',
  //     'nip.link',
  //     'nip.name',
  //     'nip.caption',
  //     'nip.locationId',
  //     'nip.format',
  //     'nip.size',
  //   ])
  //   .execute();

  // return Promise.all(
  //   items.map(async (item) => {
  //     const [url] = await storage
  //       .bucket(env.gcs.bucketName)
  //       .file(item.newsletterItemTypeId.toString())
  //       .getSignedUrl({
  //         version: 'v4',
  //         action: 'read',
  //         expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  //       });
  //     return {
  //       ...item,
  //       link: url,
  //     };
  //   })
  // );
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

      const name = req.body.name ? req.body.name : null;
      const date = req.body.date ? req.body.date : null;
      const title = req.body.title ? req.body.title : null;
      const caption = req.body.caption ? req.body.caption : null;
      const format = req.body.format ? req.body.format : null;
      const size = req.body.size ? parseInt(req.body.size) : null;
      const locationName = req.body.locationName ? req.body.locationName : null;
      const countryCode = req.body.countryCode ? req.body.countryCode : null;
      const longitude = req.body.longitude
        ? parseFloat(req.body.longitude)
        : null;
      const lattitude = req.body.lattitude
        ? parseFloat(req.body.lattitude)
        : null;

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

      try {
        const result = await req.db
          .transaction()
          .execute(async (trx: Transaction<Database>) => {
            const location = await trx
              .insertInto('location')
              .values({
                countryCode: countryCode,
                name: locationName,
                longitude: longitude,
                lattitude: lattitude,
              })
              .returningAll()
              .executeTakeFirstOrThrow();

            const newsletterItem = await trx
              .insertInto('newsletterItem')
              .values({
                newsletterId,
                title: title,
                date: date,
                created: new Date().toISOString(),
                creatorId: req.user.userId,
              })
              .returningAll()
              .executeTakeFirstOrThrow();

            const newsletterItemPhoto = await trx
              .insertInto('newsletterItemPhoto')
              .values({
                newsletterItemId: newsletterItem.id,
                link: '123',
                caption: caption,
                name: name,
                size: size,
                format: format,
                locationId: location.id,
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
      } catch (error) {
        console.log(error);
      }
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
