import { TRPCError } from '@trpc/server';
import { loggedInProcedure, trpc } from '../trpc/trpc';
import { z } from 'zod';

const ItemTypeEnum = z.enum(['text', 'photo', 'video', 'data-point', 'node']);

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

const postNewsletterItemInput = z.object({
  newsletterId: z.coerce.number(),
  title: z.string(),
  type: ItemTypeEnum,
  parentId: z.coerce.number().nullable(),
  nextItemId: z.coerce.number().optional(),
  date: z.string().optional(),
  location: locationInput,
});

const postManyNewsletterItemsInput = z
  .array(
    z.object({
      item: z.object({
        newsletterId: z.coerce.number(),
        title: z.string(),
        type: ItemTypeEnum,
        parentId: z.coerce.number().optional(),
        nextItemId: z.coerce.number().optional(),
        date: z.string().optional(),
        location: locationInput,
      }),
      position: z.number(),
    })
  )
  .transform((val) => val.sort((a, b) => b.position - a.position));

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

const deleteNewsletterItemInput = z.object({
  newsletterItemId: z.coerce.number(),
});
export type LocationInput = z.infer<typeof locationInput>;
export type CreateNewsletterItemInput = z.infer<typeof postNewsletterItemInput>;
export type CreateManyNewsletterItemsInput = z.infer<
  typeof postManyNewsletterItemsInput
>;
export type ReadNewsletterItemInput = z.infer<typeof getNewsletterItemInput>;
export type UpdateNewsletterItemInput = z.infer<
  typeof updateNewsletterItemInput
>;
export type DeleteNewsletterItemInput = z.infer<
  typeof deleteNewsletterItemInput
>;

export type NewsletterItemInput =
  | CreateNewsletterItemInput
  | CreateManyNewsletterItemsInput
  | ReadNewsletterItemInput
  | UpdateNewsletterItemInput
  | DeleteNewsletterItemInput;

const router = trpc.router({
  get: loggedInProcedure
    .input(getNewsletterItemInput)
    .query(({ input, ctx }) => {
      return ctx.dao.newsletterItem.get(input.newsletterItemId);
    }),
  create: loggedInProcedure
    .input(postNewsletterItemInput)
    .mutation(({ input, ctx }) => {
      try {
        return ctx.dao.newsletterItem.post(ctx.user.userId, input);
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          cause: error,
        });
      }
    }),
  createMany: loggedInProcedure
    .input(postManyNewsletterItemsInput)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterItem.postMany(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateNewsletterItemInput)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterItem.update(ctx.user.userId, input);
    }),
  delete: loggedInProcedure
    .input(deleteNewsletterItemInput)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterItem.delete(input.newsletterItemId);
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
