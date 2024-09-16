import { Request, Response, Router } from 'express';
import { AuthenticatedRequest, isAuthenticated } from '../middleware/auth';
import { first } from 'remeda';
import multer from 'multer';
import fs from 'node:fs';

const upload = multer({ dest: 'photos/' });

const router = Router();

const BASE_NEWSLETTERS_FOLDER_NAME = 'Newsletters';

router.get('/', isAuthenticated, async (req: AuthenticatedRequest, res) => {
  const newsletters = await req.db.getNewslettersForUserId(req.user.userId);
  res.send({
    data: newsletters,
  });
});

router.post(
  '/',
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    const input = req.body;

    // if the newsletter folder does not exist, create it.
    const newslettersFolder = await req.googleDrive.files.list({
      q: `name='${BASE_NEWSLETTERS_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });

    const _files = first(newslettersFolder.data.files ?? []);
    let newslettersFolderId = _files?.id;

    if (!newslettersFolderId) {
      const createdNewslettersFolder = await req.googleDrive.files.create({
        requestBody: {
          name: BASE_NEWSLETTERS_FOLDER_NAME,
          mimeType: 'application/vnd.google-apps.folder',
        },
      });
      newslettersFolderId = createdNewslettersFolder.data.id;
      if (!newslettersFolderId) {
        throw new Error(
          `Unable to create folder: ${BASE_NEWSLETTERS_FOLDER_NAME}`
        );
      }
    }
    const folder = await req.googleDrive.files.create({
      requestBody: {
        name: input.name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: newslettersFolderId ? [newslettersFolderId] : [],
      },
    });
    const folderId = folder.data.id;
    if (!folderId) {
      throw new Error(`Unable to create folder: ${input.name}`);
    }

    const dbNewsletter = await req.db.createNewsletter({
      name: input.name,
      userId: req.user.userId,
      googleDriveFolderId: folderId,
    });
    res.send({ data: dbNewsletter });
  }
);

//TODO:  implement
router.get(
  '/:newsletterId',
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    res.send(req.params);
  }
);

//TODO:  implement
router.delete(
  '/:newsletterId',
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    //only owner should be able  to delete
    res.send(req.params);
  }
);

// fieldname: 'photo',
// originalname: 'Screenshot 2024-09-15 at 3.45.38 PM.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'photos/',
// filename: '766d1c682223fdb971282aa6d14ee1f0',
// path: 'photos/766d1c682223fdb971282aa6d14ee1f0',
// size: 330027

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

router.post(
  '/:newsletterId/items',
  isAuthenticated,
  upload.single('photo'),
  async (req: AuthenticatedRequest, res: Response) => {
    const { newsletterId: _newsletterId } = req.params;
    const newsletterId = parseInt(_newsletterId);
    const file = req.file as ImageUploadRequest;

    const newsletter = await req.db.getNewsletterById(newsletterId);
    if (!newsletter) {
      throw new Error(`no newsletter with id: ${newsletterId}`);
    }

    const photo = await req.googleDrive.files.create({
      requestBody: {
        name: file.originalname,
        parents: [newsletter.googleDriveFolderId],
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
      fields: 'id, webViewLink',
    });

    await fs.promises.unlink(file.path);

    if (!photo.data.id || !photo.data.webViewLink) {
      throw new Error('unable to upload photo');
    }

    const item = await req.db.createNewsletterPhotoItem({
      newsletterId: newsletterId,
      link: photo.data.webViewLink,
      googleDriveFileId: photo.data.id,
      name: file.originalname,
    });
    res.send({
      data: item,
    });
  }
);

export default router;
