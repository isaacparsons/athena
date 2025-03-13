import { z } from 'zod';
export type Nullable<T> = T | null;
export declare enum MediaFormat {
    Image = "image",
    Video = "video",
    Audio = "audio"
}
export declare enum NewsletterItemTypeName {
    Media = "media",
    Text = "text",
    Container = "container"
}
export declare const getInput: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type GetInput = z.infer<typeof getInput>;
export declare const deleteInput: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type DeleteInput = z.infer<typeof deleteInput>;
export declare const deleteBatchInput: z.ZodObject<{
    ids: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    ids: number[];
}, {
    ids: number[];
}>;
export type DeleteBatchInput = z.infer<typeof deleteBatchInput>;
/**
 * User
 */
export declare const userBase: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    id: number;
    email: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export type UserBase = z.infer<typeof userBase>;
/**
 * Meta data
 */
export declare const meta: z.ZodObject<{
    creator: z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>;
    modifier: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>>;
    created: z.ZodString;
    modified: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    created: string;
    creator: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    };
    modified?: string | undefined;
    modifier?: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    } | undefined;
}, {
    created: string;
    creator: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    };
    modified?: string | undefined;
    modifier?: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    } | undefined;
}>;
export type Meta = z.infer<typeof meta>;
export declare const positionInput: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    longitude: number;
    latitude: number;
}, {
    longitude: number;
    latitude: number;
}>;
/**
 * Country
 */
export declare const country: z.ZodObject<{
    name: z.ZodString;
    position: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        longitude: number;
        latitude: number;
    }, {
        longitude: number;
        latitude: number;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    position: {
        longitude: number;
        latitude: number;
    };
}, {
    name: string;
    position: {
        longitude: number;
        latitude: number;
    };
}>;
export type Position = z.infer<typeof positionInput>;
/**
 * Date
 */
export declare const dateInput: z.ZodString;
export declare const dateRangeInput: z.ZodObject<{
    start: z.ZodOptional<z.ZodString>;
    end: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    start?: string | undefined;
    end?: string | undefined;
}, {
    start?: string | undefined;
    end?: string | undefined;
}>;
export type DateRange = z.infer<typeof dateRangeInput>;
/**
 * Location
 */
export declare const locationInput: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        longitude: number;
        latitude: number;
    }, {
        longitude: number;
        latitude: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    country?: string | undefined;
    name?: string | undefined;
    position?: {
        longitude: number;
        latitude: number;
    } | undefined;
}, {
    id: number;
    country?: string | undefined;
    name?: string | undefined;
    position?: {
        longitude: number;
        latitude: number;
    } | undefined;
}>;
export type LocationInput = z.infer<typeof locationInput>;
export declare const createLocation: z.ZodObject<Omit<{
    id: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        longitude: number;
        latitude: number;
    }, {
        longitude: number;
        latitude: number;
    }>>;
}, "id">, "strip", z.ZodTypeAny, {
    country?: string | undefined;
    name?: string | undefined;
    position?: {
        longitude: number;
        latitude: number;
    } | undefined;
}, {
    country?: string | undefined;
    name?: string | undefined;
    position?: {
        longitude: number;
        latitude: number;
    } | undefined;
}>;
export type CreateLocation = z.infer<typeof createLocation>;
export declare const updateLocation: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        longitude: number;
        latitude: number;
    }, {
        longitude: number;
        latitude: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    country?: string | undefined;
    name?: string | undefined;
    position?: {
        longitude: number;
        latitude: number;
    } | undefined;
}, {
    id: number;
    country?: string | undefined;
    name?: string | undefined;
    position?: {
        longitude: number;
        latitude: number;
    } | undefined;
}>;
export type UpdateLocation = z.infer<typeof updateLocation>;
export declare const itemDetailType: z.ZodUnion<[z.ZodLiteral<NewsletterItemTypeName.Media>, z.ZodLiteral<NewsletterItemTypeName.Text>, z.ZodLiteral<NewsletterItemTypeName.Container>]>;
export declare const baseItemDetails: z.ZodObject<{
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    newsletterItemId: number;
}, {
    id: number;
    name: string;
    newsletterItemId: number;
}>;
export type BaseItemDetails = z.infer<typeof baseItemDetails>;
export declare const mediaItemDetails: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Media;
    newsletterItemId: number;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Media;
    newsletterItemId: number;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}>;
export type MediaItemDetails = z.infer<typeof mediaItemDetails>;
export declare const textItemDetails: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Text;
    newsletterItemId: number;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Text;
    newsletterItemId: number;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>;
