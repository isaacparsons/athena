import { loggedInProcedure, trpc } from '../trpc/trpc';
import { z } from 'zod';
import { nanoid } from 'nanoid';

const locationInput = z
  .object({
    name: z.string().optional(),
    countryCode: z.string().optional(),
    lattitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
  })
  .optional();

const getNewsletterItemInput = z.object({
  newsletterItemId: z.coerce.number(),
});

const mediaItemDetails = z.object({
  type: z.literal('media'),
  name: z.string(),
  fileName: z.string(),
  caption: z.string().optional(),
});

const textItemDetails = z.object({
  type: z.literal('text'),
  name: z.string(),
  description: z.string().optional(),
  link: z.string().optional(),
});

const newsletterItemDetails = z
  .discriminatedUnion('type', [mediaItemDetails, textItemDetails])
  .optional();

const postNewsletterItemInput = z.object({
  newsletterId: z.coerce.number(),
  parentId: z.coerce.number().nullable(),
  nextItemId: z.coerce.number().nullable(),
  previousItemId: z.coerce.number().nullable(),
  title: z.string(),
  date: z.string().optional(),
  location: locationInput,
  details: newsletterItemDetails,
});

const updateNewsletterItemInput = z
  .object({
    newsletterItemId: z.coerce.number(),
    title: z.string().optional(),
    date: z.string().optional().nullable(),
    // parentId: z.coerce.number().optional(),
    nextItemId: z.coerce.number().optional(),
    location: locationInput,
  })
  .refine((obj) => obj.date || obj.nextItemId || obj.title || obj.location);

const deleteManyNewsletterItemsInput = z.object({
  newsletterItemIds: z.array(z.coerce.number()),
});

const getItemUploadLinksInput = z.object({
  items: z.array(z.object({ id: z.string() })),
});

export type LocationInput = z.infer<typeof locationInput>;
export type CreateNewsletterItemInput = z.infer<typeof postNewsletterItemInput>;
export type ReadNewsletterItemInput = z.infer<typeof getNewsletterItemInput>;
export type UpdateNewsletterItemInput = z.infer<
  typeof updateNewsletterItemInput
>;
export type DeleteManyNewsletterItemsInput = z.infer<
  typeof deleteManyNewsletterItemsInput
>;

export type CreateNewsletterItemDetailsInput = z.infer<
  typeof newsletterItemDetails
>;

export type NewsletterItemInput =
  | CreateNewsletterItemInput
  | ReadNewsletterItemInput
  | UpdateNewsletterItemInput
  | DeleteManyNewsletterItemsInput;

const router = trpc.router({
  get: loggedInProcedure
    .input(getNewsletterItemInput)
    .query(({ input, ctx }) => {
      //TODO: in media items, replace filename with a signed url.
      return ctx.dao.newsletterItem.get(input.newsletterItemId);
    }),
  getItemUploadLinks: loggedInProcedure
    .input(getItemUploadLinksInput)
    .query(({ input, ctx }) => {
      return Promise.all(
        input.items.map(async (item) => {
          const fileName = `${ctx.user.userId}-${nanoid()}`;
          const url = await ctx.gcs.getSignedUrl(fileName, 'write');
          return {
            url,
            id: item.id,
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
      // return ctx.dao.newsletterItem.delete(input.newsletterItemId);
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
