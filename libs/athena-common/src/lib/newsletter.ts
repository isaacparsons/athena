import { z } from 'zod';
import { dateRangeSchema, makeEntitySchemas } from './common';

export const newsletterSchema = makeEntitySchemas({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 characters long' })
    .max(100, { message: 'Name must be at less than 100 characters long' }),
  dateRange: dateRangeSchema,
});

export const createNewsletterSchema = newsletterSchema.create;
export const updateNewsletterSchema = newsletterSchema.update;

export enum NewsletterRole {
  READ_ONLY = 'read-only',
  OWNER = 'owner',
  EDITOR = 'editor',
  COMMENTOR = 'commentor',
}

export enum NewsletterPermissions {
  READ = 'read',
  WRITE = 'write',
  UPDATE = 'update',
  DELETE = 'delete',
  COMMENT = 'comment',
  SHARE = 'share',
  INVITE = 'invite',
  EDIT_MEMBER = 'edit-member',
}

export const newsletterRole = z.nativeEnum(NewsletterRole);
export const newsletterPermissions = z.nativeEnum(NewsletterPermissions);

export const inviteNewsletterUserSchema = z.object({
  email: z.coerce.string(),
  role: newsletterRole,
});
export const invteNewsletterUsersSchema = z.object({
  newsletterId: z.coerce.number(),
  users: z.array(inviteNewsletterUserSchema),
});

export const removeNewsletterMemberSchema = z.object({
  newsletterId: z.coerce.number(),
  userId: z.coerce.number(),
});

export const updateNewsletterMemberSchema = z.object({
  newsletterId: z.coerce.number(),
  userId: z.coerce.number(),
  role: newsletterRole,
});
