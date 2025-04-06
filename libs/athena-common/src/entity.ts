import { z } from 'zod';
import {
  newsletterPostSchema,
  updateNewsletterPostDetailsSchema,
} from './lib/newsletter-post';
import { createPostDetailsSchema } from './lib/newsletter-post';
import { locationSchema, withTempPosition } from './lib';

export const createNewsletterPostSchema = newsletterPostSchema.create
  .omit({ details: true })
  .extend({
    details: createPostDetailsSchema,
    location: locationSchema.create.optional(),
  });

export const updateNewsletterPostSchema = newsletterPostSchema.update
  .omit({ details: true })
  .extend({
    details: updateNewsletterPostDetailsSchema.optional(),
    location: locationSchema.update.optional(),
  });

export const createManyNewsletterPostsSchema = z.object({
  posts: z.array(createNewsletterPostSchema.extend(withTempPosition)),
  newsletterId: z.coerce.number(),
});

export const updateManyNewsletterPostsSchema = z.array(updateNewsletterPostSchema);
