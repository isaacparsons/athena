"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trpc_1 = require("../trpc/trpc");
const nanoid = tslib_1.__importStar(require("nanoid"));
const logged_in_1 = require("../procedures/logged-in");
const athena_common_1 = require("@athena/athena-common");
const router = trpc_1.trpc.router({
    get: logged_in_1.loggedInProcedure
        .input(athena_common_1.getNewsletterItemInput)
        .query(({ input, ctx }) => {
        //TODO: in media items, replace filename with a signed url
        return ctx.dao.newsletterItem.get(input.newsletterItemId);
    }),
    getItemUploadLinks: logged_in_1.loggedInProcedure
        .input(athena_common_1.getItemUploadLinksInput)
        .query(({ input, ctx }) => {
        return Promise.all(input.items.map((item) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const fileName = `${ctx.user.userId}-${nanoid.nanoid()}`;
            const url = yield ctx.gcs.getSignedUrl(fileName, 'write');
            return {
                url,
                id: item.id,
                fileName,
            };
        })));
    }),
    create: logged_in_1.loggedInProcedure
        .input(athena_common_1.postNewsletterItemInput)
        .mutation(({ input, ctx }) => {
        return ctx.dao.newsletterItem.post(ctx.user.userId, input);
    }),
    update: logged_in_1.loggedInProcedure
        .input(athena_common_1.updateNewsletterItemInput)
        .mutation(({ input, ctx }) => {
        return ctx.dao.newsletterItem.update(ctx.user.userId, input);
    }),
    deleteMany: logged_in_1.loggedInProcedure
        .input(athena_common_1.deleteManyNewsletterItemsInput)
        .mutation(({ input, ctx }) => {
        // return ctx.dao.newsletterItem.delete(input.newsletterItemId);
    }),
});
exports.default = router;
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
//# sourceMappingURL=newsletter-item.js.map