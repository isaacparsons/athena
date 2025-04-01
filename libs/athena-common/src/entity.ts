import { z } from 'zod';
import {
  mediaPostDetails,
  textPostDetails,
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
  TemplateNodeBase,
  templateBase,
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

export type CreateTextPostDetails = z.infer<typeof createTextDetails>;
export type CreateMediaPostDetails = z.infer<typeof createMediaDetails>;

export type UpdateTextPostDetails = z.infer<typeof updateTextDetails>;
export type UpdateMediaPostDetails = z.infer<typeof updateMediaDetails>;

export type NewsletterPostDetails = TextPostDetails | MediaPostDetails;

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

export type TemplateNode = Entity & TemplateNodeBase;

export type TemplateBase = z.infer<typeof templateBase> & Entity;

export type Template = Entity &
  TemplateBase & {
    members: UserBase[];
    nodes: TemplateNode[];
  };
