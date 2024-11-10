import { z } from 'zod';
/**
 * Input validation
 */

export const locationInput = z
  .object({
    name: z.string().optional(),
    countryCode: z.string().optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
  })
  .optional();

export enum MediaFormat {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
}

export enum NewsletterItemTypeName {
  Media = 'media',
  Text = 'text',
  Container = 'container',
}

const mediaFormat = z.nativeEnum(MediaFormat);

export const mediaItemDetails = z.object({
  type: z.literal(NewsletterItemTypeName.Media),
  name: z.string(),
  fileName: z.string(),
  format: mediaFormat,
  caption: z.string().optional().nullable(),
});

export const textItemDetails = z.object({
  type: z.literal(NewsletterItemTypeName.Text),
  name: z.string(),
  description: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
});

export const containerItemDetails = z.object({
  type: z.literal(NewsletterItemTypeName.Container),
  name: z.string(),
});

export const newsletterItemDetails = z.discriminatedUnion('type', [
  mediaItemDetails,
  textItemDetails,
  containerItemDetails,
]);

export const getNewsletterItemInput = z.object({
  newsletterItemId: z.coerce.number(),
});

export const getNewsletterItemTreeInput = z.object({
  parentId: z.coerce.number().nullable(),
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

export const tempNewsletterItemIds = z.object({
  id: z.string(),
  parentId: z.string().nullable(),
  nextId: z.string().nullable(),
  prevId: z.string().nullable(),
});

export const postNewsletterItemBatchInputItem = postNewsletterItemInput
  .omit({
    nextItemId: true,
    previousItemId: true,
    parentId: true,
  })
  .merge(z.object({ temp: tempNewsletterItemIds }));

export const postNewsletterItemBatchInput = z.object({
  newsletterId: z.coerce.number(),
  parentId: z.coerce.number().nullable(),
  nextItemId: z.coerce.number().nullable(),
  previousItemId: z.coerce.number().nullable(),
  batch: z.array(postNewsletterItemBatchInputItem),
});

// TODO: we can remove below, it should be derived from newsletter item input
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

export const getNewsletterInput = z.object({
  newsletterId: z.coerce.number(),
});

export const postNewsletterInput = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 characters long' })
    .max(100, { message: 'Name must be at less than 100 characters long' }),
  startDate: z.string().min(8).optional(),
  endDate: z.string().min(8).optional(),
});

export const updateNewsletterInput = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

export const deleteNewsletterInput = z.object({ id: z.coerce.number() });

export const deleteManyNewsletterItemsInput = z.object({
  newsletterItemIds: z.array(z.coerce.number()),
});

export const getItemUploadLinksInput = z.object({
  items: z.array(z.object({ id: z.string() })),
});

const newsletterItemTemplateDataDetails = z
  .discriminatedUnion('type', [
    mediaItemDetails
      .pick({ type: true, format: true })
      .merge(mediaItemDetails.omit({ type: true, format: true }).partial()),
    textItemDetails
      .pick({ type: true })
      .merge(textItemDetails.omit({ type: true }).partial()),
    containerItemDetails
      .pick({ type: true })
      .merge(containerItemDetails.omit({ type: true }).partial()),
  ])
  .optional();
export const postNewsletterItemTemplateInput = z.object({
  name: z.string(),
  data: z.array(
    z.object({
      templateId: z.number().optional(),
      temp: tempNewsletterItemIds,
      data: newsletterItemTemplateDataDetails,
    })
  ),
});
export const getNewsletterItemTemplateInput = z.object({
  id: z.number(),
});
export const deleteNewsletterItemTemplateInput = z.object({
  id: z.number(),
});

/**
 * Base Types
 */

type NullableString = string | null;

/**
 * User
 */
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

export type UserNewsletters = NewsletterBase[];
export type UserNewsletterItemTemplates = Omit<
  NewsletterItemTemplateBase,
  'items'
>[];

