import { z } from 'zod';

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
