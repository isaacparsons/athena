import { loggedInProcedure, trpc } from '../trpc/trpc';
import { z } from 'zod';

const getNewsletterInput = z.object({
  newsletterId: z.coerce.number(),
});

const postNewsletterInput = z.object({
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

const updateNewsletterInput = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

const deleteNewsletterInput = z.object({ id: z.coerce.number() });

export type CreateNewsletterInput = z.infer<typeof postNewsletterInput>;
export type ReadNewsletterInput = z.infer<typeof getNewsletterInput>;
export type UpdateNewsletterInput = z.infer<typeof updateNewsletterInput>;
export type DeleteNewsletterInput = z.infer<typeof deleteNewsletterInput>;

export type NewsletterInput =
  | CreateNewsletterInput
  | ReadNewsletterInput
  | UpdateNewsletterInput
  | DeleteNewsletterInput;

const router = trpc.router({
  get: loggedInProcedure.input(getNewsletterInput).query(({ input, ctx }) => {
    return ctx.dao.newsletter.get(input.newsletterId);
  }),
  post: loggedInProcedure
    .input(postNewsletterInput)
    .mutation(({ ctx, input }) => {
      return ctx.dao.newsletter.post(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateNewsletterInput)
    .mutation(({ ctx, input }) => {
      return ctx.dao.newsletter.update(ctx.user.userId, input);
    }),
  delete: loggedInProcedure
    .input(deleteNewsletterInput)
    .mutation(({ ctx, input }) => {
      return ctx.dao.newsletter.delete(ctx.user.userId, input.id);
    }),
});

export default router;

// router.use('/:newsletterId/items/:detailsType', newsletterItemRoutes);

// router.get(
//   '/',
//   isAuthenticated(
//     async (req: AuthenticatedRequest, res, next: NextFunction) => {
//       try {
//         const newsletters = await new NewsletterDAO(
//           req.db,
//           req.user.userId
//         ).get();
//         res.send(
//           new AthenaResponseBuilder<Newsletter[]>().setData(newsletters).build()
//         );
//       } catch (error) {
//         console.error(error);
//         res.send(new AthenaResponseBuilder().setError(error));
//       }
//     }
//   )
// );

// router.post(
//   '/',
//   isAuthenticated(
//     async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//       const input: CreateNewsletterInput = req.body;

//       try {
//         await new NewsletterDAO(req.db, req.user.userId).post(input);
//         res.send(new AthenaResponseBuilder().build());
//       } catch (error) {
//         console.error(error);
//         res.send(new AthenaResponseBuilder().setError(error));
//       }
//     }
//   )
// );

// router.get(
//   '/:newsletterId',
//   isAuthenticated(
//     async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//       const { newsletterId } = req.params;
//       const id = parseInt(newsletterId);

//       try {
//         const newsletter = await new NewsletterDAO(
//           req.db,
//           req.user.userId
//         ).getById(id);

//         res.send(
//           new AthenaResponseBuilder<ReadNewsletter>()
//             .setData(newsletter)
//             .build()
//         );
//       } catch (error) {
//         console.error(error);
//         res.send(new AthenaResponseBuilder().setError(error));
//       }
//     }
//   )
// );

// router.delete(
//   '/:newsletterId',
//   isAuthenticated(
//     async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//       try {
//         const { newsletterId } = req.params;
//         const id = parseInt(newsletterId);
//         await new NewsletterDAO(req.db, req.user.userId).delete(id);
//         res.send(new AthenaResponseBuilder().build());
//       } catch (error) {
//         console.error(error);
//         res.send(new AthenaResponseBuilder().setError(error));
//       }
//     }
//   )
// );