export type TextItemDetails = z.infer<typeof textItemDetails>;
export declare const containerItemDetails: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Container;
    newsletterItemId: number;
}, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Container;
    newsletterItemId: number;
}>;
export type ContainerItemDetails = z.infer<typeof containerItemDetails>;
export declare const newsletterItemDetails: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Media;
    newsletterItemId: number;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Media;
    newsletterItemId: number;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Text;
    newsletterItemId: number;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Text;
    newsletterItemId: number;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Container;
    newsletterItemId: number;
}, {
    id: number;
    name: string;
    type: NewsletterItemTypeName.Container;
    newsletterItemId: number;
}>]>;
export type NewsletterItemDetails<T extends NewsletterItemTypeName | undefined = undefined> = T extends NewsletterItemTypeName.Text ? TextItemDetails : T extends NewsletterItemTypeName.Media ? MediaItemDetails : T extends NewsletterItemTypeName.Container ? ContainerItemDetails : z.infer<typeof newsletterItemDetails>;
export declare const createNewsletterItemDetailsMedia: z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Media;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemTypeName.Media;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}>;
export declare const createNewsletterItemDetailsText: z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Text;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemTypeName.Text;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>;
export declare const createNewsletterItemDetailsContainer: z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Container;
}, {
    name: string;
    type: NewsletterItemTypeName.Container;
}>;
export type CreateNewsletterItemDetailsMedia = z.infer<typeof createNewsletterItemDetailsMedia>;
export type CreateNewsletterItemDetailsText = z.infer<typeof createNewsletterItemDetailsText>;
export type CreateNewsletterItemDetailsContainer = z.infer<typeof createNewsletterItemDetailsContainer>;
export declare const createNewsletterItemDetails: z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Media;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemTypeName.Media;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}>, z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Text;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemTypeName.Text;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>, z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Container;
}, {
    name: string;
    type: NewsletterItemTypeName.Container;
}>]>;
export type CreateNewsletterItemDetails<T extends NewsletterItemTypeName | undefined = undefined> = T extends NewsletterItemTypeName.Text ? CreateNewsletterItemDetailsText : T extends NewsletterItemTypeName.Media ? CreateNewsletterItemDetailsMedia : T extends NewsletterItemTypeName.Container ? CreateNewsletterItemDetailsContainer : z.infer<typeof createNewsletterItemDetails>;
export declare const updateNewsletterItemDetailsMedia: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "type">, {
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
    fileName: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodNativeEnum<typeof MediaFormat>>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}>, {
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
}>, Pick<{
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}, "id">>, "strip", z.ZodTypeAny, {
    id: number;
    type: NewsletterItemTypeName.Media;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
    fileName?: string | undefined;
    format?: MediaFormat | undefined;
    caption?: string | null | undefined;
}, {
    id: number;
    type: NewsletterItemTypeName.Media;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
    fileName?: string | undefined;
    format?: MediaFormat | undefined;
    caption?: string | null | undefined;
}>;
export declare const updateNewsletterItemDetailsText: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "type">, {
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}>, {
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
}>, Pick<{
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}, "id">>, "strip", z.ZodTypeAny, {
    id: number;
    type: NewsletterItemTypeName.Text;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    id: number;
    type: NewsletterItemTypeName.Text;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>;
export declare const updateNewsletterItemDetailsContainer: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "type">, {
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
}>, {
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
}>, Pick<{
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}, "id">>, "strip", z.ZodTypeAny, {
    id: number;
    type: NewsletterItemTypeName.Container;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
}, {
    id: number;
    type: NewsletterItemTypeName.Container;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
}>;
export type UpdateNewsletterItemDetailsMedia = z.infer<typeof updateNewsletterItemDetailsMedia>;
export type UpdateNewsletterItemDetailsText = z.infer<typeof updateNewsletterItemDetailsText>;
export type UpdateNewsletterItemDetailsContainer = z.infer<typeof updateNewsletterItemDetailsContainer>;
export declare const updateNewsletterItemDetails: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "type">, {
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
    fileName: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodNativeEnum<typeof MediaFormat>>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}>, {
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
}>, Pick<{
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}, "id">>, "strip", z.ZodTypeAny, {
    id: number;
    type: NewsletterItemTypeName.Media;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
    fileName?: string | undefined;
    format?: MediaFormat | undefined;
    caption?: string | null | undefined;
}, {
    id: number;
    type: NewsletterItemTypeName.Media;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
    fileName?: string | undefined;
    format?: MediaFormat | undefined;
    caption?: string | null | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "type">, {
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}>, {
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
}>, Pick<{
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}, "id">>, "strip", z.ZodTypeAny, {
    id: number;
    type: NewsletterItemTypeName.Text;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    id: number;
    type: NewsletterItemTypeName.Text;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "type">, {
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
}>, {
    name: z.ZodOptional<z.ZodString>;
    newsletterItemId: z.ZodOptional<z.ZodNumber>;
}>, Pick<{
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}, "id">>, "strip", z.ZodTypeAny, {
    id: number;
    type: NewsletterItemTypeName.Container;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
}, {
    id: number;
    type: NewsletterItemTypeName.Container;
    name?: string | undefined;
    newsletterItemId?: number | undefined;
}>]>;
export type UpdateNewsletterItemDetails<T extends NewsletterItemTypeName | undefined = undefined> = T extends NewsletterItemTypeName.Text ? UpdateNewsletterItemDetailsText : T extends NewsletterItemTypeName.Media ? UpdateNewsletterItemDetailsMedia : T extends NewsletterItemTypeName.Container ? UpdateNewsletterItemDetailsContainer : z.infer<typeof updateNewsletterItemDetails>;
export declare const nodePosition: z.ZodObject<{
    parentId: z.ZodNullable<z.ZodNumber>;
    nextId: z.ZodNullable<z.ZodNumber>;
    prevId: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    parentId: number | null;
    nextId: number | null;
    prevId: number | null;
}, {
    parentId: number | null;
    nextId: number | null;
    prevId: number | null;
}>;
export type NodePosition = z.infer<typeof nodePosition>;
export declare const newsletterItemBase: z.ZodObject<{
    id: z.ZodNumber;
    newsletterId: z.ZodNumber;
    position: z.ZodObject<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>;
    title: z.ZodString;
    date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            longitude: number;
            latitude: number;
        }, {
            longitude: number;
            latitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }>>;
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    newsletterId: number;
    title: string;
    details: {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    };
    location?: {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
}, {
    id: number;
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    newsletterId: number;
    title: string;
    details: {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    };
    location?: {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
}>;
export type NewsletterItemBase = z.infer<typeof newsletterItemBase>;
export declare const newsletterItem: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    newsletterId: z.ZodNumber;
    position: z.ZodObject<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>;
    title: z.ZodString;
    date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            longitude: number;
            latitude: number;
        }, {
            longitude: number;
            latitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }>>;
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }>]>;
}, {
    children: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        newsletterId: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        title: z.ZodString;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    id: number;
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    newsletterId: number;
    title: string;
    details: {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    };
    children: {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }[];
    location?: {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
}, {
    id: number;
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    newsletterId: number;
    title: string;
    details: {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    };
    children: {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }[];
    location?: {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
}>;
export type NewsletterItem<T extends NewsletterItemTypeName | undefined = undefined> = z.infer<typeof newsletterItem> & {
    details: NewsletterItemDetails<T>;
};
export declare const isMediaItem: (item: NewsletterItemBase) => item is NewsletterItem<NewsletterItemTypeName.Media>;
export declare const isTextItem: (item: NewsletterItemBase) => item is NewsletterItem<NewsletterItemTypeName.Text>;
export declare const isContainerItem: (item: NewsletterItemBase) => item is NewsletterItem<NewsletterItemTypeName.Container>;
export declare const createNewsletterItem: z.ZodObject<z.objectUtil.extendShape<Omit<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    newsletterId: z.ZodNumber;
    position: z.ZodObject<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>;
    title: z.ZodString;
    date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            longitude: number;
            latitude: number;
        }, {
            longitude: number;
            latitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }>>;
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }>]>;
}, {
    children: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        newsletterId: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        title: z.ZodString;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }>, "many">;
}>, "location" | "id" | "details" | "children">, {
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }>]>;
    location: z.ZodOptional<z.ZodObject<Omit<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            longitude: number;
            latitude: number;
        }, {
            longitude: number;
            latitude: number;
        }>>;
    }, "id">, "strip", z.ZodTypeAny, {
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }, {
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }>>;
}>, "strip", z.ZodTypeAny, {
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    newsletterId: number;
    title: string;
    details: {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Container;
    };
    location?: {
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
}, {
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    newsletterId: number;
    title: string;
    details: {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Container;
    };
    location?: {
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
}>;
export type CreateNewsletterItem<T extends NewsletterItemTypeName | undefined = undefined> = T extends NewsletterItemTypeName ? Omit<z.infer<typeof createNewsletterItem>, 'details'> & {
    details: CreateNewsletterItemDetails<T>;
} : z.infer<typeof createNewsletterItem>;
export declare const updateNewsletterItem: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    newsletterId: z.ZodNumber;
    position: z.ZodObject<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>;
    title: z.ZodString;
    date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            longitude: number;
            latitude: number;
        }, {
            longitude: number;
            latitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }>>;
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }>]>;
}, {
    children: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        newsletterId: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        title: z.ZodString;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }>, "many">;
}>, "id" | "newsletterId">, {
    location: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            longitude: number;
            latitude: number;
        }, {
            longitude: number;
            latitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }>>>;
    date: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    newsletterId: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
}>, {
    details: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "type">, {
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        newsletterItemId: z.ZodOptional<z.ZodNumber>;
        fileName: z.ZodOptional<z.ZodString>;
        format: z.ZodOptional<z.ZodNativeEnum<typeof MediaFormat>>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }>, {
        name: z.ZodOptional<z.ZodString>;
        newsletterItemId: z.ZodOptional<z.ZodNumber>;
    }>, Pick<{
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }, "id">>, "strip", z.ZodTypeAny, {
        id: number;
        type: NewsletterItemTypeName.Media;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
        fileName?: string | undefined;
        format?: MediaFormat | undefined;
        caption?: string | null | undefined;
    }, {
        id: number;
        type: NewsletterItemTypeName.Media;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
        fileName?: string | undefined;
        format?: MediaFormat | undefined;
        caption?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "type">, {
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        newsletterItemId: z.ZodOptional<z.ZodNumber>;
        description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }>, {
        name: z.ZodOptional<z.ZodString>;
        newsletterItemId: z.ZodOptional<z.ZodNumber>;
    }>, Pick<{
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }, "id">>, "strip", z.ZodTypeAny, {
        id: number;
        type: NewsletterItemTypeName.Text;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        id: number;
        type: NewsletterItemTypeName.Text;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "type">, {
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        newsletterItemId: z.ZodOptional<z.ZodNumber>;
    }>, {
        name: z.ZodOptional<z.ZodString>;
        newsletterItemId: z.ZodOptional<z.ZodNumber>;
    }>, Pick<{
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }, "id">>, "strip", z.ZodTypeAny, {
        id: number;
        type: NewsletterItemTypeName.Container;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
    }, {
        id: number;
        type: NewsletterItemTypeName.Container;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
    }>]>>;
}>, {
    childPositions: z.ZodOptional<z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, {
        id: z.ZodNumber;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        id: number;
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>, "many">>;
}>, "strip", z.ZodTypeAny, {
    id: number;
    location?: {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
    newsletterId?: number | undefined;
    title?: string | undefined;
    details?: {
        id: number;
        type: NewsletterItemTypeName.Media;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
        fileName?: string | undefined;
        format?: MediaFormat | undefined;
        caption?: string | null | undefined;
    } | {
        id: number;
        type: NewsletterItemTypeName.Text;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        id: number;
        type: NewsletterItemTypeName.Container;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
    } | undefined;
    childPositions?: {
        id: number;
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }[] | undefined;
}, {
    id: number;
    location?: {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
    newsletterId?: number | undefined;
    title?: string | undefined;
    details?: {
        id: number;
        type: NewsletterItemTypeName.Media;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
        fileName?: string | undefined;
        format?: MediaFormat | undefined;
        caption?: string | null | undefined;
    } | {
        id: number;
        type: NewsletterItemTypeName.Text;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        id: number;
        type: NewsletterItemTypeName.Container;
        name?: string | undefined;
        newsletterItemId?: number | undefined;
    } | undefined;
    childPositions?: {
        id: number;
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }[] | undefined;
}>;
export type UpdateNewsletterItem = z.infer<typeof updateNewsletterItem>;
export declare const tempNewsletterItemIds: z.ZodObject<{
    id: z.ZodString;
    parentId: z.ZodNullable<z.ZodString>;
    nextId: z.ZodNullable<z.ZodString>;
    prevId: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    parentId: string | null;
    nextId: string | null;
    prevId: string | null;
}, {
    id: string;
    parentId: string | null;
    nextId: string | null;
    prevId: string | null;
}>;
export type TempNewsletterItemIds = z.infer<typeof tempNewsletterItemIds>;
export declare const createNewsletterItemsBatchItem: z.ZodObject<z.objectUtil.extendShape<Omit<z.objectUtil.extendShape<Omit<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    newsletterId: z.ZodNumber;
    position: z.ZodObject<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>;
    title: z.ZodString;
    date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            longitude: number;
            latitude: number;
        }, {
            longitude: number;
            latitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }, {
        id: number;
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }>>;
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Media;
        newsletterItemId: number;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Text;
        newsletterItemId: number;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }, {
        id: number;
        name: string;
        type: NewsletterItemTypeName.Container;
        newsletterItemId: number;
    }>]>;
}, {
    children: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        newsletterId: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        title: z.ZodString;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }>, "many">;
}>, "location" | "id" | "details" | "children">, {
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }>]>;
    location: z.ZodOptional<z.ZodObject<Omit<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            longitude: number;
            latitude: number;
        }, {
            longitude: number;
            latitude: number;
        }>>;
    }, "id">, "strip", z.ZodTypeAny, {
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }, {
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    }>>;
}>, "position">, {
    temp: z.ZodObject<{
        id: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
        nextId: z.ZodNullable<z.ZodString>;
        prevId: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    }, {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    }>;
}>, "strip", z.ZodTypeAny, {
    newsletterId: number;
    title: string;
    details: {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Container;
    };
    temp: {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    };
    location?: {
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
}, {
    newsletterId: number;
    title: string;
    details: {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Container;
    };
    temp: {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    };
    location?: {
        country?: string | undefined;
        name?: string | undefined;
        position?: {
            longitude: number;
            latitude: number;
        } | undefined;
    } | undefined;
    date?: string | null | undefined;
}>;
export type CreateNewsletterItemBatchItem<T extends NewsletterItemTypeName | undefined = undefined> = T extends NewsletterItemTypeName ? Omit<z.infer<typeof createNewsletterItemsBatchItem>, 'details'> & {
    details: CreateNewsletterItemDetails<T>;
} : z.infer<typeof createNewsletterItemsBatchItem>;
export declare const createNewsletterItemsBatch: z.ZodObject<{
    newsletterId: z.ZodNumber;
    position: z.ZodObject<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>;
    batch: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<Omit<z.objectUtil.extendShape<Omit<z.objectUtil.extendShape<{
        id: z.ZodNumber;
        newsletterId: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        title: z.ZodString;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }>]>;
    }, {
        children: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            newsletterId: z.ZodNumber;
            position: z.ZodObject<{
                parentId: z.ZodNullable<z.ZodNumber>;
                nextId: z.ZodNullable<z.ZodNumber>;
                prevId: z.ZodNullable<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            }, {
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            }>;
            title: z.ZodString;
            date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            location: z.ZodOptional<z.ZodObject<{
                id: z.ZodNumber;
                name: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                position: z.ZodOptional<z.ZodObject<{
                    latitude: z.ZodNumber;
                    longitude: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    longitude: number;
                    latitude: number;
                }, {
                    longitude: number;
                    latitude: number;
                }>>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                country?: string | undefined;
                name?: string | undefined;
                position?: {
                    longitude: number;
                    latitude: number;
                } | undefined;
            }, {
                id: number;
                country?: string | undefined;
                name?: string | undefined;
                position?: {
                    longitude: number;
                    latitude: number;
                } | undefined;
            }>>;
            details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
                type: z.ZodLiteral<NewsletterItemTypeName.Media>;
                fileName: z.ZodString;
                format: z.ZodNativeEnum<typeof MediaFormat>;
                caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, {
                id: z.ZodNumber;
                newsletterItemId: z.ZodNumber;
                name: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Media;
                newsletterItemId: number;
                fileName: string;
                format: MediaFormat;
                caption?: string | null | undefined;
            }, {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Media;
                newsletterItemId: number;
                fileName: string;
                format: MediaFormat;
                caption?: string | null | undefined;
            }>, z.ZodObject<z.objectUtil.extendShape<{
                type: z.ZodLiteral<NewsletterItemTypeName.Text>;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, {
                id: z.ZodNumber;
                newsletterItemId: z.ZodNumber;
                name: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Text;
                newsletterItemId: number;
                description?: string | null | undefined;
                link?: string | null | undefined;
            }, {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Text;
                newsletterItemId: number;
                description?: string | null | undefined;
                link?: string | null | undefined;
            }>, z.ZodObject<z.objectUtil.extendShape<{
                type: z.ZodLiteral<NewsletterItemTypeName.Container>;
            }, {
                id: z.ZodNumber;
                newsletterItemId: z.ZodNumber;
                name: z.ZodString;
            }>, "strip", z.ZodTypeAny, {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Container;
                newsletterItemId: number;
            }, {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Container;
                newsletterItemId: number;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            position: {
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            };
            newsletterId: number;
            title: string;
            details: {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Media;
                newsletterItemId: number;
                fileName: string;
                format: MediaFormat;
                caption?: string | null | undefined;
            } | {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Text;
                newsletterItemId: number;
                description?: string | null | undefined;
                link?: string | null | undefined;
            } | {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Container;
                newsletterItemId: number;
            };
            location?: {
                id: number;
                country?: string | undefined;
                name?: string | undefined;
                position?: {
                    longitude: number;
                    latitude: number;
                } | undefined;
            } | undefined;
            date?: string | null | undefined;
        }, {
            id: number;
            position: {
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            };
            newsletterId: number;
            title: string;
            details: {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Media;
                newsletterItemId: number;
                fileName: string;
                format: MediaFormat;
                caption?: string | null | undefined;
            } | {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Text;
                newsletterItemId: number;
                description?: string | null | undefined;
                link?: string | null | undefined;
            } | {
                id: number;
                name: string;
                type: NewsletterItemTypeName.Container;
                newsletterItemId: number;
            };
            location?: {
                id: number;
                country?: string | undefined;
                name?: string | undefined;
                position?: {
                    longitude: number;
                    latitude: number;
                } | undefined;
            } | undefined;
            date?: string | null | undefined;
        }>, "many">;
    }>, "location" | "id" | "details" | "children">, {
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }>]>;
        location: z.ZodOptional<z.ZodObject<Omit<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "id">, "strip", z.ZodTypeAny, {
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
    }>, "position">, {
        temp: z.ZodObject<{
            id: z.ZodString;
            parentId: z.ZodNullable<z.ZodString>;
            nextId: z.ZodNullable<z.ZodString>;
            prevId: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        }, {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        }>;
    }>, "strip", z.ZodTypeAny, {
        newsletterId: number;
        title: string;
        details: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        };
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        location?: {
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }, {
        newsletterId: number;
        title: string;
        details: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        };
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        location?: {
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    newsletterId: number;
    batch: {
        newsletterId: number;
        title: string;
        details: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        };
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        location?: {
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }[];
}, {
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    newsletterId: number;
    batch: {
        newsletterId: number;
        title: string;
        details: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        };
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        location?: {
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }[];
}>;
export type CreateNewsletterItemsBatch = z.infer<typeof createNewsletterItemsBatch>;
export declare const getItemUploadLinks: z.ZodObject<{
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
export type GetItemUploadLinks = z.infer<typeof getItemUploadLinks>;
export type GetItemUploadLinksResponse = ItemUploadLink[];
export type ItemUploadLink = {
    id: string;
    url: string;
    fileName: string;
};
/**
 * Newsletter
 */
export declare const newsletterProperties: z.ZodObject<{
    name: z.ZodString;
    dateRange: z.ZodObject<{
        start: z.ZodOptional<z.ZodString>;
        end: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        start?: string | undefined;
        end?: string | undefined;
    }, {
        start?: string | undefined;
        end?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    dateRange: {
        start?: string | undefined;
        end?: string | undefined;
    };
}, {
    name: string;
    dateRange: {
        start?: string | undefined;
        end?: string | undefined;
    };
}>;
export type NewsletterProperties = z.infer<typeof newsletterProperties>;
export declare const newsletterBase: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
}, {
    properties: z.ZodObject<{
        name: z.ZodString;
        dateRange: z.ZodObject<{
            start: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            start?: string | undefined;
            end?: string | undefined;
        }, {
            start?: string | undefined;
            end?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    }, {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    }>;
    owner: z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>;
    meta: z.ZodObject<{
        creator: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>;
        modifier: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>>;
        created: z.ZodString;
        modified: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }>;
}>, "strip", z.ZodTypeAny, {
    id: number;
    properties: {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    };
    owner: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    };
    meta: {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    };
}, {
    id: number;
    properties: {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    };
    owner: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    };
    meta: {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    };
}>;
export type NewsletterBase = z.infer<typeof newsletterBase>;
export declare const newsletter: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    id: z.ZodNumber;
}, {
    properties: z.ZodObject<{
        name: z.ZodString;
        dateRange: z.ZodObject<{
            start: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            start?: string | undefined;
            end?: string | undefined;
        }, {
            start?: string | undefined;
            end?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    }, {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    }>;
    owner: z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>;
    meta: z.ZodObject<{
        creator: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>;
        modifier: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>>;
        created: z.ZodString;
        modified: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }>;
}>, {
    members: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        newsletterId: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        title: z.ZodString;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    id: number;
    items: {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }[];
    properties: {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    };
    owner: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    };
    meta: {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    };
    members: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }[];
}, {
    id: number;
    items: {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }[];
    properties: {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    };
    owner: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    };
    meta: {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    };
    members: {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }[];
}>;
export type Newsletter = z.infer<typeof newsletter>;
export declare const createNewsletter: z.ZodObject<Omit<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    id: z.ZodNumber;
}, {
    properties: z.ZodObject<{
        name: z.ZodString;
        dateRange: z.ZodObject<{
            start: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            start?: string | undefined;
            end?: string | undefined;
        }, {
            start?: string | undefined;
            end?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    }, {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    }>;
    owner: z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>;
    meta: z.ZodObject<{
        creator: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>;
        modifier: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>>;
        created: z.ZodString;
        modified: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }>;
}>, {
    members: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        newsletterId: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        title: z.ZodString;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }>, "many">;
}>, "id" | "items" | "owner" | "meta" | "members">, "strip", z.ZodTypeAny, {
    properties: {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    };
}, {
    properties: {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    };
}>;
export type CreateNewsletter = z.infer<typeof createNewsletter>;
export declare const updateNewsletter: z.ZodObject<z.objectUtil.extendShape<Pick<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    id: z.ZodNumber;
}, {
    properties: z.ZodObject<{
        name: z.ZodString;
        dateRange: z.ZodObject<{
            start: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            start?: string | undefined;
            end?: string | undefined;
        }, {
            start?: string | undefined;
            end?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    }, {
        name: string;
        dateRange: {
            start?: string | undefined;
            end?: string | undefined;
        };
    }>;
    owner: z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>;
    meta: z.ZodObject<{
        creator: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>;
        modifier: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>>;
        created: z.ZodString;
        modified: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }>;
}>, {
    members: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        id: number;
        email: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        newsletterId: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        title: z.ZodString;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            position: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                longitude: number;
                latitude: number;
            }, {
                longitude: number;
                latitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }, {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        }>>;
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }, {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        newsletterId: number;
        title: string;
        details: {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Media;
            newsletterItemId: number;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Text;
            newsletterItemId: number;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            id: number;
            name: string;
            type: NewsletterItemTypeName.Container;
            newsletterItemId: number;
        };
        location?: {
            id: number;
            country?: string | undefined;
            name?: string | undefined;
            position?: {
                longitude: number;
                latitude: number;
            } | undefined;
        } | undefined;
        date?: string | null | undefined;
    }>, "many">;
}>, "id">, {
    properties: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        dateRange: z.ZodOptional<z.ZodObject<{
            start: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            start?: string | undefined;
            end?: string | undefined;
        }, {
            start?: string | undefined;
            end?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        dateRange?: {
            start?: string | undefined;
            end?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        dateRange?: {
            start?: string | undefined;
            end?: string | undefined;
        } | undefined;
    }>;
}>, "strip", z.ZodTypeAny, {
    id: number;
    properties: {
        name?: string | undefined;
        dateRange?: {
            start?: string | undefined;
            end?: string | undefined;
        } | undefined;
    };
}, {
    id: number;
    properties: {
        name?: string | undefined;
        dateRange?: {
            start?: string | undefined;
            end?: string | undefined;
        } | undefined;
    };
}>;
export type UpdateNewsletter = z.infer<typeof updateNewsletter>;
/**
 * Newsletter item template
 */
declare const newsletterItemTemplateDataDetails: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Media;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemTypeName.Media;
    fileName: string;
    format: MediaFormat;
    caption?: string | null | undefined;
}>, z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Text;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemTypeName.Text;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>, z.ZodObject<Omit<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
}, {
    id: z.ZodNumber;
    newsletterItemId: z.ZodNumber;
    name: z.ZodString;
}>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Container;
}, {
    name: string;
    type: NewsletterItemTypeName.Container;
}>]>>;
export type NewsletterItemTemplateDataDetails<T extends NewsletterItemTypeName | undefined = undefined> = T extends NewsletterItemTypeName.Text ? CreateNewsletterItemDetailsText : T extends NewsletterItemTypeName.Media ? CreateNewsletterItemDetailsMedia : T extends NewsletterItemTypeName.Container ? CreateNewsletterItemDetailsContainer : z.infer<typeof newsletterItemTemplateDataDetails>;
export declare const newsletterItemTemplateData: z.ZodObject<{
    id: z.ZodNumber;
    position: z.ZodObject<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>;
    templateId: z.ZodOptional<z.ZodNumber>;
    data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    templateId?: number | undefined;
    data?: {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Container;
    } | undefined;
}, {
    id: number;
    position: {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    };
    templateId?: number | undefined;
    data?: {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Container;
    } | undefined;
}>;
export type NewsletterItemTemplateData = z.infer<typeof newsletterItemTemplateData>;
export declare const createNewsletterItemTemplateData: z.ZodObject<z.objectUtil.extendShape<Omit<{
    id: z.ZodNumber;
    position: z.ZodObject<{
        parentId: z.ZodNullable<z.ZodNumber>;
        nextId: z.ZodNullable<z.ZodNumber>;
        prevId: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }, {
        parentId: number | null;
        nextId: number | null;
        prevId: number | null;
    }>;
    templateId: z.ZodOptional<z.ZodNumber>;
    data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    }, {
        id: z.ZodNumber;
        newsletterItemId: z.ZodNumber;
        name: z.ZodString;
    }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }>]>>;
}, "id" | "position">, {
    temp: z.ZodObject<{
        id: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
        nextId: z.ZodNullable<z.ZodString>;
        prevId: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    }, {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    }>;
}>, "strip", z.ZodTypeAny, {
    temp: {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    };
    templateId?: number | undefined;
    data?: {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Container;
    } | undefined;
}, {
    temp: {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    };
    templateId?: number | undefined;
    data?: {
        name: string;
        type: NewsletterItemTypeName.Media;
        fileName: string;
        format: MediaFormat;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemTypeName.Container;
    } | undefined;
}>;
export declare const newsletterItemTemplateBase: z.ZodObject<{
    id: z.ZodNumber;
    meta: z.ZodObject<{
        creator: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>;
        modifier: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>>;
        created: z.ZodString;
        modified: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }>;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    meta: {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    };
}, {
    id: number;
    name: string;
    meta: {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    };
}>;
export type NewsletterItemTemplateBase = z.infer<typeof newsletterItemTemplateBase>;
export declare const newsletterItemTemplate: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    meta: z.ZodObject<{
        creator: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>;
        modifier: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>>;
        created: z.ZodString;
        modified: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }>;
    name: z.ZodString;
}, {
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        templateId: z.ZodOptional<z.ZodNumber>;
        data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }>, "many">;
    templates: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        meta: z.ZodObject<{
            creator: z.ZodObject<{
                id: z.ZodNumber;
                email: z.ZodString;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>;
            modifier: z.ZodOptional<z.ZodObject<{
                id: z.ZodNumber;
                email: z.ZodString;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>>;
            created: z.ZodString;
            modified: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        }, {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }, {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    items: {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }[];
    meta: {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    };
    templates: {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }[];
}, {
    id: number;
    name: string;
    items: {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }[];
    meta: {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    };
    templates: {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }[];
}>;
export type NewsletterItemTemplate = z.infer<typeof newsletterItemTemplate>;
export declare const createNewsletterItemTemplate: z.ZodObject<z.objectUtil.extendShape<Omit<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    meta: z.ZodObject<{
        creator: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>;
        modifier: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>>;
        created: z.ZodString;
        modified: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }, {
        created: string;
        creator: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        modified?: string | undefined;
        modifier?: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        } | undefined;
    }>;
    name: z.ZodString;
}, {
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        templateId: z.ZodOptional<z.ZodNumber>;
        data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }, {
        id: number;
        position: {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }>, "many">;
    templates: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        meta: z.ZodObject<{
            creator: z.ZodObject<{
                id: z.ZodNumber;
                email: z.ZodString;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>;
            modifier: z.ZodOptional<z.ZodObject<{
                id: z.ZodNumber;
                email: z.ZodString;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>>;
            created: z.ZodString;
            modified: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        }, {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }, {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }>, "many">;
}>, "id" | "items" | "meta" | "templates">, {
    data: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<Omit<{
        id: z.ZodNumber;
        position: z.ZodObject<{
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }, {
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
        }>;
        templateId: z.ZodOptional<z.ZodNumber>;
        data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<Omit<z.objectUtil.extendShape<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        }, {
            id: z.ZodNumber;
            newsletterItemId: z.ZodNumber;
            name: z.ZodString;
        }>, "id" | "newsletterItemId">, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }>]>>;
    }, "id" | "position">, {
        temp: z.ZodObject<{
            id: z.ZodString;
            parentId: z.ZodNullable<z.ZodString>;
            nextId: z.ZodNullable<z.ZodString>;
            prevId: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        }, {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        }>;
    }>, "strip", z.ZodTypeAny, {
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }, {
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    name: string;
    data: {
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }[];
}, {
    name: string;
    data: {
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        templateId?: number | undefined;
        data?: {
            name: string;
            type: NewsletterItemTypeName.Media;
            fileName: string;
            format: MediaFormat;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemTypeName.Container;
        } | undefined;
    }[];
}>;
export type CreateNewsletterItemTemplate = z.infer<typeof createNewsletterItemTemplate>;
/**
 * User
 */
