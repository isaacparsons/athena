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
export declare enum NewsletterItemType {
    media = "media",
    text = "text"
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
export type NewsletterItemDetails = NewsletterItemDetailsText | NewsletterItemDetailsMedia;
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
export declare const mediaItemDetails: z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemType.media>;
    name: z.ZodString;
    fileName: z.ZodString;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemType.media;
    fileName: string;
    caption?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemType.media;
    fileName: string;
    caption?: string | null | undefined;
}>;
export declare const textItemDetails: z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemType.text>;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemType.text;
    link?: string | null | undefined;
    description?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemType.text;
    link?: string | null | undefined;
    description?: string | null | undefined;
}>;
export type CreateMediaItemDetailsInput = z.infer<typeof mediaItemDetails>;
export type CreateTextItemDetailsInput = z.infer<typeof textItemDetails>;
export declare const newsletterItemDetails: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemType.media>;
    name: z.ZodString;
    fileName: z.ZodString;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemType.media;
    fileName: string;
    caption?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemType.media;
    fileName: string;
    caption?: string | null | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemType.text>;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemType.text;
    link?: string | null | undefined;
    description?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemType.text;
    link?: string | null | undefined;
    description?: string | null | undefined;
}>]>>;
export declare const getNewsletterItemInput: z.ZodObject<{
    newsletterItemId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newsletterItemId: number;
}, {
    newsletterItemId: number;
}>;
export declare const postNewsletterItemInputBase: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | undefined;
}, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | undefined;
}>;
export declare const postNewsletterItemInput: z.ZodObject<z.objectUtil.extendShape<{
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
}, {
    details: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemType.media>;
        name: z.ZodString;
        fileName: z.ZodString;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemType.text>;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    }>]>>;
}>, "strip", z.ZodTypeAny, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | undefined;
    details?: {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    } | undefined;
}, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | undefined;
    details?: {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    } | undefined;
}>;
export declare const postNewsletterItemBatchInput: z.ZodObject<{
    newsletterId: z.ZodNumber;
    parentId: z.ZodNullable<z.ZodNumber>;
    nextItemId: z.ZodNullable<z.ZodNumber>;
    previousItemId: z.ZodNullable<z.ZodNumber>;
    batch: z.ZodArray<z.ZodObject<{
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
        temp: z.ZodObject<{
            id: z.ZodNumber;
            parentId: z.ZodNullable<z.ZodNumber>;
            nextItemId: z.ZodNullable<z.ZodNumber>;
            previousItemId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            parentId: number | null;
            nextItemId: number | null;
            previousItemId: number | null;
        }, {
            id: number;
            parentId: number | null;
            nextItemId: number | null;
            previousItemId: number | null;
        }>;
        details: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<NewsletterItemType.media>;
            name: z.ZodString;
            fileName: z.ZodString;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemType.media;
            fileName: string;
            caption?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemType.media;
            fileName: string;
            caption?: string | null | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<NewsletterItemType.text>;
            name: z.ZodString;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemType.text;
            link?: string | null | undefined;
            description?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemType.text;
            link?: string | null | undefined;
            description?: string | null | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        temp: {
            id: number;
            parentId: number | null;
            nextItemId: number | null;
            previousItemId: number | null;
        };
        location?: {
            name?: string | undefined;
            longitude?: number | undefined;
            lattitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        date?: string | undefined;
        details?: {
            name: string;
            type: NewsletterItemType.media;
            fileName: string;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemType.text;
            link?: string | null | undefined;
            description?: string | null | undefined;
        } | undefined;
    }, {
        title: string;
        temp: {
            id: number;
            parentId: number | null;
            nextItemId: number | null;
            previousItemId: number | null;
        };
        location?: {
            name?: string | undefined;
            longitude?: number | undefined;
            lattitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        date?: string | undefined;
        details?: {
            name: string;
            type: NewsletterItemType.media;
            fileName: string;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemType.text;
            link?: string | null | undefined;
            description?: string | null | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    batch: {
        title: string;
        temp: {
            id: number;
            parentId: number | null;
            nextItemId: number | null;
            previousItemId: number | null;
        };
        location?: {
            name?: string | undefined;
            longitude?: number | undefined;
            lattitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        date?: string | undefined;
        details?: {
            name: string;
            type: NewsletterItemType.media;
            fileName: string;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemType.text;
            link?: string | null | undefined;
            description?: string | null | undefined;
        } | undefined;
    }[];
}, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    batch: {
        title: string;
        temp: {
            id: number;
            parentId: number | null;
            nextItemId: number | null;
            previousItemId: number | null;
        };
        location?: {
            name?: string | undefined;
            longitude?: number | undefined;
            lattitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        date?: string | undefined;
        details?: {
            name: string;
            type: NewsletterItemType.media;
            fileName: string;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: NewsletterItemType.text;
            link?: string | null | undefined;
            description?: string | null | undefined;
        } | undefined;
    }[];
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
    details: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemType.media>;
        name: z.ZodString;
        fileName: z.ZodString;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemType.text>;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    newsletterItemId: number;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
    details?: {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    } | undefined;
}, {
    newsletterItemId: number;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
    details?: {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    } | undefined;
}>, {
    newsletterItemId: number;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
    details?: {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
    } | undefined;
}, {
    newsletterItemId: number;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
    details?: {
        name: string;
        type: NewsletterItemType.media;
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: NewsletterItemType.text;
        link?: string | null | undefined;
        description?: string | null | undefined;
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
export type GetItemUploadLinksResponse = ItemUploadLink[];
export type CreateNewsletterItemDetailsInput = z.infer<typeof newsletterItemDetails>;
export type CreateNewsletterItemInput = z.infer<typeof postNewsletterItemInput>;
export type CreateNewsletterItemBatchInput = z.infer<typeof postNewsletterItemBatchInput>;
export type ReadNewsletterItemInput = z.infer<typeof getNewsletterItemInput>;
export type UpdateNewsletterItemInput = z.infer<typeof updateNewsletterItemInput>;
export type DeleteManyNewsletterItemsInput = z.infer<typeof deleteManyNewsletterItemsInput>;
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
/** Newsletter item templates
 *
 * examples: 'album', 'review', 'experience', 'celebration', 'notable-mention',
 */
declare const newsletterItemTemplateDataDetails: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<Pick<{
    type: z.ZodLiteral<NewsletterItemType.media>;
    name: z.ZodString;
    fileName: z.ZodString;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "type">, {
    name: z.ZodOptional<z.ZodString>;
    fileName: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}>, "strip", z.ZodTypeAny, {
    type: NewsletterItemType.media;
    name?: string | undefined;
    fileName?: string | undefined;
    caption?: string | null | undefined;
}, {
    type: NewsletterItemType.media;
    name?: string | undefined;
    fileName?: string | undefined;
    caption?: string | null | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<Pick<{
    type: z.ZodLiteral<NewsletterItemType.text>;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "type">, {
    name: z.ZodOptional<z.ZodString>;
    link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}>, "strip", z.ZodTypeAny, {
    type: NewsletterItemType.text;
    name?: string | undefined;
    link?: string | null | undefined;
    description?: string | null | undefined;
}, {
    type: NewsletterItemType.text;
    name?: string | undefined;
    link?: string | null | undefined;
    description?: string | null | undefined;
}>]>>;
export type NewsletterItemTemplateDataDetails = z.infer<typeof newsletterItemTemplateDataDetails>;
declare const baseNewsletterItemTemplateData: z.ZodObject<{
    id: z.ZodNumber;
    nextId: z.ZodNullable<z.ZodNumber>;
    prevId: z.ZodNullable<z.ZodNumber>;
    parentId: z.ZodNullable<z.ZodNumber>;
    templateId: z.ZodNullable<z.ZodNumber>;
    data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<Pick<{
        type: z.ZodLiteral<NewsletterItemType.media>;
        name: z.ZodString;
        fileName: z.ZodString;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "type">, {
        name: z.ZodOptional<z.ZodString>;
        fileName: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }>, "strip", z.ZodTypeAny, {
        type: NewsletterItemType.media;
        name?: string | undefined;
        fileName?: string | undefined;
        caption?: string | null | undefined;
    }, {
        type: NewsletterItemType.media;
        name?: string | undefined;
        fileName?: string | undefined;
        caption?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<Pick<{
        type: z.ZodLiteral<NewsletterItemType.text>;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "type">, {
        name: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }>, "strip", z.ZodTypeAny, {
        type: NewsletterItemType.text;
        name?: string | undefined;
        link?: string | null | undefined;
        description?: string | null | undefined;
    }, {
        type: NewsletterItemType.text;
        name?: string | undefined;
        link?: string | null | undefined;
        description?: string | null | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    nextId: number | null;
    prevId: number | null;
    parentId: number | null;
    templateId: number | null;
    data?: {
        type: NewsletterItemType.media;
        name?: string | undefined;
        fileName?: string | undefined;
        caption?: string | null | undefined;
    } | {
        type: NewsletterItemType.text;
        name?: string | undefined;
        link?: string | null | undefined;
        description?: string | null | undefined;
    } | undefined;
}, {
    id: number;
    nextId: number | null;
    prevId: number | null;
    parentId: number | null;
    templateId: number | null;
    data?: {
        type: NewsletterItemType.media;
        name?: string | undefined;
        fileName?: string | undefined;
        caption?: string | null | undefined;
    } | {
        type: NewsletterItemType.text;
        name?: string | undefined;
        link?: string | null | undefined;
        description?: string | null | undefined;
    } | undefined;
}>;
export type NewsletterItemTemplateData = z.infer<typeof baseNewsletterItemTemplateData>;
export declare const postNewsletterItemTemplateInput: z.ZodObject<{
    name: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        templateId: z.ZodOptional<z.ZodNumber>;
        temp: z.ZodObject<{
            id: z.ZodNumber;
            parentId: z.ZodNullable<z.ZodNumber>;
            nextId: z.ZodNullable<z.ZodNumber>;
            prevId: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            nextId: number | null;
            prevId: number | null;
            parentId: number | null;
        }, {
            id: number;
            nextId: number | null;
            prevId: number | null;
            parentId: number | null;
        }>;
        data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<Pick<{
            type: z.ZodLiteral<NewsletterItemType.media>;
            name: z.ZodString;
            fileName: z.ZodString;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "type">, {
            name: z.ZodOptional<z.ZodString>;
            fileName: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }>, "strip", z.ZodTypeAny, {
            type: NewsletterItemType.media;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        }, {
            type: NewsletterItemType.media;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<Pick<{
            type: z.ZodLiteral<NewsletterItemType.text>;
            name: z.ZodString;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "type">, {
            name: z.ZodOptional<z.ZodString>;
            link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }>, "strip", z.ZodTypeAny, {
            type: NewsletterItemType.text;
            name?: string | undefined;
            link?: string | null | undefined;
            description?: string | null | undefined;
        }, {
            type: NewsletterItemType.text;
            name?: string | undefined;
            link?: string | null | undefined;
            description?: string | null | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        temp: {
            id: number;
            nextId: number | null;
            prevId: number | null;
            parentId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            type: NewsletterItemType.media;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: NewsletterItemType.text;
            name?: string | undefined;
            link?: string | null | undefined;
            description?: string | null | undefined;
        } | undefined;
    }, {
        temp: {
            id: number;
            nextId: number | null;
            prevId: number | null;
            parentId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            type: NewsletterItemType.media;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: NewsletterItemType.text;
            name?: string | undefined;
            link?: string | null | undefined;
            description?: string | null | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    data: {
        temp: {
            id: number;
            nextId: number | null;
            prevId: number | null;
            parentId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            type: NewsletterItemType.media;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: NewsletterItemType.text;
            name?: string | undefined;
            link?: string | null | undefined;
            description?: string | null | undefined;
        } | undefined;
    }[];
}, {
    name: string;
    data: {
        temp: {
            id: number;
            nextId: number | null;
            prevId: number | null;
            parentId: number | null;
        };
        templateId?: number | undefined;
        data?: {
            type: NewsletterItemType.media;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: NewsletterItemType.text;
            name?: string | undefined;
            link?: string | null | undefined;
            description?: string | null | undefined;
        } | undefined;
    }[];
}>;
export declare const getNewsletterItemTemplateInput: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export declare const deleteNewsletterItemTemplateInput: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type CreateNewsletterItemTemplateInput = z.infer<typeof postNewsletterItemTemplateInput>;
export type ReadNewsletterItemTemplateInput = z.infer<typeof getNewsletterItemTemplateInput>;
export type DeleteNewsletterItemTemplateInput = z.infer<typeof deleteNewsletterItemTemplateInput>;
export {};
