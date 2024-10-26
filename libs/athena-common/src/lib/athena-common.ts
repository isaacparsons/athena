import { z } from 'zod';

type NullableString = string | null;

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface UserBase {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface User extends UserBase {
  newsletters: NewsletterBase[];
  newsletterItemTemplates: Omit<NewsletterItemTemplateBase, 'items'>[];
}

interface MetaBase {
  creator: UserBase;
  modifier: UserBase | null;
  created: string;
  modified: string | null;
}

interface Meta {
  meta: MetaBase;
}

export type Position = {
  lattitude: number;
  longitude: number;
};

export interface DateRange {
  start: NullableString;
  end: NullableString;
}

export interface Country {
  name: string;
  position: Position;
}

export interface Location {
  id: number;
  country: string | null;
  name: string | null;
  position: Position | null;
}

export enum NewsletterItemType {
  media = 'media',
  text = 'text',
}

export type ItemUploadLink = {
  id: string;
  url: string;
  fileName: string;
};

type NewsletterItemDetailsBase = {
  id: number;
  name: string;
};

export type NewsletterItemDetailsMedia = NewsletterItemDetailsBase & {
  type: NewsletterItemType.media;
  fileName: string;
  caption: string | null;
};

export type NewsletterItemDetailsText = NewsletterItemDetailsBase & {
  type: NewsletterItemType.text;
  description: string | null;
  link: string | null;
};

export type NewsletterItemDetails =
  | NewsletterItemDetailsText
  | NewsletterItemDetailsMedia;

export interface NewsletterItemBase extends Meta {
  id: number;
  location: Location | null;
  date: string | null;
  title: string;
  parentId: number | null;
  nextItemId: number | null;
  previousItemId: number | null;
  details?: NewsletterItemDetails;
}

export interface NewsletterItem extends NewsletterItemBase {
  children: NewsletterItemBase[];
}

export interface NewsletterProperties {
  name: string;
  dateRange: DateRange | null;
}

export interface NewsletterBase extends Meta {
  id: number;
  properties: NewsletterProperties;
  owner: UserBase;
}

export interface Newsletter extends NewsletterBase {
  members: UserBase[];
  items: NewsletterItemBase[];
}

export interface NewsletterItemTemplateBase extends Meta {
  id: number;
  name: string;
  items: NewsletterItemTemplateData[];
}

export type NewsletterItemTemplate = NewsletterItemTemplateBase & {
  templates: NewsletterItemTemplateBase[];
};

export const locationInput = z
  .object({
    name: z.string().optional(),
    countryCode: z.string().optional(),
    lattitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
  })
  .optional();

export type LocationInput = z.infer<typeof locationInput>;

export const mediaItemDetails = z.object({
  type: z.literal(NewsletterItemType.media),
  name: z.string(),
  fileName: z.string(),
  caption: z.string().optional().nullable(),
});

export const textItemDetails = z.object({
  type: z.literal(NewsletterItemType.text),
  name: z.string(),
  description: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
});

export type CreateMediaItemDetailsInput = z.infer<typeof mediaItemDetails>;
export type CreateTextItemDetailsInput = z.infer<typeof textItemDetails>;

export const newsletterItemDetails = z
  .discriminatedUnion('type', [mediaItemDetails, textItemDetails])
  .optional();

export const getNewsletterItemInput = z.object({
  newsletterItemId: z.coerce.number(),
});

export const postNewsletterItemInputBase = z.object({
  newsletterId: z.coerce.number(),
  parentId: z.coerce.number().nullable(),
  nextItemId: z.coerce.number().nullable(),
  previousItemId: z.coerce.number().nullable(),
  title: z.string(),
  date: z.string().optional(),
  location: locationInput,
});

export const postNewsletterItemInput = postNewsletterItemInputBase.merge(
  z.object({
    details: newsletterItemDetails,
  })
);

export const postNewsletterItemBatchInputItem = z.object({
  title: z.string(),
  date: z.string().optional(),
  location: locationInput,
  temp: z.object({
    id: z.number(),
    parentId: z.coerce.number().nullable(),
    nextItemId: z.coerce.number().nullable(),
    previousItemId: z.coerce.number().nullable(),
  }),
  details: newsletterItemDetails,
});

export const postNewsletterItemBatchInput = z.object({
  newsletterId: z.coerce.number(),
  parentId: z.coerce.number().nullable(),
  nextItemId: z.coerce.number().nullable(),
  previousItemId: z.coerce.number().nullable(),
  batch: z.array(postNewsletterItemBatchInputItem),
});

export const updateNewsletterItemInput = z
  .object({
    newsletterItemId: z.coerce.number(),
    title: z.string().optional(),
    date: z.string().optional().nullable(),
    // parentId: z.coerce.number().optional(),
    nextItemId: z.coerce.number().optional(),
    location: locationInput,
    details: newsletterItemDetails,
  })
  .refine((obj) => obj.date || obj.nextItemId || obj.title || obj.location);

export const deleteManyNewsletterItemsInput = z.object({
  newsletterItemIds: z.array(z.coerce.number()),
});

export const getItemUploadLinksInput = z.object({
  items: z.array(z.object({ id: z.string() })),
});

export type GetItemUploadLinksResponse = ItemUploadLink[];

export type CreateNewsletterItemDetailsInput = z.infer<
  typeof newsletterItemDetails
>;

export type CreateNewsletterItemInput = z.infer<typeof postNewsletterItemInput>;

export type CreateNewsletterItemBatchInputItem = z.infer<
  typeof postNewsletterItemBatchInputItem
>;

export type CreateNewsletterItemBatchInput = z.infer<
  typeof postNewsletterItemBatchInput
>;
export type ReadNewsletterItemInput = z.infer<typeof getNewsletterItemInput>;
export type UpdateNewsletterItemInput = z.infer<
  typeof updateNewsletterItemInput
>;
export type DeleteManyNewsletterItemsInput = z.infer<
  typeof deleteManyNewsletterItemsInput
>;

export const getNewsletterInput = z.object({
  newsletterId: z.coerce.number(),
});

export const postNewsletterInput = z.object({
  name: z.string().min(3).max(100),
  startDate: z.string().min(8),
  endDate: z.string().min(8).optional(),
});

export const updateNewsletterInput = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

export const deleteNewsletterInput = z.object({ id: z.coerce.number() });

export type CreateNewsletterInput = z.infer<typeof postNewsletterInput>;
export type ReadNewsletterInput = z.infer<typeof getNewsletterInput>;
export type UpdateNewsletterInput = z.infer<typeof updateNewsletterInput>;
export type DeleteNewsletterInput = z.infer<typeof deleteNewsletterInput>;

/** Newsletter item templates
 *
 * examples: 'album', 'review', 'experience', 'celebration', 'notable-mention',
 */

const newsletterItemTemplateDataDetails = z
  .discriminatedUnion('type', [
    mediaItemDetails
      .pick({ type: true })
      .merge(mediaItemDetails.omit({ type: true }).partial()),
    textItemDetails
      .pick({ type: true })
      .merge(textItemDetails.omit({ type: true }).partial()),
  ])
  .optional();

export type NewsletterItemTemplateDataDetails = z.infer<
  typeof newsletterItemTemplateDataDetails
>;

const baseNewsletterItemTemplateData = z.object({
  id: z.number(),
  nextId: z.number().nullable(),
  prevId: z.number().nullable(),
  parentId: z.number().nullable(),
  templateId: z.number().nullable(),
  data: newsletterItemTemplateDataDetails,
});

export type NewsletterItemTemplateData = z.infer<
  typeof baseNewsletterItemTemplateData
>;
// type CreateNewsletterItemTemplateData = z.infer<
//   typeof baseNewsletterItemTemplateData
// > & {
//   children: CreateNewsletterItemTemplateData[];
// };

// const newsletterItemTemplateDataInput: z.ZodType<CreateNewsletterItemTemplateData> =
//   baseNewsletterItemTemplateData.extend({
//     children: z.lazy(() => newsletterItemTemplateDataInput.array()),
//   });

export const postNewsletterItemTemplateInput = z.object({
  name: z.string(),
  data: z.array(
    z.object({
      templateId: z.number().optional(),
      temp: z.object({
        id: z.number(),
        parentId: z.number().nullable(),
        nextId: z.number().nullable(),
        prevId: z.number().nullable(),
      }),
      data: newsletterItemTemplateDataDetails,
    })
  ),
});

export const getNewsletterItemTemplateInput = z.object({
  id: z.number(),
});

// export const updateNewsletterItemTemplateInput = z.object({
//   id: z.number(),
//   data: newsletterItemTemplateDataInput,
// });

export const deleteNewsletterItemTemplateInput = z.object({
  id: z.number(),
});

export type CreateNewsletterItemTemplateInput = z.infer<
  typeof postNewsletterItemTemplateInput
>;

export type ReadNewsletterItemTemplateInput = z.infer<
  typeof getNewsletterItemTemplateInput
>;
// export type UpdateNewsletterItemTemplateInput = z.infer<
//   typeof updateNewsletterItemTemplateInput
// >;
export type DeleteNewsletterItemTemplateInput = z.infer<
  typeof deleteNewsletterItemTemplateInput
>;
