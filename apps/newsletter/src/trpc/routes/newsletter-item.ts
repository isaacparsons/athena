import { trpc, loggedInProcedure } from '..';
import * as nanoid from 'nanoid';
import {
  deleteManyNewsletterItemsInput,
  getItemUploadLinksInput,
  getNewsletterItemInput,
  postNewsletterItemBatchInput,
  postNewsletterItemInput,
  updateNewsletterItemInput,
} from '@athena/athena-common';

const router = trpc.router({
  get: loggedInProcedure.input(getNewsletterItemInput).query(({ input, ctx }) => {
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

  create: loggedInProcedure.input(postNewsletterItemInput).mutation(({ input, ctx }) => {
    return ctx.dao.newsletterItem.post(ctx.user.userId, input);
  }),
  createBatch: loggedInProcedure
    .input(postNewsletterItemBatchInput)
    .mutation(({ input, ctx }) => {
      return ctx.dao.newsletterItem.postBatch(ctx.user.userId, input);
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
