import { trpc } from '../trpc/trpc';
import { loggedInProcedure } from '../procedures/logged-in';
import {
  getNewsletterItemTemplateInput,
  postNewsletterItemTemplateInput,
} from '@athena/athena-common';

const router = trpc.router({
  get: loggedInProcedure
    .input(getNewsletterItemTemplateInput)
    .query(({ input, ctx }) => {
      return ctx.dao.newsletterItemTemplate.get(input.id);
    }),
  create: loggedInProcedure
    .input(postNewsletterItemTemplateInput)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterItemTemplate.post(ctx.user.userId, input);
    }),
  // update: loggedInProcedure
  //   .input(updateNewsletterItemInput)
  //   .mutation(({ input, ctx }) => {
  //     return ctx.dao.newsletterItem.update(ctx.user.userId, input);
  //   }),
  // deleteMany: loggedInProcedure
  //   .input(deleteManyNewsletterItemsInput)
  //   .mutation(({ input, ctx }) => {
  //     return ctx.dao.newsletterItem.deleteMany(input);
  //   }),
});
export default router;