export interface User extends UserBase {
  newsletters: UserNewsletters;
  newsletterItemTemplates: UserNewsletterItemTemplates;
}

/**
 * Common
 */
export type Position = {
  latitude: number;
  longitude: number;
};

interface MetaBase {
  creator: UserBase;
  modifier: UserBase | null;
  created: string;
  modified: string | null;
}

interface Meta {
  meta: MetaBase;
}

export interface DateRange {
  start: NullableString;
  end: NullableString;
}

/**
 * Country
 */
export interface Country {
  name: string;
  position: Position;
}

/**
 * Location
 */
export interface Location {
  id: number;
  country: string | null;
  name: string | null;
  position: Position | null;
}
export type LocationInput = z.infer<typeof locationInput>;
export type TempNewsletterItemIds = z.infer<typeof tempNewsletterItemIds>;

/**
 * Newsletter
 */

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

export type CreateNewsletterInput = z.infer<typeof postNewsletterInput>;
export type ReadNewsletterInput = z.infer<typeof getNewsletterInput>;
export type UpdateNewsletterInput = z.infer<typeof updateNewsletterInput>;
export type DeleteNewsletterInput = z.infer<typeof deleteNewsletterInput>;

/**
 * Newsletter Item
 */

type CreateItemDetailsInputMedia = z.infer<typeof mediaItemDetails>;
type CreateItemDetailsInputText = z.infer<typeof textItemDetails>;
type CreateItemDetailsInputContainer = z.infer<typeof containerItemDetails>;

export type CreateItemDetailsInputMap = {
  media: CreateItemDetailsInputMedia;
  text: CreateItemDetailsInputText;
  container: CreateItemDetailsInputContainer;
};
export type CreateNewsletterItemDetailsTypeFromName<
  T extends NewsletterItemTypeName
> = CreateItemDetailsInputMap[T];

export type CreateItemDetailsInput<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> = CreateNewsletterItemDetailsTypeFromName<T>;

export function isMediaDetailsInput(
  details: CreateItemDetailsInput | undefined
): details is CreateItemDetailsInputMedia {
  return (
    (details as CreateItemDetailsInputMedia)?.type === NewsletterItemTypeName.Media
  );
}

export function isTextDetailsInput(
  details: CreateItemDetailsInput | undefined
): details is CreateItemDetailsInputText {
  return (
    (details as CreateItemDetailsInputText)?.type === NewsletterItemTypeName.Text
  );
}

export function isContainerDetailsInput(
  details: CreateItemDetailsInput | undefined
): details is CreateItemDetailsInputContainer {
  return (
    (details as CreateItemDetailsInputContainer)?.type ===
    NewsletterItemTypeName.Container
  );
}

export type CreateNewsletterItemInput = z.infer<typeof postNewsletterItemInput>;
export type CreateNewsletterItemBatchInputItem = z.infer<
  typeof postNewsletterItemBatchInputItem
>;
export type CreateNewsletterItemBatchInput = z.infer<
  typeof postNewsletterItemBatchInput
>;
export type ReadNewsletterItemInput = z.infer<typeof getNewsletterItemInput>;
export type ReadNewsletterItemTreeInput = z.infer<typeof getNewsletterItemTreeInput>;
export type UpdateNewsletterItemInput = z.infer<typeof updateNewsletterItemInput>;
export type DeleteManyNewsletterItemsInput = z.infer<
  typeof deleteManyNewsletterItemsInput
>;
export type CreateNewsletterItemDetailsInput = z.infer<typeof newsletterItemDetails>;
export type GetItemUploadLinksResponse = ItemUploadLink[];

export type ItemUploadLink = {
  id: string;
  url: string;
  fileName: string;
};

export type NewsletterItemDetailsBase = {
  id: number;
  name: string;
};

export type NewsletterItemDetailsMedia = NewsletterItemDetailsBase & {
  type: NewsletterItemTypeName.Media;
  fileName: string;
  format: MediaFormat;
  caption: string | null;
};

