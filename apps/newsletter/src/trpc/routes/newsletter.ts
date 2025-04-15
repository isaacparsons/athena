import { trpc, loggedInProcedure } from '..';
import {
  createNewsletterSchema,
  deleteSchema,
  readSchema,
  updateNewsletterSchema,
  NewsletterPermissions,
  NewsletterRole,
  inviteNewsletterUserSchema,
  removeNewsletterMemberSchema,
  updateNewsletterMemberSchema,
} from '@athena/common';

const router = trpc.router({
  read: loggedInProcedure.input(readSchema).query(async ({ input, ctx }) => {
    return await ctx.dao.newsletter.read(input.id);
  }),
  create: loggedInProcedure
    .input(createNewsletterSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.dao.newsletter.create(ctx.user.userId, input);
    }),
  update: loggedInProcedure
    .input(updateNewsletterSchema)
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.dao.newsletter.readMember(ctx.user.userId, input.id);
      const valid = ctx.auth.newsletter.validatePermissions(
        member.role as NewsletterRole,
        NewsletterPermissions.UPDATE
      );
      if (!valid) throw new Error('Invalid permissions');
      return await ctx.dao.newsletter.update(ctx.user.userId, input);
    }),
  delete: loggedInProcedure.input(deleteSchema).mutation(async ({ ctx, input }) => {
    const member = await ctx.dao.newsletter.readMember(ctx.user.userId, input.id);
    const valid = ctx.auth.newsletter.validatePermissions(
      member.role as NewsletterRole,
      NewsletterPermissions.DELETE
    );
    if (!valid) throw new Error('Invalid permissions');
    return await ctx.dao.newsletter.delete(ctx.user.userId, input.id);
  }),
  inviteUser: loggedInProcedure
    .input(inviteNewsletterUserSchema)
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.dao.newsletter.readMember(
        ctx.user.userId,
        input.newsletterId
      );
      const valid = ctx.auth.newsletter.validatePermissions(
        member.role as NewsletterRole,
        NewsletterPermissions.INVITE
      );
      if (!valid) throw new Error('Invalid permissions');
      return ctx.dao.newsletter.inviteUser(ctx.user.userId, input);
    }),
  removeMember: loggedInProcedure
    .input(removeNewsletterMemberSchema)
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.dao.newsletter.readMember(
        ctx.user.userId,
        input.newsletterId
      );
      const valid = ctx.auth.newsletter.validatePermissions(
        member.role as NewsletterRole,
        NewsletterPermissions.EDIT_MEMBER
      );
      if (!valid && input.userId !== ctx.user.userId)
        throw new Error('Invalid permissions');
      return ctx.dao.newsletter.removeMember(input);
    }),
  updateMember: loggedInProcedure
    .input(updateNewsletterMemberSchema)
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.dao.newsletter.readMember(
        ctx.user.userId,
        input.newsletterId
      );
      const valid = ctx.auth.newsletter.validatePermissions(
        member.role as NewsletterRole,
        NewsletterPermissions.EDIT_MEMBER
      );
      if (!valid) throw new Error('Invalid permissions');
      return ctx.dao.newsletter.updateMember(input);
    }),
});

export default router;
