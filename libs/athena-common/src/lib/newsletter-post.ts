import { z } from 'zod';
import { makeEntitySchemas, nodePositionSchema } from './common';

export enum MediaFormat {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
}
const mediaFormat = z.nativeEnum(MediaFormat);

export enum NewsletterPostTypeName {
  Media = 'media',
  Text = 'text',
}

export const postDetailType = z.union([
  z.literal(NewsletterPostTypeName.Media),
  z.literal(NewsletterPostTypeName.Text),
]);

export const mediaPostDetailsSchema = makeEntitySchemas({
  newsletterPostId: z.coerce.number(),
  type: z.literal(NewsletterPostTypeName.Media),
  fileName: z.string(),
  format: mediaFormat,
  caption: z.string().nullable(),
  name: z.string(),
});

export const createMediaPostDetailsSchema = mediaPostDetailsSchema.create.omit({
  newsletterPostId: true,
});

export const updateMediaPostDetailsSchema = mediaPostDetailsSchema.update
  .omit({ newsletterPostId: true, id: true })
  .required({ type: true });

export const textPostDetailsSchema = makeEntitySchemas({
  newsletterPostId: z.coerce.number(),
  type: z.literal(NewsletterPostTypeName.Text),
  description: z.string().nullable(),
  link: z.string().nullable(),
  name: z.string(),
});

export const createTextPostDetailsSchema = textPostDetailsSchema.create.omit({
  newsletterPostId: true,
});

export const updateTextPostDetailsSchema = textPostDetailsSchema.update
  .omit({ newsletterPostId: true, id: true })
  .required({ type: true });

export const postDetailsSchema = z.discriminatedUnion('type', [
  mediaPostDetailsSchema.base,
  textPostDetailsSchema.base,
]);

export const createPostDetailsSchema = z.discriminatedUnion('type', [
  createMediaPostDetailsSchema,
  createTextPostDetailsSchema,
]);

export const updateNewsletterPostDetailsSchema = z.discriminatedUnion('type', [
  updateMediaPostDetailsSchema,
  updateTextPostDetailsSchema,
]);

export const newsletterPostSchema = makeEntitySchemas({
  newsletterId: z.coerce.number(),
  title: z.string(),
  date: z.string().nullable(),
  details: postDetailsSchema,
  position: nodePositionSchema,
});

export const readPostUploadLinksSchema = z.object({
  posts: z.array(z.object({ id: z.string() })),
});
