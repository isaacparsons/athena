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
}

interface Meta {
  creator: UserBase;
  modifier: UserBase | null;
  created: string;
  modified: string | null;
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

export const locationInput = z
  .object({
    name: z.string().optional(),
    countryCode: z.string().optional(),
    lattitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
  })
  .optional();

export type LocationInput = z.infer<typeof locationInput>;

export type NewsletterItemType = 'media' | 'text';

type NewsletterItemDetailsBase = {
  id: number;
  name: string;
  type: NewsletterItemType;
};

export type NewsletterItemDetailsMedia = NewsletterItemDetailsBase & {
  fileName: string;
  caption: string | null;
};

export const mediaItemDetails = z.object({
  type: z.literal('media'),
  name: z.string(),
  fileName: z.string(),
  caption: z.string().optional(),
});

export type NewsletterItemDetailsText = NewsletterItemDetailsBase & {
  description: string | null;
  link: string | null;
};

export const textItemDetails = z.object({
  type: z.literal('text'),
  name: z.string(),
  description: z.string().optional(),
  link: z.string().optional(),
});

export type NewsletterItemDetails =
  | NewsletterItemDetailsText
  | NewsletterItemDetailsMedia;

export const newsletterItemDetails = z
  .discriminatedUnion('type', [mediaItemDetails, textItemDetails])
  .optional();

export interface NewsletterItemBase {
  id: number;
  meta: Meta;
  location: Location | null;
  date: string | null;
  title: string;
  nextItemId: number | null;
  previousItemId: number | null;
  details?: NewsletterItemDetails;
}

export interface NewsletterItem extends NewsletterItemBase {
  children: NewsletterItemBase[];
}

export const getNewsletterItemInput = z.object({
  newsletterItemId: z.coerce.number(),
});

export const postNewsletterItemInput = z.object({
  newsletterId: z.coerce.number(),
  parentId: z.coerce.number().nullable(),
  nextItemId: z.coerce.number().nullable(),
  previousItemId: z.coerce.number().nullable(),
  title: z.string(),
  date: z.string().optional(),
  location: locationInput,
  details: newsletterItemDetails,
});

export const updateNewsletterItemInput = z
  .object({
    newsletterItemId: z.coerce.number(),
    title: z.string().optional(),
    date: z.string().optional().nullable(),
    // parentId: z.coerce.number().optional(),
    nextItemId: z.coerce.number().optional(),
    location: locationInput,
  })
  .refine((obj) => obj.date || obj.nextItemId || obj.title || obj.location);

export const deleteManyNewsletterItemsInput = z.object({
  newsletterItemIds: z.array(z.coerce.number()),
});

export const getItemUploadLinksInput = z.object({
  items: z.array(z.object({ id: z.string() })),
});

export type ItemUploadLink = {
  id: string;
  url: string;
  fileName: string;
};

export type GetItemUploadLinksResponse = ItemUploadLink[];

export type CreateNewsletterItemDetailsInput = z.infer<
  typeof newsletterItemDetails
>;

export type CreateNewsletterItemInput = z.infer<typeof postNewsletterItemInput>;
export type ReadNewsletterItemInput = z.infer<typeof getNewsletterItemInput>;
export type UpdateNewsletterItemInput = z.infer<
  typeof updateNewsletterItemInput
>;
export type DeleteManyNewsletterItemsInput = z.infer<
  typeof deleteManyNewsletterItemsInput
>;

export interface NewsletterProperties {
  name: string;
  dateRange: DateRange | null;
}

export interface NewsletterBase {
  id: number;
  meta: Meta;
  properties: NewsletterProperties;
  owner: UserBase;
}

export interface Newsletter extends NewsletterBase {
  members: UserBase[];
  items: NewsletterItemBase[];
}
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

type NewsletterTemplate = {
  // examples: 'album', 'review', 'experience', 'celebration', 'notable-mention',
  name: string;
};
