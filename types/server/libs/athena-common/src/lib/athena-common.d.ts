import { z } from 'zod';
/**
 * Input validation
 */
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
export declare const mediaItemDetails: z.ZodObject<{
    type: z.ZodLiteral<"media">;
    name: z.ZodString;
    fileName: z.ZodString;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "media";
    fileName: string;
    caption?: string | null | undefined;
}, {
    name: string;
    type: "media";
    fileName: string;
    caption?: string | null | undefined;
}>;
export declare const textItemDetails: z.ZodObject<{
    type: z.ZodLiteral<"text">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    name: string;
    type: "text";
    description?: string | null | undefined;
    link?: string | null | undefined;
}>;
export declare const newsletterItemDetails: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"media">;
    name: z.ZodString;
    fileName: z.ZodString;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "media";
    fileName: string;
    caption?: string | null | undefined;
}, {
    name: string;
    type: "media";
    fileName: string;
    caption?: string | null | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"text">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "text";
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    name: string;
    type: "text";
    description?: string | null | undefined;
    link?: string | null | undefined;
}>]>>;
export declare const getNewsletterItemInput: z.ZodObject<{
    newsletterItemId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newsletterItemId: number;
}, {
    newsletterItemId: number;
}>;
export declare const getNewsletterItemTreeInput: z.ZodObject<{
    parentId: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    parentId: number | null;
}, {
    parentId: number | null;
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
    date?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
}, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    date?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
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
        type: z.ZodLiteral<"media">;
        name: z.ZodString;
        fileName: z.ZodString;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"text">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>]>>;
}>, "strip", z.ZodTypeAny, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    date?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    title: string;
    date?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}>;
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
export declare const postNewsletterItemBatchInputItem: z.ZodObject<z.objectUtil.extendShape<Omit<z.objectUtil.extendShape<{
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
        type: z.ZodLiteral<"media">;
        name: z.ZodString;
        fileName: z.ZodString;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"text">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>]>>;
}>, "parentId" | "nextItemId" | "previousItemId">, {
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
    temp: {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    };
    date?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}, {
    newsletterId: number;
    title: string;
    temp: {
        id: string;
        parentId: string | null;
        nextId: string | null;
        prevId: string | null;
    };
    date?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}>;
