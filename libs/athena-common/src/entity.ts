import { z } from 'zod';
import {
  newsletterPostSchema,
  updateNewsletterPostDetailsSchema,
} from './lib/newsletter-post';
import { createPostDetailsSchema } from './lib/newsletter-post';
import { locationSchema, newsletterRole, userSchema, withTempPosition } from './lib';

export const metaSchema = z.object({
  creator: userSchema,
  modifier: userSchema.nullable(),
  created: z.string(),
  modified: z.string().nullable(),
});

export const createNewsletterPostSchema = newsletterPostSchema.create
  .omit({ details: true })
  .partial({ position: true })
  .extend({
    details: createPostDetailsSchema,
    location: locationSchema.create.nullable().optional(),
  });

export const updateNewsletterPostSchema = newsletterPostSchema.update
  .omit({ details: true })
  .extend({
    details: updateNewsletterPostDetailsSchema.optional(),
    location: locationSchema.update.or(locationSchema.create).nullable().optional(),
  });

const createTempNewsletterPostSchema = createNewsletterPostSchema
  .partial({ position: true })
  .extend(withTempPosition);

export const createManyNewsletterPostsSchema = z.object({
  posts: z.array(createTempNewsletterPostSchema),
  newsletterId: z.coerce.number(),
});

export const updateManyNewsletterPostsSchema = z.array(updateNewsletterPostSchema);

export const readNewsletterMemberSchema = userSchema.extend({
  role: newsletterRole,
});
