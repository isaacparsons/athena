import { z } from 'zod';
import {
  newsletterPostSchema,
  updateNewsletterPostDetailsSchema,
} from './lib/newsletter-post';
import { createPostDetailsSchema } from './lib/newsletter-post';
import {
  locationSchema,
  newsletterRole,
  nodePositionSchema,
  templateInputSchema,
  templateNodeSchema,
  templateSchema,
  tempNodePositionSchema,
  updateTemplateNodeSchema,
  userSchema,
  withTempPosition,
} from './lib';

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

export const createTemplateNodeSchema = templateNodeSchema.create.omit({
  templateId: true,
  position: true,
});

// z.object({
//   data: ,
//   tempPosition: tempNodePositionSchema,
// });

export const createManyTemplateNodesSchema = z.object({
  templateId: z.coerce.number(),
  position: nodePositionSchema,
  nodes: z.array(
    z.object({
      data: createTemplateNodeSchema,
      tempPosition: tempNodePositionSchema,
    })
  ),
});

export const saveTemplateNodesSchema = z.object({
  createNodes: z.array(
    z.object({
      data: createTemplateNodeSchema,
      tempPosition: tempNodePositionSchema,
    })
  ),
  updateNodes: z.array(
    z.object({
      data: updateTemplateNodeSchema,
      id: z.coerce.number(),
      tempPosition: tempNodePositionSchema,
    })
  ),
  deleteNodes: z.array(z.number()),
});

// export const saveTemplateSchema = z.object({
//   id: z.coerce.number(),
//   template: templateInputSchema.optional(),
//   nodes: saveTemplateNodesSchema.optional(),
// });

export const updateTemplateSchema = templateSchema.update.extend({
  nodes: saveTemplateNodesSchema,
});

export const createTemplateSchema = templateSchema.create.extend({
  nodes: z.array(
    z.object({
      data: createTemplateNodeSchema,
      tempPosition: tempNodePositionSchema,
    })
  ),
});