export declare const postNewsletterItemBatchInput: z.ZodObject<{
    newsletterId: z.ZodNumber;
    parentId: z.ZodNullable<z.ZodNumber>;
    nextItemId: z.ZodNullable<z.ZodNumber>;
    previousItemId: z.ZodNullable<z.ZodNumber>;
    batch: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<Omit<z.objectUtil.extendShape<{
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
            type: z.ZodLiteral<"media">;
            name: z.ZodString;
            fileName: z.ZodString;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "media";
            fileName: string;
            caption?: string | null | undefined;
        }, {
            name: string;
            type: "media";
            fileName: string;
            caption?: string | null | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"text">;
            name: z.ZodString;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "text";
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            name: string;
            type: "text";
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>]>>;
    }>, "parentId" | "nextItemId" | "previousItemId">, {
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
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        date?: string | undefined;
        location?: {
            name?: string | undefined;
            longitude?: number | undefined;
            lattitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        details?: {
            name: string;
            type: "media";
            fileName: string;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: "text";
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | undefined;
    }, {
        newsletterId: number;
        title: string;
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        date?: string | undefined;
        location?: {
            name?: string | undefined;
            longitude?: number | undefined;
            lattitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        details?: {
            name: string;
            type: "media";
            fileName: string;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: "text";
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    batch: {
        newsletterId: number;
        title: string;
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        date?: string | undefined;
        location?: {
            name?: string | undefined;
            longitude?: number | undefined;
            lattitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        details?: {
            name: string;
            type: "media";
            fileName: string;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: "text";
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | undefined;
    }[];
}, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
    batch: {
        newsletterId: number;
        title: string;
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        date?: string | undefined;
        location?: {
            name?: string | undefined;
            longitude?: number | undefined;
            lattitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        details?: {
            name: string;
            type: "media";
            fileName: string;
            caption?: string | null | undefined;
        } | {
            name: string;
            type: "text";
            description?: string | null | undefined;
            link?: string | null | undefined;
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
        type: z.ZodLiteral<"media">;
        name: z.ZodString;
        fileName: z.ZodString;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    }, {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"text">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    newsletterItemId: number;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}, {
    newsletterItemId: number;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}>, {
    newsletterItemId: number;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}, {
    newsletterItemId: number;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
    location?: {
        name?: string | undefined;
        longitude?: number | undefined;
        lattitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    details?: {
        name: string;
        type: "media";
        fileName: string;
        caption?: string | null | undefined;
    } | {
        name: string;
        type: "text";
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}>;
export declare const getNewsletterInput: z.ZodObject<{
    newsletterId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    newsletterId: number;
}, {
    newsletterId: number;
}>;
export declare const postNewsletterInput: z.ZodObject<{
    name: z.ZodString;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    name: string;
    startDate?: string | undefined;
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
declare const newsletterItemTemplateDataDetails: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<Pick<{
    type: z.ZodLiteral<"media">;
    name: z.ZodString;
    fileName: z.ZodString;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "type">, {
    name: z.ZodOptional<z.ZodString>;
    fileName: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}>, "strip", z.ZodTypeAny, {
    type: "media";
    name?: string | undefined;
    fileName?: string | undefined;
    caption?: string | null | undefined;
}, {
    type: "media";
    name?: string | undefined;
    fileName?: string | undefined;
    caption?: string | null | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<Pick<{
    type: z.ZodLiteral<"text">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "type">, {
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}>, "strip", z.ZodTypeAny, {
    type: "text";
    name?: string | undefined;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    type: "text";
    name?: string | undefined;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>]>>;
declare const baseNewsletterItemTemplateData: z.ZodObject<{
    id: z.ZodNumber;
    nextId: z.ZodNullable<z.ZodNumber>;
    prevId: z.ZodNullable<z.ZodNumber>;
    parentId: z.ZodNullable<z.ZodNumber>;
    templateId: z.ZodNullable<z.ZodNumber>;
    data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<Pick<{
        type: z.ZodLiteral<"media">;
        name: z.ZodString;
        fileName: z.ZodString;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "type">, {
        name: z.ZodOptional<z.ZodString>;
        fileName: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }>, "strip", z.ZodTypeAny, {
        type: "media";
        name?: string | undefined;
        fileName?: string | undefined;
        caption?: string | null | undefined;
    }, {
        type: "media";
        name?: string | undefined;
        fileName?: string | undefined;
        caption?: string | null | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<Pick<{
        type: z.ZodLiteral<"text">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "type">, {
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    }>, "strip", z.ZodTypeAny, {
        type: "text";
        name?: string | undefined;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        type: "text";
        name?: string | undefined;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    parentId: number | null;
    nextId: number | null;
    prevId: number | null;
    templateId: number | null;
    data?: {
        type: "media";
        name?: string | undefined;
        fileName?: string | undefined;
        caption?: string | null | undefined;
    } | {
        type: "text";
        name?: string | undefined;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}, {
    id: number;
    parentId: number | null;
    nextId: number | null;
    prevId: number | null;
    templateId: number | null;
    data?: {
        type: "media";
        name?: string | undefined;
        fileName?: string | undefined;
        caption?: string | null | undefined;
    } | {
        type: "text";
        name?: string | undefined;
        description?: string | null | undefined;
        link?: string | null | undefined;
    } | undefined;
}>;
export declare const postNewsletterItemTemplateInput: z.ZodObject<{
    name: z.ZodString;
    data: z.ZodArray<z.ZodObject<{
        templateId: z.ZodOptional<z.ZodNumber>;
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
        data: z.ZodOptional<z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<Pick<{
            type: z.ZodLiteral<"media">;
            name: z.ZodString;
            fileName: z.ZodString;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "type">, {
            name: z.ZodOptional<z.ZodString>;
            fileName: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }>, "strip", z.ZodTypeAny, {
            type: "media";
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        }, {
            type: "media";
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<Pick<{
            type: z.ZodLiteral<"text">;
            name: z.ZodString;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "type">, {
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }>, "strip", z.ZodTypeAny, {
            type: "text";
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            type: "text";
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        templateId?: number | undefined;
        data?: {
            type: "media";
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: "text";
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
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
            type: "media";
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: "text";
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
            type: "media";
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: "text";
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
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
            type: "media";
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: "text";
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
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
export interface User extends UserBase {
    newsletters: NewsletterBase[];
    newsletterItemTemplates: Omit<NewsletterItemTemplateBase, 'items'>[];
}
/**
 * Common
 */
export type Position = {
    lattitude: number;
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
export type CreateItemDetailsInputMap = {
    media: CreateItemDetailsInputMedia;
    text: CreateItemDetailsInputText;
};
export type CreateNewsletterItemDetailsTypeFromName<T extends NewsletterItemTypeName> = CreateItemDetailsInputMap[T];
export type CreateItemDetailsInput<T extends NewsletterItemTypeName = NewsletterItemTypeName> = CreateNewsletterItemDetailsTypeFromName<T>;
export declare function isMediaDetailsInput(details: CreateItemDetailsInput): details is CreateItemDetailsInputMedia;
export declare function isTextDetailsInput(details: CreateItemDetailsInput): details is CreateItemDetailsInputText;
export type CreateNewsletterItemInput = z.infer<typeof postNewsletterItemInput>;
export type CreateNewsletterItemBatchInputItem = z.infer<typeof postNewsletterItemBatchInputItem>;
export type CreateNewsletterItemBatchInput = z.infer<typeof postNewsletterItemBatchInput>;
export type ReadNewsletterItemInput = z.infer<typeof getNewsletterItemInput>;
export type ReadNewsletterItemTreeInput = z.infer<typeof getNewsletterItemTreeInput>;
export type UpdateNewsletterItemInput = z.infer<typeof updateNewsletterItemInput>;
export type DeleteManyNewsletterItemsInput = z.infer<typeof deleteManyNewsletterItemsInput>;
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
    type: 'media';
    fileName: string;
    caption: string | null;
};
export type NewsletterItemDetailsText = NewsletterItemDetailsBase & {
    type: 'text';
    description: string | null;
    link: string | null;
};
export type NewsletterItemDetailsMap = {
    media: NewsletterItemDetailsMedia;
    text: NewsletterItemDetailsText;
};
export type NewsletterItemTypeName = keyof NewsletterItemDetailsMap;
type NewsletterItemDetails<T extends NewsletterItemTypeName = NewsletterItemTypeName> = NewsletterItemDetailsTypeFromName<T>;
export type NewsletterItemDetailsTypeFromName<T extends NewsletterItemTypeName> = NewsletterItemDetailsMap[T];
export declare function isMediaDetails(details: NewsletterItemDetails): details is NewsletterItemDetailsMedia;
export declare function isTextDetails(details: NewsletterItemDetails): details is NewsletterItemDetailsText;
export interface NewsletterItemBase<T extends NewsletterItemTypeName = NewsletterItemTypeName> extends Meta {
    newsletterId: number;
    id: number;
    location: Location | null;
    date: string | null;
    title: string;
    parentId: number | null;
    nextItemId: number | null;
    previousItemId: number | null;
    details?: NewsletterItemDetailsTypeFromName<T>;
}
export interface NewsletterItem<T extends NewsletterItemTypeName = NewsletterItemTypeName> extends NewsletterItemBase<T> {
    children: NewsletterItemBase<T>[];
}
/**
 * Newsletter item template
 */
export interface NewsletterItemTemplateBase extends Meta {
    id: number;
    name: string;
    items: NewsletterItemTemplateData[];
}
export type NewsletterItemTemplate = NewsletterItemTemplateBase & {
    templates: NewsletterItemTemplateBase[];
};
export type NewsletterItemTemplateDataDetails = z.infer<typeof newsletterItemTemplateDataDetails>;
export type NewsletterItemTemplateData = z.infer<typeof baseNewsletterItemTemplateData>;
export type CreateNewsletterItemTemplateInput = z.infer<typeof postNewsletterItemTemplateInput>;
export type ReadNewsletterItemTemplateInput = z.infer<typeof getNewsletterItemTemplateInput>;
export type DeleteNewsletterItemTemplateInput = z.infer<typeof deleteNewsletterItemTemplateInput>;
/**
 * Helpers
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export {};
