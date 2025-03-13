"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewsletterItemTemplate = exports.newsletterItemTemplate = exports.newsletterItemTemplateBase = exports.createNewsletterItemTemplateData = exports.newsletterItemTemplateData = exports.updateNewsletter = exports.createNewsletter = exports.newsletter = exports.newsletterBase = exports.newsletterProperties = exports.getItemUploadLinks = exports.createNewsletterItemsBatch = exports.createNewsletterItemsBatchItem = exports.tempNewsletterItemIds = exports.updateNewsletterItem = exports.createNewsletterItem = exports.isContainerItem = exports.isTextItem = exports.isMediaItem = exports.newsletterItem = exports.newsletterItemBase = exports.nodePosition = exports.updateNewsletterItemDetails = exports.updateNewsletterItemDetailsContainer = exports.updateNewsletterItemDetailsText = exports.updateNewsletterItemDetailsMedia = exports.createNewsletterItemDetails = exports.createNewsletterItemDetailsContainer = exports.createNewsletterItemDetailsText = exports.createNewsletterItemDetailsMedia = exports.newsletterItemDetails = exports.containerItemDetails = exports.textItemDetails = exports.mediaItemDetails = exports.baseItemDetails = exports.itemDetailType = exports.updateLocation = exports.createLocation = exports.locationInput = exports.dateRangeInput = exports.dateInput = exports.country = exports.positionInput = exports.meta = exports.userBase = exports.deleteBatchInput = exports.deleteInput = exports.getInput = exports.NewsletterItemTypeName = exports.MediaFormat = void 0;
exports.user = void 0;
const zod_1 = require("zod");
var MediaFormat;
(function (MediaFormat) {
    MediaFormat["Image"] = "image";
    MediaFormat["Video"] = "video";
    MediaFormat["Audio"] = "audio";
})(MediaFormat || (exports.MediaFormat = MediaFormat = {}));
var NewsletterItemTypeName;
(function (NewsletterItemTypeName) {
    NewsletterItemTypeName["Media"] = "media";
    NewsletterItemTypeName["Text"] = "text";
    NewsletterItemTypeName["Container"] = "container";
})(NewsletterItemTypeName || (exports.NewsletterItemTypeName = NewsletterItemTypeName = {}));
exports.getInput = zod_1.z.object({
    id: zod_1.z.coerce.number(),
});
exports.deleteInput = zod_1.z.object({
    id: zod_1.z.coerce.number(),
});
exports.deleteBatchInput = zod_1.z.object({
    ids: zod_1.z.array(zod_1.z.coerce.number()),
});
/**
 * User
 */
exports.userBase = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    email: zod_1.z.string(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
/**
 * Meta data
 */
exports.meta = zod_1.z.object({
    creator: exports.userBase,
    modifier: exports.userBase.optional(),
    created: zod_1.z.string(),
    modified: zod_1.z.string().optional(),
});
exports.positionInput = zod_1.z.object({
    latitude: zod_1.z.coerce.number(),
    longitude: zod_1.z.coerce.number(),
});
/**
 * Country
 */
exports.country = zod_1.z.object({
    name: zod_1.z.string(),
    position: exports.positionInput,
});
/**
 * Date
 */
exports.dateInput = zod_1.z.string().min(8);
exports.dateRangeInput = zod_1.z.object({
    start: exports.dateInput.optional(),
    end: exports.dateInput.optional(),
});
/**
 * Location
 */
exports.locationInput = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    name: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    position: zod_1.z
        .object({
        latitude: zod_1.z.coerce.number(),
        longitude: zod_1.z.coerce.number(),
    })
        .optional(),
});
exports.createLocation = exports.locationInput.omit({ id: true });
exports.updateLocation = exports.locationInput;
/**
 * Newsletter Item
 */
