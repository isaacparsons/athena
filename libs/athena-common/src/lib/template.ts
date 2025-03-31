import { z } from 'zod';
import { nodePosition, tempNodePosition } from './common';

export enum TemplateType {
  Newsletter = 'newsletter',
  NewsletterPost = 'newsletter-post',
}
const templateType = z.nativeEnum(TemplateType);

export const templateNodeBase = z.object({
  id: z.coerce.number(),
  position: nodePosition,
  templateId: z.coerce.number(),
  data: z.record(z.string(), z.string()),
});

export const createTemplateNode = templateNodeBase
  .extend({ tempPosition: tempNodePosition })
  .omit({
    id: true,
    templateId: true,
    position: true,
  });

export const createTemplateNodes = z.object({
  templateId: z.coerce.number(),
  position: nodePosition,
  nodes: z.array(createTemplateNode),
});
export type CreateTemplateNode = z.infer<typeof createTemplateNode>;
export type CreateTemplateNodes = z.infer<typeof createTemplateNodes>;

export type TemplateNodeBase = z.infer<typeof templateNodeBase>;

export const templateBase = z.object({
  id: z.coerce.number(),
  name: z.coerce.string(),
  type: templateType,
  config: z.record(z.string(), z.string()),
});

export const createTemplate = templateBase
  .omit({ id: true })
  .extend({ nodes: z.array(createTemplateNode) });

export type CreateTemplate = z.infer<typeof createTemplate>;

export const updateTemplateNode = z
  .object({
    id: z.coerce.number(),
  })
  .merge(templateNodeBase.omit({ id: true, templateId: true }).partial());

export type UpdateTemplateNode = z.infer<typeof updateTemplateNode>;

export const updateTemplate = z
  .object({
    id: z.coerce.number(),
  })
  .merge(templateBase.omit({ id: true, type: true }).partial())
  .extend({
    nodes: z.array(updateTemplateNode),
  });

export type UpdateTemplate = z.infer<typeof updateTemplate>;

/**
 * Newsletter item template
 */

// const newsletterItemTemplateDataDetails = z
//   .discriminatedUnion('type', [
//     createNewsletterPostDetailsMedia,
//     createNewsletterPostDetailsText,
//     createNewsletterPostDetailsContainer,
//   ])
//   .optional();

// export type NewsletterPostTemplateDataDetails<
//   T extends NewsletterPostTypeName | undefined = undefined
// > = T extends NewsletterPostTypeName.Text
//   ? CreateNewsletterPostDetailsText
//   : T extends NewsletterPostTypeName.Media
//   ? CreateNewsletterPostDetailsMedia
//   : T extends NewsletterPostTypeName.Container
//   ? CreateNewsletterPostDetailsContainer
//   : z.infer<typeof newsletterItemTemplateDataDetails>;

// export const newsletterItemTemplateData = z.object({
//   id: z.coerce.number(),
//   position: nodePosition,
//   templateId: z.coerce.number().optional(),
//   data: newsletterItemTemplateDataDetails,
// });

// export type NewsletterPostTemplateData = z.infer<typeof newsletterItemTemplateData>;

// export const createNewsletterPostTemplateData = newsletterItemTemplateData
//   .omit({ position: true, id: true })
//   .merge(z.object({ temp: tempNewsletterPostIds }));

// export const newsletterItemTemplateBase = z.object({
//   id: z.coerce.number(),
//   meta: meta,
//   name: z.string(),
// });

// export type NewsletterPostTemplateBase = z.infer<typeof newsletterItemTemplateBase>;

// export const newsletterItemTemplate = newsletterItemTemplateBase.merge(
//   z.object({
//     items: z.array(newsletterItemTemplateData),
//     templates: z.array(newsletterItemTemplateBase),
//   })
// );

// export type NewsletterPostTemplate = z.infer<typeof newsletterItemTemplate>;

// export const createNewsletterPostTemplate = newsletterItemTemplate
//   .omit({
//     id: true,
//     templates: true,
//     items: true,
//     meta: true,
//   })
//   .merge(z.object({ data: z.array(createNewsletterPostTemplateData) }));

// export type CreateNewsletterPostTemplate = z.infer<
//   typeof createNewsletterPostTemplate
// >;
