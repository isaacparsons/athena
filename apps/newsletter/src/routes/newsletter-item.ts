import { trpc } from '../trpc/trpc';

const router = trpc.router({
  get: trpc.procedure.query(() => {
    return '';
  }),
  create: trpc.procedure.mutation(() => {
    return '';
  }),
  update: trpc.procedure.mutation(() => {
    return '';
  }),
  delete: trpc.procedure.mutation(() => {
    return '';
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