// details
const mediaFormat = zod_1.z.nativeEnum(MediaFormat);
exports.itemDetailType = zod_1.z.union([
    zod_1.z.literal(NewsletterItemTypeName.Media),
    zod_1.z.literal(NewsletterItemTypeName.Text),
    zod_1.z.literal(NewsletterItemTypeName.Container),
]);
exports.baseItemDetails = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    newsletterItemId: zod_1.z.coerce.number(),
    name: zod_1.z.string(),
});
exports.mediaItemDetails = zod_1.z
    .object({
    type: zod_1.z.literal(NewsletterItemTypeName.Media),
    fileName: zod_1.z.string(),
    format: mediaFormat,
    caption: zod_1.z.string().optional().nullable(),
})
    .merge(exports.baseItemDetails);
exports.textItemDetails = zod_1.z
    .object({
    type: zod_1.z.literal(NewsletterItemTypeName.Text),
    description: zod_1.z.string().optional().nullable(),
    link: zod_1.z.string().optional().nullable(),
})
    .merge(exports.baseItemDetails);
exports.containerItemDetails = zod_1.z
    .object({
    type: zod_1.z.literal(NewsletterItemTypeName.Container),
})
    .merge(exports.baseItemDetails);
exports.newsletterItemDetails = zod_1.z.discriminatedUnion('type', [
    exports.mediaItemDetails,
    exports.textItemDetails,
    exports.containerItemDetails,
]);
exports.createNewsletterItemDetailsMedia = exports.mediaItemDetails.omit({
    id: true,
    newsletterItemId: true,
});
exports.createNewsletterItemDetailsText = exports.textItemDetails.omit({
    id: true,
    newsletterItemId: true,
});
exports.createNewsletterItemDetailsContainer = exports.containerItemDetails.omit({
    id: true,
    newsletterItemId: true,
});
exports.createNewsletterItemDetails = zod_1.z.discriminatedUnion('type', [
    exports.createNewsletterItemDetailsMedia,
    exports.createNewsletterItemDetailsText,
    exports.createNewsletterItemDetailsContainer,
]);
exports.updateNewsletterItemDetailsMedia = exports.mediaItemDetails
    .pick({ type: true })
    .merge(exports.mediaItemDetails.omit({ type: true }).partial())
    .merge(exports.baseItemDetails.omit({ id: true }).partial())
    .merge(exports.baseItemDetails.pick({ id: true }));
exports.updateNewsletterItemDetailsText = exports.textItemDetails
    .pick({ type: true })
    .merge(exports.textItemDetails.omit({ type: true }).partial())
    .merge(exports.baseItemDetails.omit({ id: true }).partial())
    .merge(exports.baseItemDetails.pick({ id: true }));
exports.updateNewsletterItemDetailsContainer = exports.containerItemDetails
    .pick({ type: true })
    .merge(exports.containerItemDetails.omit({ type: true }).partial())
    .merge(exports.baseItemDetails.omit({ id: true }).partial())
    .merge(exports.baseItemDetails.pick({ id: true }));
exports.updateNewsletterItemDetails = zod_1.z.discriminatedUnion('type', [
    exports.updateNewsletterItemDetailsMedia,
    exports.updateNewsletterItemDetailsText,
    exports.updateNewsletterItemDetailsContainer,
]);
exports.nodePosition = zod_1.z.object({
    parentId: zod_1.z.coerce.number().nullable(),
    nextId: zod_1.z.coerce.number().nullable(),
    prevId: zod_1.z.coerce.number().nullable(),
});
exports.newsletterItemBase = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    newsletterId: zod_1.z.coerce.number(),
    position: exports.nodePosition,
    title: zod_1.z.string(),
    date: zod_1.z.string().nullable().optional(),
    location: exports.locationInput.optional(),
    details: exports.newsletterItemDetails,
});
exports.newsletterItem = exports.newsletterItemBase.merge(zod_1.z.object({
    children: zod_1.z.array(exports.newsletterItemBase),
}));
const isMediaItem = (item) => {
    return (item.details.type ===
        NewsletterItemTypeName.Media);
};
exports.isMediaItem = isMediaItem;
const isTextItem = (item) => {
    return (item.details.type ===
        NewsletterItemTypeName.Text);
};
exports.isTextItem = isTextItem;
const isContainerItem = (item) => {
    return (item.details.type ===
        NewsletterItemTypeName.Container);
};
exports.isContainerItem = isContainerItem;
exports.createNewsletterItem = exports.newsletterItem
    .omit({
    id: true,
    children: true,
    details: true,
    location: true,
})
    .merge(zod_1.z.object({
    details: exports.createNewsletterItemDetails,
    location: exports.createLocation.optional(),
}));
exports.updateNewsletterItem = exports.newsletterItem
    .pick({ id: true, newsletterId: true })
    .merge(exports.newsletterItem
    .omit({ id: true, details: true, position: true, children: true })
    .partial())
    .merge(zod_1.z.object({ details: exports.updateNewsletterItemDetails.optional() }))
    .merge(zod_1.z.object({
    childPositions: zod_1.z
        .array(exports.nodePosition.merge(zod_1.z.object({ id: zod_1.z.coerce.number() })))
        .optional(),
}));
exports.tempNewsletterItemIds = zod_1.z.object({
    id: zod_1.z.string(),
    parentId: zod_1.z.coerce.string().nullable(),
    nextId: zod_1.z.coerce.string().nullable(),
    prevId: zod_1.z.coerce.string().nullable(),
});
exports.createNewsletterItemsBatchItem = exports.createNewsletterItem
    .omit({ position: true })
    .merge(zod_1.z.object({ temp: exports.tempNewsletterItemIds }));
