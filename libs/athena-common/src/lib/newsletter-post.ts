import { z } from 'zod';

// function inferSchema<T>(schema: z.ZodType<T>) {
//   return schema;
// }
// function createSchema<T extends z.ZodTypeAny, R extends keyof T, W extends keyof T>(
//   schema: T,
//   readonlyFields: R[],
//   writeOnlyFields: W[]
// ) {
//   return schema.omit(keysToTruthyObject<T['_getType']>(readonlyFields));
// }

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

const postDetailBase = z.object({
  id: z.coerce.number(),
  type: postDetailType,
  newsletterPostId: z.coerce.number(),
  name: z.string(),
});

export const mediaPostInput = z.object({
  type: z.literal(NewsletterPostTypeName.Media),
  fileName: z.string(),
  format: mediaFormat,
  caption: z.string().nullable(),
});

export const mediaPostDetails = postDetailBase.merge(mediaPostInput);

export const createMediaDetails = mediaPostDetails
  .omit({ id: true, newsletterPostId: true })
  .partial({ caption: true });

export const updateMediaDetails = mediaPostDetails
  .partial()
  .required({ id: true, newsletterPostId: true, type: true });

export const textPostInput = z.object({
  type: z.literal(NewsletterPostTypeName.Text),
  description: z.string().nullable(),
  link: z.string().nullable(),
});

export const textPostDetails = postDetailBase.merge(textPostInput);

export const createTextDetails = textPostDetails
  .omit({ id: true, newsletterPostId: true })
  .partial()
  .required({ type: true, name: true });

export const updateTextDetails = textPostDetails
  .partial()
  .required({ id: true, newsletterPostId: true, type: true });

export const createNewsletterPostDetails = z.discriminatedUnion('type', [
  createMediaDetails,
  createTextDetails,
]);

export const updateNewsletterPostDetails = z.discriminatedUnion('type', [
  updateMediaDetails,
  updateTextDetails,
]);

export type UpdateNewsletterPostDetails = z.infer<
  typeof updateNewsletterPostDetails
>;

export const newsletterPostBase = z.object({
  id: z.coerce.number(),
  newsletterId: z.coerce.number(),
  title: z.string(),
  date: z.string().nullable(),
});

export type NewsletterPostBase = z.infer<typeof newsletterPostBase>;

export const getPostUploadLinks = z.object({
  posts: z.array(z.object({ id: z.string() })),
});

export type GetPostUploadLinks = z.infer<typeof getPostUploadLinks>;

export type PostUploadLink = {
  id: string;
  url: string;
  fileName: string;
};

export type GetPostUploadLinksResponse = PostUploadLink[];
