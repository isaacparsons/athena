import { z } from 'zod';
import { withCreateInputSchema } from './common';

export enum MediaFormat {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
}
const mediaFormat = z.nativeEnum(MediaFormat);

export enum NewsletterPostTypeName {
  Media = 'media',
  Text = 'text',
  Container = 'container',
}

/**
 * Newsletter Post
 */

export const postDetailType = z.union([
  z.literal(NewsletterPostTypeName.Media),
  z.literal(NewsletterPostTypeName.Text),
  z.literal(NewsletterPostTypeName.Container),
]);

export const basePostDetails = z.object({
  id: z.coerce.number(),
  newsletterPostId: z.coerce.number(),
  name: z.string(),
});

export type BasePostDetails = z.infer<typeof basePostDetails>;

export const mediaPostDetails = z
  .object({
    type: z.literal(NewsletterPostTypeName.Media),
    fileName: z.string(),
    format: mediaFormat,
    caption: z.string().optional().nullable(),
  })
  .merge(basePostDetails);

export type MediaPostDetails = z.infer<typeof mediaPostDetails>;

export const textPostDetails = z
  .object({
    type: z.literal(NewsletterPostTypeName.Text),
    description: z.string().optional().nullable(),
    link: z.string().optional().nullable(),
  })
  .merge(basePostDetails);

export type TextPostDetails = z.infer<typeof textPostDetails>;

export const containerPostDetails = z
  .object({ type: z.literal(NewsletterPostTypeName.Container) })
  .merge(basePostDetails);

export type ContainerPostDetails = z.infer<typeof containerPostDetails>;

export const newsletterPostDetails = z.discriminatedUnion('type', [
  mediaPostDetails,
  textPostDetails,
  containerPostDetails,
]);

export type NewsletterPostDetails<
  T extends NewsletterPostTypeName | undefined = undefined
> = T extends NewsletterPostTypeName.Text
  ? TextPostDetails
  : T extends NewsletterPostTypeName.Media
  ? MediaPostDetails
  : T extends NewsletterPostTypeName.Container
  ? ContainerPostDetails
  : z.infer<typeof newsletterPostDetails>;

export const createNewsletterPostDetails = z.discriminatedUnion('type', [
  withCreateInputSchema(mediaPostDetails.omit({ newsletterPostId: true })),
  withCreateInputSchema(textPostDetails.omit({ newsletterPostId: true })),
  withCreateInputSchema(containerPostDetails.omit({ newsletterPostId: true })),
]);

export const updateNewsletterPostDetails = z.discriminatedUnion('type', [
  mediaPostDetails.partial().merge(
    z.object({
      id: z.coerce.number(),
      type: z.literal(NewsletterPostTypeName.Media),
    })
  ),
  textPostDetails.partial().merge(
    z.object({
      id: z.coerce.number(),
      type: z.literal(NewsletterPostTypeName.Text),
    })
  ),
  containerPostDetails.partial().merge(
    z.object({
      id: z.coerce.number(),
      type: z.literal(NewsletterPostTypeName.Container),
    })
  ),
]);

export type UpdateNewsletterPostDetails = z.infer<
  typeof updateNewsletterPostDetails
>;

