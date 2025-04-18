import { trpc, loggedInProcedure } from '..';
import {
  createNewsletterSchema,
  deleteSchema,
  readSchema,
  updateNewsletterSchema,
  NewsletterPermissions,
  NewsletterRole,
  invteNewsletterUsersSchema,
  removeNewsletterMemberSchema,
  updateNewsletterMemberSchema,
} from '@athena/common';

const router = trpc.router({
  read: loggedInProcedure.input(readSchema).query(async ({ input, ctx }) => {
    await ctx.dao.newsletter.readMember(ctx.user.userId, input.id);
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
  inviteUsers: loggedInProcedure
    .input(invteNewsletterUsersSchema)
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
      // create user if they dont already exist
      const resolvedUsers = await Promise.all(
        input.users.map(async (user) => {
          const u = await ctx.dao.user.upsert({
            email: user.email,
            firstName: null,
            lastName: null,
          });
          return { email: u.email, role: user.role };
        })
      );
      const result = ctx.dao.newsletter.inviteUsers(ctx.user.userId, {
        ...input,
        users: resolvedUsers,
      });

      resolvedUsers.map((u) =>
        ctx.notifications.sendMail({
          to: u.email,
          subject: 'Join newsletter',
          text: 'you have been invited to newsletter. visit link xxxxxx',
        })
      );

      return result;
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