exports.createNewsletterItemsBatch = zod_1.z.object({
    newsletterId: zod_1.z.coerce.number(),
    position: exports.nodePosition,
    batch: zod_1.z.array(exports.createNewsletterItemsBatchItem),
});
exports.getItemUploadLinks = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({ id: zod_1.z.string() })),
});
/**
 * Newsletter
 */
exports.newsletterProperties = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: 'Name must be at least 1 characters long' })
        .max(100, { message: 'Name must be at less than 100 characters long' }),
    dateRange: exports.dateRangeInput,
});
exports.newsletterBase = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .merge(zod_1.z.object({
    properties: exports.newsletterProperties,
    owner: exports.userBase,
    meta: exports.meta,
}));
exports.newsletter = exports.newsletterBase.merge(zod_1.z.object({
    members: zod_1.z.array(exports.userBase),
    items: zod_1.z.array(exports.newsletterItemBase),
}));
exports.createNewsletter = exports.newsletter.omit({
    id: true,
    owner: true,
    meta: true,
    members: true,
    items: true,
});
exports.updateNewsletter = exports.newsletter.pick({ id: true }).merge(zod_1.z.object({
    properties: exports.newsletterProperties.partial(),
}));
/**
 * Newsletter item template
 */
const newsletterItemTemplateDataDetails = zod_1.z
    .discriminatedUnion('type', [
    exports.createNewsletterItemDetailsMedia,
    exports.createNewsletterItemDetailsText,
    exports.createNewsletterItemDetailsContainer,
])
    .optional();
exports.newsletterItemTemplateData = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    position: exports.nodePosition,
    templateId: zod_1.z.coerce.number().optional(),
    data: newsletterItemTemplateDataDetails,
});
exports.createNewsletterItemTemplateData = exports.newsletterItemTemplateData
    .omit({ position: true, id: true })
    .merge(zod_1.z.object({ temp: exports.tempNewsletterItemIds }));
exports.newsletterItemTemplateBase = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    meta: exports.meta,
    name: zod_1.z.string(),
});
exports.newsletterItemTemplate = exports.newsletterItemTemplateBase.merge(zod_1.z.object({
    items: zod_1.z.array(exports.newsletterItemTemplateData),
    templates: zod_1.z.array(exports.newsletterItemTemplateBase),
}));
exports.createNewsletterItemTemplate = exports.newsletterItemTemplate
    .omit({
    id: true,
    templates: true,
    items: true,
    meta: true,
})
    .merge(zod_1.z.object({ data: zod_1.z.array(exports.createNewsletterItemTemplateData) }));
/**
 * User
 */
exports.user = exports.userBase.merge(zod_1.z.object({
    newsletters: zod_1.z.array(exports.newsletterBase),
    newsletterItemTemplates: zod_1.z.array(exports.newsletterItemTemplateBase),
}));
//# sourceMappingURL=athena-common.js.map