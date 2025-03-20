import { z } from 'zod';
import {
  Location,
  userBase,
  meta,
  newsletterPostBase,
  newsletterProperties,
  withMetaSchema,
  locationInput,
  createLocation,
  updateLocation,
  nodePosition,
  newsletterPostDetails,
  NewsletterPostTypeName,
  NewsletterPostDetails,
  nodePositionInput,
  createNewsletterPostDetails,
  withCreateInputSchema,
  withUpdateInputSchema,
  updateNewsletterPostDetails,
  tempNodePosition,
} from './lib';

/**
 * Newsletter
 */

export const newsletterBase = z
  .object({
    id: z.coerce.number(),
  })
  .merge(
    z.object({
      properties: newsletterProperties,
      owner: userBase,
      meta: meta,
    })
  );

export type NewsletterBase = z.infer<typeof newsletterBase>;

export const newsletter = newsletterBase.merge(
  z.object({
    members: z.array(userBase),
    posts: z.array(newsletterPostBase),
  })
);

export type Newsletter = z.infer<typeof newsletter>;

export type Entity =
  | Location
  | User
  // | NewsletterPostTemplate
  | Newsletter
  | NewsletterPost;

export const user = userBase.merge(
  z.object({
    newsletters: z.array(newsletterBase),
    // newsletterItemTemplates: z.array(newsletterItemTemplateBase),
  })
);

export type User = z.infer<typeof user>;

/**
 * Newsletter Post
 */

export const newsletterPost = withMetaSchema(
  newsletterPostBase.merge(
    z.object({
      position: nodePosition,
      location: locationInput.optional(),
      details: newsletterPostDetails,
      children: z.array(newsletterPostBase),
    })
  )
);

export type NewsletterPost<
  T extends NewsletterPostTypeName | undefined = undefined
> = z.infer<typeof newsletterPost> & {
  details: NewsletterPostDetails<T>;
};

export const createNewsletterPostBase = withCreateInputSchema(
  newsletterPostBase.omit({ id: true }).merge(
    z.object({
      details: createNewsletterPostDetails,
      location: createLocation.optional(),
    })
  )
);

const createNewsletterPostChild = createNewsletterPostBase.merge(
  z.object({ tempPosition: tempNodePosition })
);
export type CreateNewsletterPostChild = z.infer<typeof createNewsletterPostChild>;

export const createNewsletterPost = createNewsletterPostBase.merge(
  z.object({
    position: nodePositionInput,
    children: z.array(createNewsletterPostChild),
  })
);
export type CreateNewsletterPost = z.infer<typeof createNewsletterPost>;

export const updateNewsletterPosts = z.array(
  withUpdateInputSchema(
    newsletterPostBase.partial().merge(
      z.object({
        position: nodePositionInput,
        details: updateNewsletterPostDetails,
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
