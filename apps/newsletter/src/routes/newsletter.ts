import { Response, Router } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';
import multer from 'multer';
import fs from 'node:fs';
import { NewNewsletter, Newsletter } from '../db/tables/newsletter';
import { AthenaResponseBuilder } from '../util/response-format';
import { NewsletterItemType, NewsletterItem, User } from '../db/tables';
import { Storage } from '@google-cloud/storage';
import { parseEnv } from '../util/parse-env';

const env = parseEnv();

const storage = new Storage();
const bucket = storage.bucket(env.gcs.bucketName);

const upload = multer({ dest: 'photos/' });
const router = Router();

export type GetNewsletterResponse = {
  newsletter: Newsletter;
  members: User[];
  items: {
    item: NewsletterItem;
    details: NewsletterItemType;
  }[];
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

router.get('/', isAuthenticated, async (req: AuthenticatedRequest, res) => {
  const newsletters = await req.db
    .selectFrom('userNewsletter as un')
    .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
    .where('un.userId', '=', req.user.userId)
    .selectAll('n')
    .execute();

  res.send(
    new AthenaResponseBuilder<Newsletter[]>().setData(newsletters).build()
  );
});

router.post(
  '/',
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    const input: Pick<NewNewsletter, 'name'> = req.body;

    const newsletter = await req.db.transaction().execute(async (trx) => {
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
);

router.get(
  '/:newsletterId',
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
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

    const response = new AthenaResponseBuilder<GetNewsletterResponse>();
    if (!newsletter) {
      response.setError(new Error(`no newsletter found with id: ${id}`));
    } else {
      response.setData({
        newsletter,
        members,
        items: [],
      });
    }
    res.send(response.build());
  }
);

// //TODO:  implement
// router.delete(
//   '/:newsletterId',
//   isAuthenticated,
//   async (req: AuthenticatedRequest, res: Response) => {
//     //only owner should be able  to delete
//     res.send(req.params);
//   }
// );

router.post(
  '/:newsletterId/items',
  isAuthenticated,
  upload.single('photo'),
  async (req: AuthenticatedRequest, res: Response) => {
    const { newsletterId: _newsletterId } = req.params;
    const newsletterId = parseInt(_newsletterId);

    console.log(req.file);
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

    const result = await req.db.transaction().execute(async (trx) => {
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

      // create object in gcs
      const photoPath =
        '/Users/isaacparsons/Documents/projects/athena/' + file.path;

      const gcsFile = (
        await bucket.upload(photoPath, {
          destination: newsletterItemPhoto.id.toString(),
          public: true,
        })
      )[0];
      console.log(gcsFile);
      console.log(gcsFile.cloudStorageURI);
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
);

export default router;
