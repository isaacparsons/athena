import { z } from 'zod';
/**
 * Input validation
 */
export declare const locationInput: z.ZodOptional<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    countryCode: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    longitude?: number | undefined;
    latitude?: number | undefined;
    countryCode?: string | undefined;
}, {
    name?: string | undefined;
    longitude?: number | undefined;
    latitude?: number | undefined;
    countryCode?: string | undefined;
}>>;
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
export declare const mediaItemDetails: z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    name: z.ZodString;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
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
export declare const textItemDetails: z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
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
export declare const containerItemDetails: z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Container;
}, {
    name: string;
    type: NewsletterItemTypeName.Container;
}>;
export declare const newsletterItemDetails: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemTypeName.Media>;
    name: z.ZodString;
    fileName: z.ZodString;
    format: z.ZodNativeEnum<typeof MediaFormat>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
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
}>, z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemTypeName.Text>;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Text;
    description?: string | null | undefined;
    link?: string | null | undefined;
}, {
    name: string;
    type: NewsletterItemTypeName.Text;
    description?: string | null | undefined;
    link?: string | null | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<NewsletterItemTypeName.Container>;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: NewsletterItemTypeName.Container;
}, {
    name: string;
    type: NewsletterItemTypeName.Container;
}>]>;
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
        latitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    }, {
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
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
        latitude?: number | undefined;
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
        latitude?: number | undefined;
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
        latitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    }, {
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    }>>;
}, {
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        name: z.ZodString;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
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
    }>, z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }>]>;
}>, "strip", z.ZodTypeAny, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
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
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | undefined;
}, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
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
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | undefined;
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
        latitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    }, {
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    }>>;
}, {
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        name: z.ZodString;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
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
    }>, z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }>]>;
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
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | undefined;
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
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | undefined;
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
            latitude: z.ZodOptional<z.ZodNumber>;
            longitude: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            longitude?: number | undefined;
            latitude?: number | undefined;
            countryCode?: string | undefined;
        }, {
            name?: string | undefined;
            longitude?: number | undefined;
            latitude?: number | undefined;
            countryCode?: string | undefined;
        }>>;
    }, {
        details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            name: z.ZodString;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
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
        }>, z.ZodObject<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            name: z.ZodString;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            name: string;
            type: NewsletterItemTypeName.Text;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }, {
            name: string;
            type: NewsletterItemTypeName.Container;
        }>]>;
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
            name?: string | undefined;
            longitude?: number | undefined;
            latitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        date?: string | undefined;
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
            name?: string | undefined;
            longitude?: number | undefined;
            latitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        date?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
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
            name?: string | undefined;
            longitude?: number | undefined;
            latitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        date?: string | undefined;
    }[];
}, {
    parentId: number | null;
    newsletterId: number;
    nextItemId: number | null;
    previousItemId: number | null;
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
            name?: string | undefined;
            longitude?: number | undefined;
            latitude?: number | undefined;
            countryCode?: string | undefined;
        } | undefined;
        date?: string | undefined;
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
        latitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    }, {
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    }>>;
    details: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Media>;
        name: z.ZodString;
        fileName: z.ZodString;
        format: z.ZodNativeEnum<typeof MediaFormat>;
        caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
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
    }>, z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Text>;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }, {
        name: string;
        type: NewsletterItemTypeName.Text;
        description?: string | null | undefined;
        link?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<NewsletterItemTypeName.Container>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }, {
        name: string;
        type: NewsletterItemTypeName.Container;
    }>]>;
}, "strip", z.ZodTypeAny, {
    newsletterItemId: number;
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
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
}, {
    newsletterItemId: number;
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
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
}>, {
    newsletterItemId: number;
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
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
}, {
    newsletterItemId: number;
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
        name?: string | undefined;
        longitude?: number | undefined;
        latitude?: number | undefined;
        countryCode?: string | undefined;
    } | undefined;
    date?: string | null | undefined;
    nextItemId?: number | undefined;
    title?: string | undefined;
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
            type: z.ZodLiteral<NewsletterItemTypeName.Media>;
            name: z.ZodString;
            fileName: z.ZodString;
            format: z.ZodNativeEnum<typeof MediaFormat>;
            caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "type" | "format">, {
            name: z.ZodOptional<z.ZodString>;
            fileName: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }>, "strip", z.ZodTypeAny, {
            type: NewsletterItemTypeName.Media;
            format: MediaFormat;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        }, {
            type: NewsletterItemTypeName.Media;
            format: MediaFormat;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<Pick<{
            type: z.ZodLiteral<NewsletterItemTypeName.Text>;
            name: z.ZodString;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            link: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "type">, {
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
            link: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        }>, "strip", z.ZodTypeAny, {
            type: NewsletterItemTypeName.Text;
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }, {
            type: NewsletterItemTypeName.Text;
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        }>, z.ZodObject<z.objectUtil.extendShape<Pick<{
            type: z.ZodLiteral<NewsletterItemTypeName.Container>;
            name: z.ZodString;
        }, "type">, {
            name: z.ZodOptional<z.ZodString>;
        }>, "strip", z.ZodTypeAny, {
            type: NewsletterItemTypeName.Container;
            name?: string | undefined;
        }, {
            type: NewsletterItemTypeName.Container;
            name?: string | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        data?: {
            type: NewsletterItemTypeName.Media;
            format: MediaFormat;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: NewsletterItemTypeName.Text;
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            type: NewsletterItemTypeName.Container;
            name?: string | undefined;
        } | undefined;
        templateId?: number | undefined;
    }, {
        temp: {
            id: string;
            parentId: string | null;
            nextId: string | null;
            prevId: string | null;
        };
        data?: {
            type: NewsletterItemTypeName.Media;
            format: MediaFormat;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: NewsletterItemTypeName.Text;
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            type: NewsletterItemTypeName.Container;
            name?: string | undefined;
        } | undefined;
        templateId?: number | undefined;
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
        data?: {
            type: NewsletterItemTypeName.Media;
            format: MediaFormat;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: NewsletterItemTypeName.Text;
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            type: NewsletterItemTypeName.Container;
            name?: string | undefined;
        } | undefined;
        templateId?: number | undefined;
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
        data?: {
            type: NewsletterItemTypeName.Media;
            format: MediaFormat;
            name?: string | undefined;
            fileName?: string | undefined;
            caption?: string | null | undefined;
        } | {
            type: NewsletterItemTypeName.Text;
            name?: string | undefined;
            description?: string | null | undefined;
            link?: string | null | undefined;
        } | {
            type: NewsletterItemTypeName.Container;
            name?: string | undefined;
        } | undefined;
        templateId?: number | undefined;
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
export type UserNewsletters = NewsletterBase[];
export type UserNewsletterItemTemplates = Omit<NewsletterItemTemplateBase, 'items'>[];
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
export type CreateNewsletterItemDetailsTypeFromName<T extends NewsletterItemTypeName> = CreateItemDetailsInputMap[T];
export type CreateItemDetailsInput<T extends NewsletterItemTypeName = NewsletterItemTypeName> = CreateNewsletterItemDetailsTypeFromName<T>;
export declare function isMediaDetailsInput(details: CreateItemDetailsInput | undefined): details is CreateItemDetailsInputMedia;
export declare function isTextDetailsInput(details: CreateItemDetailsInput | undefined): details is CreateItemDetailsInputText;
export declare function isContainerDetailsInput(details: CreateItemDetailsInput | undefined): details is CreateItemDetailsInputContainer;
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
type NewsletterItemDetails<T extends NewsletterItemTypeName = NewsletterItemTypeName> = NewsletterItemDetailsTypeFromName<T>;
export type NewsletterItemDetailsTypeFromName<T extends NewsletterItemTypeName> = NewsletterItemDetailsMap[T];
export declare function isMediaDetails(details: NewsletterItemDetails): details is NewsletterItemDetailsMedia;
export declare function isTextDetails(details: NewsletterItemDetails): details is NewsletterItemDetailsText;
export declare function isContainerDetails(details: NewsletterItemDetails): details is NewsletterItemDetailsContainer;
export interface NewsletterItemBase<T extends NewsletterItemTypeName = NewsletterItemTypeName> extends Meta {
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
export interface NewsletterItem<T extends NewsletterItemTypeName = NewsletterItemTypeName> extends NewsletterItemBase<T> {
    children: NewsletterItemBase<T>[];
}
/**
 * Newsletter item template
 */
export interface NewsletterItemTemplateBase<T extends NewsletterItemTypeName = NewsletterItemTypeName> extends Meta {
    id: number;
    name: string;
    items: NewsletterItemTemplateData<T>[];
}
export type NewsletterItemTemplate<T extends NewsletterItemTypeName = NewsletterItemTypeName> = NewsletterItemTemplateBase<T> & {
    templates: NewsletterItemTemplateBase<T>[];
};
export type NewsletterItemTemplateDataDetails<T extends NewsletterItemTypeName = NewsletterItemTypeName> = NewsletterItemDetailsTypeFromName<T> & {
    type: T;
};
export interface NewsletterItemTemplateData<T extends NewsletterItemTypeName = NewsletterItemTypeName> {
    id: number;
    nextId: number | null;
    prevId: number | null;
    parentId: number | null;
    templateId: number | null;
    data: NewsletterItemTemplateDataDetails<T>;
}
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