export type NewsletterItemDetailsText = NewsletterItemDetailsBase & {
  type: NewsletterItemTypeName.Text;
  description: string | null;
  link: string | null;
};

export type NewsletterItemDetailsContainer = NewsletterItemDetailsBase & {
  type: NewsletterItemTypeName.Container;
};

export type NewsletterItemDetailsMap = {
  [NewsletterItemTypeName.Media]: NewsletterItemDetailsMedia;
  [NewsletterItemTypeName.Text]: NewsletterItemDetailsText;
  [NewsletterItemTypeName.Container]: NewsletterItemDetailsContainer;
};

type NewsletterItemDetails<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> = NewsletterItemDetailsTypeFromName<T>;

export type NewsletterItemDetailsTypeFromName<T extends NewsletterItemTypeName> =
  NewsletterItemDetailsMap[T];

export function isMediaDetails(
  details: NewsletterItemDetails
): details is NewsletterItemDetailsMedia {
  return (
    (details as NewsletterItemDetailsMedia).type === NewsletterItemTypeName.Media
  );
}

export function isTextDetails(
  details: NewsletterItemDetails
): details is NewsletterItemDetailsText {
  return (details as NewsletterItemDetailsText).type === NewsletterItemTypeName.Text;
}

export function isContainerDetails(
  details: NewsletterItemDetails
): details is NewsletterItemDetailsContainer {
  return (
    (details as NewsletterItemDetailsContainer).type ===
    NewsletterItemTypeName.Container
  );
}

export interface NewsletterItemBase<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> extends Meta {
  newsletterId: number;
  id: number;
  location: Location | null;
  date: string | null;
  title: string;
  parentId: number | null;
  nextItemId: number | null;
  previousItemId: number | null;
  details: NewsletterItemDetailsTypeFromName<T>;
}

export interface NewsletterItem<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> extends NewsletterItemBase<T> {
  children: NewsletterItemBase<T>[];
}

/**
 * Newsletter item template
 */

export interface NewsletterItemTemplateBase<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> extends Meta {
  id: number;
  name: string;
  items: NewsletterItemTemplateData<T>[];
}

export type NewsletterItemTemplate<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> = NewsletterItemTemplateBase<T> & {
  templates: NewsletterItemTemplateBase<T>[];
};

// const newsletterItemTemplateDataDetails = z
//   .discriminatedUnion('type', [
//     mediaItemDetails
//       .pick({ type: true })
//       .merge(mediaItemDetails.omit({ type: true }).partial()),
//     textItemDetails
//       .pick({ type: true })
//       .merge(textItemDetails.omit({ type: true }).partial()),
//   ])
//   .optional();
// const baseNewsletterItemTemplateData = z.object({
//   id: z.number(),
//   nextId: z.number().nullable(),
//   prevId: z.number().nullable(),
//   parentId: z.number().nullable(),
//   templateId: z.number().nullable(),
//   data: newsletterItemTemplateDataDetails,
// });

export type NewsletterItemTemplateDataDetails<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> = NewsletterItemDetailsTypeFromName<T> & { type: T };

export interface NewsletterItemTemplateData<
  T extends NewsletterItemTypeName = NewsletterItemTypeName
> {
  id: number;
  nextId: number | null;
  prevId: number | null;
  parentId: number | null;
  templateId: number | null;
  data: NewsletterItemTemplateDataDetails<T>;
}

// export type NewsletterItemTemplateDataDetails = z.infer<
//   typeof newsletterItemTemplateDataDetails
// >;
// export type NewsletterItemTemplateData = z.infer<typeof baseNewsletterItemTemplateData>;
export type CreateNewsletterItemTemplateInput = z.infer<
  typeof postNewsletterItemTemplateInput
>;
export type ReadNewsletterItemTemplateInput = z.infer<
  typeof getNewsletterItemTemplateInput
>;
export type DeleteNewsletterItemTemplateInput = z.infer<
  typeof deleteNewsletterItemTemplateInput
>;

/**
 * Helpers
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
