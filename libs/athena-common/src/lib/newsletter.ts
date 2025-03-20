import { z } from 'zod';
import { dateRangeInput, updateInput } from './common';

/**
 * Newsletter
 */

export const newsletterProperties = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 characters long' })
    .max(100, { message: 'Name must be at less than 100 characters long' }),
  dateRange: dateRangeInput,
});

export type NewsletterProperties = z.infer<typeof newsletterProperties>;

export const createNewsletter = z.object({
  properties: newsletterProperties,
});

export type CreateNewsletter = z.infer<typeof createNewsletter>;

export const updateNewsletter = updateInput.merge(
  z.object({
    properties: newsletterProperties.partial(),
  })
);

export type UpdateNewsletter = z.infer<typeof updateNewsletter>;

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

const newsletterRole = z.nativeEnum(NewsletterRole);
const newsletterPermissions = z.nativeEnum(NewsletterPermissions);

export const inviteNewsletterUser = z.object({
  newsletterId: z.coerce.number(),
  email: z.coerce.string(),
  role: newsletterRole,
});

export type InviteNewsletterUser = z.infer<typeof inviteNewsletterUser>;