export declare const user: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    email: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, {
    newsletters: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        id: z.ZodNumber;
    }, {
        properties: z.ZodObject<{
            name: z.ZodString;
            dateRange: z.ZodObject<{
                start: z.ZodOptional<z.ZodString>;
                end: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                start?: string | undefined;
                end?: string | undefined;
            }, {
                start?: string | undefined;
                end?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            dateRange: {
                start?: string | undefined;
                end?: string | undefined;
            };
        }, {
            name: string;
            dateRange: {
                start?: string | undefined;
                end?: string | undefined;
            };
        }>;
        owner: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>;
        meta: z.ZodObject<{
            creator: z.ZodObject<{
                id: z.ZodNumber;
                email: z.ZodString;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>;
            modifier: z.ZodOptional<z.ZodObject<{
                id: z.ZodNumber;
                email: z.ZodString;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>>;
            created: z.ZodString;
            modified: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        }, {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        }>;
    }>, "strip", z.ZodTypeAny, {
        id: number;
        properties: {
            name: string;
            dateRange: {
                start?: string | undefined;
                end?: string | undefined;
            };
        };
        owner: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }, {
        id: number;
        properties: {
            name: string;
            dateRange: {
                start?: string | undefined;
                end?: string | undefined;
            };
        };
        owner: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }>, "many">;
    newsletterItemTemplates: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        meta: z.ZodObject<{
            creator: z.ZodObject<{
                id: z.ZodNumber;
                email: z.ZodString;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>;
            modifier: z.ZodOptional<z.ZodObject<{
                id: z.ZodNumber;
                email: z.ZodString;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>>;
            created: z.ZodString;
            modified: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        }, {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }, {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    newsletters: {
        id: number;
        properties: {
            name: string;
            dateRange: {
                start?: string | undefined;
                end?: string | undefined;
            };
        };
        owner: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }[];
    newsletterItemTemplates: {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }[];
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    id: number;
    email: string;
    newsletters: {
        id: number;
        properties: {
            name: string;
            dateRange: {
                start?: string | undefined;
                end?: string | undefined;
            };
        };
        owner: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }[];
    newsletterItemTemplates: {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }[];
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export type User = z.infer<typeof user>;
export interface UserSession {
    email: string;
    userId: number;
    accessToken: string;
    refreshToken: string;
}
/**
 * Helpers
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export {};
