import { z } from 'zod';
import {
  mediaPostDetails,
  textPostDetails,
  containerPostDetails,
  createTextDetails,
  createMediaDetails,
  updateTextDetails,
  updateMediaDetails,
} from './lib/newsletter-post';
import {
  Location,
  newsletterPostBase,
  createLocation,
  updateLocation,
  nodePosition,
  nodePositionInput,
  createNewsletterPostDetails,
  createRequestSchema,
  updateRequestSchema,
  updateNewsletterPostDetails,
  tempNodePosition,
  UserBase,
  NewsletterProperties,
  NewsletterPostBase,
  NodePosition,
} from './lib';

export type Meta = {
  creator: UserBase;
  modifier: UserBase | null;
  created: string;
  modified: string | null;
};

export type Entity = { id: number; meta: Meta };

/**
 * Newsletter
 */

export type NewsletterBase = Entity & {
  properties: NewsletterProperties;
  owner: UserBase;
};

export type Newsletter = NewsletterBase & {
  members: UserBase[];
  posts: NewsletterPost[];
};

export type User = {
  newsletters: NewsletterBase[];
  // newsletterItemTemplates: z.array(newsletterItemTemplateBase),
};

/**
 * Newsletter Post
 */

export type TextPostDetails = z.infer<typeof textPostDetails>;
export type MediaPostDetails = z.infer<typeof mediaPostDetails>;
export type ContainerPostDetails = z.infer<typeof containerPostDetails>;

export type CreateTextPostDetails = z.infer<typeof createTextDetails>;
export type CreateMediaPostDetails = z.infer<typeof createMediaDetails>;

export type UpdateTextPostDetails = z.infer<typeof updateTextDetails>;
export type UpdateMediaPostDetails = z.infer<typeof updateMediaDetails>;

export type NewsletterPostDetails =
  | TextPostDetails
  | MediaPostDetails
  | ContainerPostDetails;

export type NewsletterPost<
  T extends NewsletterPostDetails | undefined = NewsletterPostDetails
> = Entity &
  NewsletterPostBase & {
    details: T;
    position: NodePosition;
    location: Location | null;
    children?: Omit<NewsletterPost, 'children'>[];
  };

export const createNewsletterPostBase = createRequestSchema(
  newsletterPostBase.merge(
    z.object({
      details: createNewsletterPostDetails,
      location: createLocation.optional(),
    })
  )
);

export const createNewsletterPost = createNewsletterPostBase.merge(
  z.object({ tempPosition: tempNodePosition })
);

export type CreateNewsletterPost = z.infer<typeof createNewsletterPost>;

export const createManyNewsletterPosts = z.object({
  posts: z.array(createNewsletterPost),
  position: nodePositionInput,
  newsletterId: z.coerce.number(),
});

export type CreateManyNewsletterPosts = z.infer<typeof createManyNewsletterPosts>;

// export const createNewsletterPostChild = createNewsletterPostBase.merge(
//   z.object({ tempPosition: tempNodePosition })
// );
// export type CreateNewsletterPostChild = z.infer<typeof createNewsletterPostChild>;

// export const createNewsletterPost = createNewsletterPostBase.merge(
//   z.object({
//     position: nodePositionInput,
//     children: z.array(createNewsletterPostChild),
//   })
// );
// export type CreateNewsletterPost = z.infer<typeof createNewsletterPost>;

export const updateNewsletterPosts = z.array(
  updateRequestSchema(
    newsletterPostBase.partial().merge(
      z.object({
        position: nodePosition.optional(),
        details: updateNewsletterPostDetails.optional(),
        location: updateLocation.optional(),
      })
    )
  )
);
export type UpdateNewsletterPosts = z.infer<typeof updateNewsletterPosts>;

// export const createNewsletterPostsBatchItem = createNewsletterPost
//   .omit({ position: true })
//   .merge(z.object({ tempPosition: tempNodePosition }));

// export const createNewsletterPostsBatch = z.object({
//   newsletterId: z.coerce.number(),
//   position: nodePositionInput,
//   batch: z.array(createNewsletterPostsBatchItem),
// });
// export type CreateNewsletterPostsBatch = z.infer<typeof createNewsletterPostsBatch>;
