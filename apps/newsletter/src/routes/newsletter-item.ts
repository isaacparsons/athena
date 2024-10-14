import { trpc } from '../trpc/trpc';
import * as nanoid from 'nanoid';
import { loggedInProcedure } from '../procedures/logged-in';
import {
  deleteManyNewsletterItemsInput,
  getItemUploadLinksInput,
  getNewsletterItemInput,
  postNewsletterItemInput,
  updateNewsletterItemInput,
} from '@athena/athena-common';

const router = trpc.router({
  get: loggedInProcedure
    .input(getNewsletterItemInput)
    .query(({ input, ctx }) => {
      return ctx.dao.newsletterItem.get(input.newsletterItemId);
    }),
  getItemUploadLinks: loggedInProcedure
    .input(getItemUploadLinksInput)
    .query(({ input, ctx }) => {
      return Promise.all(
        input.items.map(async (item) => {
          const fileName = `${ctx.user.userId}-${nanoid.nanoid()}`;
          const url = await ctx.gcs.getSignedUrl(fileName, 'write');
          return {
            url,
            id: item.id,
            fileName,
          };
        })
      );
    }),

  create: loggedInProcedure
    .input(postNewsletterItemInput)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterItem.post(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateNewsletterItemInput)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterItem.update(ctx.user.userId, input);
    }),
  deleteMany: loggedInProcedure
    .input(deleteManyNewsletterItemsInput)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterItem.deleteMany(input);
    }),
});
export default router;

// const upload = multer({ dest: 'media/' });

// const uploadNewsletterItemMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const detailsType = validateItemDetailsType(req.params.detailsType);
//     if (detailsType === 'text') {
//       upload.none()(req, res, next);
//     }
//     if (detailsType === 'photo' || detailsType === 'video') {
//       upload.single('file')(req, res, next);
//     }
//   } catch (error) {
//     console.error(error);
//     res.send(
//       new AthenaResponseBuilder()
//         .setError(new Error('invalid item type'))
//         .build()
//     );
//   }
// };

// router.post(
//   '/',
//   uploadNewsletterItemMiddleware,
//   isAuthenticated(
//     async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//       try {
//         const userId = req.user.userId;
//         const input = validateNewsletterItemCreateRequest(req);
//         await new NewsletterItemDAO(req.db).post(
//           userId,
//           input.location,
//           input.newsletterItem,
//           input.details
//         );
//         res.send(new AthenaResponseBuilder().build());
//       } catch (error) {
//         console.error(error);
//         res.send(new AthenaResponseBuilder().setError(error).build());
//       }
//     }
//   )
// );

// router.delete(
//   '/:newsletterItemId',
//   isAuthenticated(
//     async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//       const { newsletterId, newsletterItemId } = req.params;
//       try {
//         await new NewsletterItemDAO(req.db).delete(
//           parseInt(newsletterId),
//           parseInt(newsletterItemId)
//         );
//         res.send(new AthenaResponseBuilder().build());
//       } catch (error) {
//         console.error(error);
//         res.send(new AthenaResponseBuilder().setError(error).build());
//       }
//     }
//   )
// );
