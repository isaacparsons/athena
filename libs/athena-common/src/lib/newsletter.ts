import { z } from 'zod';
import { createRequestSchema, dateRangeInput, updateRequestSchema } from './common';

export const newsletterProperties = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 characters long' })
    .max(100, { message: 'Name must be at less than 100 characters long' }),
  dateRange: dateRangeInput,
});

export type NewsletterProperties = z.infer<typeof newsletterProperties>;

export const newsletterBase = z.object({
  id: z.coerce.number(),
  properties: newsletterProperties,
});

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

export const createNewsletter = createRequestSchema(newsletterBase);
export type CreateNewsletter = z.infer<typeof createNewsletter>;

export const updateNewsletter = updateRequestSchema(newsletterBase);
export type UpdateNewsletter = z.infer<typeof updateNewsletter>;

export const inviteNewsletterUser = z.object({
  newsletterId: z.coerce.number(),
  email: z.coerce.string(),
  role: newsletterRole,
});

export type InviteNewsletterUser = z.infer<typeof inviteNewsletterUser>;
