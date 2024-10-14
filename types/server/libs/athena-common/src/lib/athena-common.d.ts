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
export declare const locationInput: z.ZodOptional<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    countryCode: z.ZodOptional<z.ZodString>;
    lattitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    longitude?: number | undefined;
    lattitude?: number | undefined;
    countryCode?: string | undefined;
}, {
    name?: string | undefined;
    longitude?: number | undefined;
    lattitude?: number | undefined;
    countryCode?: string | undefined;
}>>;
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
export declare const mediaItemDetails: z.ZodObject<{
    type: z.ZodLiteral<"media">;
    name: z.ZodString;
    fileName: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    fileName: string;
    type: "media";
    caption?: string | undefined;
}, {
    name: string;
    fileName: string;
    type: "media";
    caption?: string | undefined;
}>;
export type NewsletterItemDetailsText = NewsletterItemDetailsBase & {
    description: string | null;
    link: string | null;
};
export declare const textItemDetails: z.ZodObject<{
    type: z.ZodLiteral<"text">;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    link: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    description?: string | undefined;
    link?: string | undefined;
}, {
    name: string;
    type: "text";
    description?: string | undefined;
    link?: string | undefined;
}>;
export type NewsletterItemDetails = NewsletterItemDetailsText | NewsletterItemDetailsMedia;
export declare const newsletterItemDetails: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"media">;
    name: z.ZodString;
    fileName: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    fileName: string;
    type: "media";
    caption?: string | undefined;
}, {
    name: string;
    fileName: string;
    type: "media";
    caption?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"text">;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    link: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    description?: string | undefined;
    link?: string | undefined;
}, {
    name: string;
    type: "text";
    description?: string | undefined;
    link?: string | undefined;
}>]>>;
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
export declare const getNewsletterItemInput: z.ZodObject<{
    newsletterItemId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newsletterItemId: number;
}, {
    newsletterItemId: number;
}>;
export declare const postNewsletterItemInput: z.ZodObject<{
    newsletterId: z.ZodNumber;
    parentId: z.ZodNullable<z.ZodNumber>;
    nextItemId: z.ZodNullable<z.ZodNumber>;
    previousItemId: z.ZodNullable<z.ZodNumber>;
    title: z.ZodString;
    date: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        countryCode: z.ZodOptional<z.ZodString>;
        lattitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    }, {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    }>>;
    details: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"media">;
        name: z.ZodString;
        fileName: z.ZodString;
        caption: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        fileName: string;
        type: "media";
        caption?: string | undefined;
    }, {
        name: string;
        fileName: string;
        type: "media";
        caption?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"text">;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "text";
        description?: string | undefined;
        link?: string | undefined;
    }, {
        name: string;
        type: "text";
        description?: string | undefined;
        link?: string | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    newsletterId: number;
    title: string;
    parentId: number | null;
    nextItemId: number | null;
    previousItemId: number | null;
    date?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        fileName: string;
        type: "media";
        caption?: string | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | undefined;
        link?: string | undefined;
    } | undefined;
}, {
    newsletterId: number;
    title: string;
    parentId: number | null;
    nextItemId: number | null;
    previousItemId: number | null;
    date?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        fileName: string;
        type: "media";
        caption?: string | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | undefined;
        link?: string | undefined;
    } | undefined;
}>;
export declare const updateNewsletterItemInput: z.ZodEffects<z.ZodObject<{
    newsletterItemId: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    date: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    nextItemId: z.ZodOptional<z.ZodNumber>;
    location: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        countryCode: z.ZodOptional<z.ZodString>;
        lattitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    }, {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    newsletterItemId: number;
    title?: string | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
}, {
    newsletterItemId: number;
    title?: string | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
}>, {
    newsletterItemId: number;
    title?: string | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
}, {
    newsletterItemId: number;
    title?: string | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
}>;
export declare const deleteManyNewsletterItemsInput: z.ZodObject<{
    newsletterItemIds: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    newsletterItemIds: number[];
}, {
    newsletterItemIds: number[];
}>;
export declare const getItemUploadLinksInput: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        id: string;
    }[];
}, {
    items: {
        id: string;
    }[];
}>;
export type ItemUploadLink = {
    id: string;
    url: string;
    fileName: string;
};
export type GetItemUploadLinksResponse = ItemUploadLink[];
export type CreateNewsletterItemDetailsInput = z.infer<typeof newsletterItemDetails>;
export type CreateNewsletterItemInput = z.infer<typeof postNewsletterItemInput>;
export type ReadNewsletterItemInput = z.infer<typeof getNewsletterItemInput>;
export type UpdateNewsletterItemInput = z.infer<typeof updateNewsletterItemInput>;
export type DeleteManyNewsletterItemsInput = z.infer<typeof deleteManyNewsletterItemsInput>;
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
export declare const getNewsletterInput: z.ZodObject<{
    newsletterId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newsletterId: number;
}, {
    newsletterId: number;
}>;
export declare const postNewsletterInput: z.ZodObject<{
    name: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    startDate: string;
    endDate?: string | undefined;
}, {
    name: string;
    startDate: string;
    endDate?: string | undefined;
}>;
export declare const updateNewsletterInput: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
    startDate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    endDate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name?: string | undefined;
    startDate?: string | null | undefined;
    endDate?: string | null | undefined;
}, {
    id: number;
    name?: string | undefined;
    startDate?: string | null | undefined;
    endDate?: string | null | undefined;
}>;
export declare const deleteNewsletterInput: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type CreateNewsletterInput = z.infer<typeof postNewsletterInput>;
export type ReadNewsletterInput = z.infer<typeof getNewsletterInput>;
export type UpdateNewsletterInput = z.infer<typeof updateNewsletterInput>;
export type DeleteNewsletterInput = z.infer<typeof deleteNewsletterInput>;
export {};
