// import { trpc, loggedInProcedure } from '..';
// import { createNewsletterPostTemplate, getInput } from '@athena/common';

// const router = trpc.router({
//   get: loggedInProcedure.input(getInput).query(({ input, ctx }) => {
//     return ctx.dao.newsletterItemTemplate.get(input.id);
//   }),
//   create: loggedInProcedure
//     .input(createNewsletterPostTemplate)
//     .mutation(({ input, ctx }) => {
//       return ctx.dao.newsletterItemTemplate.post(ctx.user.userId, input);
//     }),
//   // update: loggedInProcedure
//   //   .input(updateNewsletterPostInput)
//   //   .mutation(({ input, ctx }) => {
//   //     return ctx.dao.newsletterItem.update(ctx.user.userId, input);
//   //   }),
//   // deleteMany: loggedInProcedure
//   //   .input(deleteManyNewsletterPostsInput)
//   //   .mutation(({ input, ctx }) => {
//   //     return ctx.dao.newsletterItem.deleteMany(input);
//   //   }),
// });
// export default router;