export const newsletterPostBase = z.object({
  id: z.coerce.number(),
  newsletterId: z.coerce.number(),
  title: z.string(),
  date: z.string().nullable().optional(),
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

// export const createNewsletterPostDetailsMedia = createInputSchema(
//   mediaPostDetails.omit({ newsletterPostId: true })
// );

// export const createNewsletterPostDetailsText = createInputSchema(
//   textPostDetails.omit({ newsletterPostId: true })
// );

// export const createNewsletterPostDetailsContainer = createInputSchema(
//   containerPostDetails.omit({ newsletterPostId: true })
// );

// export type CreateNewsletterPostDetailsMedia = z.infer<
//   typeof createNewsletterPostDetailsMedia
// >;
// export type CreateNewsletterPostDetailsText = z.infer<
//   typeof createNewsletterPostDetailsText
// >;
// export type CreateNewsletterPostDetailsContainer = z.infer<
//   typeof createNewsletterPostDetailsContainer
// >;

// export const createNewsletterPostDetails = z.discriminatedUnion('type', [
//   createNewsletterPostDetailsMedia,
//   createNewsletterPostDetailsText,
//   createNewsletterPostDetailsContainer,
// ]);

// export type CreateNewsletterPostDetails<
//   T extends NewsletterPostTypeName | undefined = undefined
// > = T extends NewsletterPostTypeName.Text
//   ? CreateNewsletterPostDetailsText
//   : T extends NewsletterPostTypeName.Media
//   ? CreateNewsletterPostDetailsMedia
//   : T extends NewsletterPostTypeName.Container
//   ? CreateNewsletterPostDetailsContainer
//   : z.infer<typeof createNewsletterPostDetails>;

// export const updateNewsletterPostDetailsMedia = mediaPostDetails
//   .pick({ type: true })
//   .merge(mediaPostDetails.omit({ type: true }).partial())
//   .merge(basePostDetails.omit({ id: true }).partial())
//   .merge(basePostDetails.pick({ id: true }));

// export const updateNewsletterPostDetailsText = textPostDetails
//   .pick({ type: true })
//   .merge(textPostDetails.omit({ type: true }).partial())
//   .merge(basePostDetails.omit({ id: true }).partial())
//   .merge(basePostDetails.pick({ id: true }));

// export const updateNewsletterPostDetailsContainer = containerPostDetails
//   .pick({ type: true })
//   .merge(containerPostDetails.omit({ type: true }).partial())
//   .merge(basePostDetails.omit({ id: true }).partial())
//   .merge(basePostDetails.pick({ id: true }));

// export type UpdateNewsletterPostDetailsMedia = z.infer<
//   typeof updateNewsletterPostDetailsMedia
// >;
// export type UpdateNewsletterPostDetailsText = z.infer<
//   typeof updateNewsletterPostDetailsText
// >;
// export type UpdateNewsletterPostDetailsContainer = z.infer<
//   typeof updateNewsletterPostDetailsContainer
// >;

// export const updateNewsletterPostDetails = z.discriminatedUnion('type', [
//   updateNewsletterPostDetailsMedia,
//   updateNewsletterPostDetailsText,
//   updateNewsletterPostDetailsContainer,
// ]);

// export type UpdateNewsletterPostDetails<
//   T extends NewsletterPostTypeName | undefined = undefined
// > = T extends NewsletterPostTypeName.Text
//   ? UpdateNewsletterPostDetailsText
//   : T extends NewsletterPostTypeName.Media
//   ? UpdateNewsletterPostDetailsMedia
//   : T extends NewsletterPostTypeName.Container
//   ? UpdateNewsletterPostDetailsContainer
//   : z.infer<typeof updateNewsletterPostDetails>;

// export const createNewsletterPost = createInputSchema(
//   newsletterPost
//     .omit({
//       children: true,
//       details: true,
//       location: true,
//     })
//     .merge(
//       z.object({
//         details: createNewsletterPostDetails,
//         location: createLocation.optional(),
//       })
//     )
// );

// export type CreateNewsletterPost<
//   T extends NewsletterPostTypeName | undefined = undefined
// > = T extends NewsletterPostTypeName
//   ? Omit<z.infer<typeof createNewsletterPost>, 'details'> & {
//       details: CreateNewsletterPostDetails<T>;
//     }
//   : z.infer<typeof createNewsletterPost>;

// export const updateNewsletterPost = newsletterPost
//   .pick({ id: true, newsletterId: true })
//   .merge(
//     newsletterPost
//       .omit({
//         id: true,
//         newsletterId: true,
//         details: true,
//         position: true,
//         children: true,
//       })
//       .partial()
//   )
//   .merge(z.object({ details: updateNewsletterPostDetails.optional() }))
//   .merge(
//     z.object({
//       childPositions: z
//         .array(nodePosition.merge(z.object({ id: z.coerce.number() })))
//         .optional(),
//     })
//   );

// export const updateNewsletterPost = newsletterPost
//   .pick({ id: true, newsletterId: true })
//   .merge(
//     newsletterPost
//       .omit({
//         id: true,
//         newsletterId: true,
//         details: true,
//         children: true,
//       })
//       .partial()
//   )
//   .merge(z.object({ details: updateNewsletterPostDetails.optional() }));

// export type UpdateNewsletterPost = z.infer<typeof updateNewsletterPost>;

// export const tempNewsletterPostIds = z.object({
//   id: z.string(),
//   parentId: z.coerce.string().nullable(),
//   nextId: z.coerce.string().nullable(),
//   prevId: z.coerce.string().nullable(),
// });

// export type TempNewsletterPostIds = z.infer<typeof tempNewsletterPostIds>;

// export const createNewsletterPostsBatchItem = createNewsletterPost
//   .omit({ position: true })
//   .merge(z.object({ temp: tempNewsletterPostIds }));

// export type CreateNewsletterPostBatchItem<
//   T extends NewsletterPostTypeName | undefined = undefined
// > = T extends NewsletterPostTypeName
//   ? Omit<z.infer<typeof createNewsletterPostsBatchItem>, 'details'> & {
//       details: CreateNewsletterPostDetails<T>;
//     }
//   : z.infer<typeof createNewsletterPostsBatchItem>;

// export const createNewsletterPostsBatch = z.object({
//   newsletterId: z.coerce.number(),
//   position: nodePosition,
//   batch: z.array(createNewsletterPostsBatchItem),
// });

// export type CreateNewsletterPostsBatch = z.infer<typeof createNewsletterPostsBatch>;

// export const getPostUploadLinks = z.object({
//   posts: z.array(z.object({ id: z.string() })),
// });

// export type GetPostUploadLinks = z.infer<typeof getPostUploadLinks>;

// export type GetPostUploadLinksResponse = PostUploadLink[];

// export type PostUploadLink = {
//   id: string;
//   url: string;
//   fileName: string;
// };
