"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logged_in_1 = require("../procedures/logged-in");
const trpc_1 = require("../trpc/trpc");
const athena_common_1 = require("@athena/athena-common");
// export type NewsletterInput =
//   | CreateNewsletterInput
//   | ReadNewsletterInput
//   | UpdateNewsletterInput
//   | DeleteNewsletterInput;
const router = trpc_1.trpc.router({
    get: logged_in_1.loggedInProcedure.input(athena_common_1.getNewsletterInput).query(({ input, ctx }) => {
        return ctx.dao.newsletter.get(input.newsletterId);
    }),
    post: logged_in_1.loggedInProcedure
        .input(athena_common_1.postNewsletterInput)
        .mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.post(ctx.user.userId, input);
    }),
    update: logged_in_1.loggedInProcedure
        .input(athena_common_1.updateNewsletterInput)
        .mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.update(ctx.user.userId, input);
    }),
    delete: logged_in_1.loggedInProcedure
        .input(athena_common_1.deleteNewsletterInput)
        .mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.delete(ctx.user.userId, input.id);
    }),
});
exports.default = router;
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
//# sourceMappingURL=newsletter.js.map