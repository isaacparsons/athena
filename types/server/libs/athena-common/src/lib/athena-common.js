"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsletterItemTemplateInput = exports.getNewsletterItemTemplateInput = exports.postNewsletterItemTemplateInput = exports.getItemUploadLinksInput = exports.deleteManyNewsletterItemsInput = exports.deleteNewsletterInput = exports.updateNewsletterInput = exports.postNewsletterInput = exports.getNewsletterInput = exports.updateNewsletterItemInput = exports.postNewsletterItemBatchInput = exports.postNewsletterItemBatchInputItem = exports.tempNewsletterItemIds = exports.postNewsletterItemInput = exports.postNewsletterItemInputBase = exports.getNewsletterItemTreeInput = exports.getNewsletterItemInput = exports.newsletterItemDetails = exports.textItemDetails = exports.mediaItemDetails = exports.NewsletterItemTypeName = exports.MediaFormat = exports.locationInput = void 0;
exports.isMediaDetailsInput = isMediaDetailsInput;
exports.isTextDetailsInput = isTextDetailsInput;
exports.isMediaDetails = isMediaDetails;
exports.isTextDetails = isTextDetails;
const zod_1 = require("zod");
/**
 * Input validation
 */
exports.locationInput = zod_1.z
    .object({
    name: zod_1.z.string().optional(),
    countryCode: zod_1.z.string().optional(),
    lattitude: zod_1.z.coerce.number().optional(),
    longitude: zod_1.z.coerce.number().optional(),
})
    .optional();
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
})(NewsletterItemTypeName || (exports.NewsletterItemTypeName = NewsletterItemTypeName = {}));
const mediaFormat = zod_1.z.nativeEnum(MediaFormat);
exports.mediaItemDetails = zod_1.z.object({
    type: zod_1.z.literal(NewsletterItemTypeName.Media),
    name: zod_1.z.string(),
    fileName: zod_1.z.string(),
    format: mediaFormat,
    caption: zod_1.z.string().optional().nullable(),
});
exports.textItemDetails = zod_1.z.object({
    type: zod_1.z.literal(NewsletterItemTypeName.Text),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    link: zod_1.z.string().optional().nullable(),
});
exports.newsletterItemDetails = zod_1.z
    .discriminatedUnion('type', [exports.mediaItemDetails, exports.textItemDetails])
    .optional();
exports.getNewsletterItemInput = zod_1.z.object({
    newsletterItemId: zod_1.z.coerce.number(),
});
exports.getNewsletterItemTreeInput = zod_1.z.object({
    parentId: zod_1.z.coerce.number().nullable(),
});
exports.postNewsletterItemInputBase = zod_1.z.object({
    newsletterId: zod_1.z.coerce.number(),
    parentId: zod_1.z.coerce.number().nullable(),
    nextItemId: zod_1.z.coerce.number().nullable(),
    previousItemId: zod_1.z.coerce.number().nullable(),
    title: zod_1.z.string(),
    date: zod_1.z.string().optional(),
    location: exports.locationInput,
});
exports.postNewsletterItemInput = exports.postNewsletterItemInputBase.merge(zod_1.z.object({
    details: exports.newsletterItemDetails,
}));
exports.tempNewsletterItemIds = zod_1.z.object({
    id: zod_1.z.string(),
    parentId: zod_1.z.string().nullable(),
    nextId: zod_1.z.string().nullable(),
    prevId: zod_1.z.string().nullable(),
});
exports.postNewsletterItemBatchInputItem = exports.postNewsletterItemInput
    .omit({
    nextItemId: true,
    previousItemId: true,
    parentId: true,
})
    .merge(zod_1.z.object({ temp: exports.tempNewsletterItemIds }));
exports.postNewsletterItemBatchInput = zod_1.z.object({
    newsletterId: zod_1.z.coerce.number(),
    parentId: zod_1.z.coerce.number().nullable(),
    nextItemId: zod_1.z.coerce.number().nullable(),
    previousItemId: zod_1.z.coerce.number().nullable(),
    batch: zod_1.z.array(exports.postNewsletterItemBatchInputItem),
});
// TODO: we can remove below, it should be derived from newsletter item input
exports.updateNewsletterItemInput = zod_1.z
    .object({
    newsletterItemId: zod_1.z.coerce.number(),
    title: zod_1.z.string().optional(),
    date: zod_1.z.string().optional().nullable(),
    // parentId: z.coerce.number().optional(),
    nextItemId: zod_1.z.coerce.number().optional(),
    location: exports.locationInput,
    details: exports.newsletterItemDetails,
})
    .refine((obj) => obj.date || obj.nextItemId || obj.title || obj.location);
exports.getNewsletterInput = zod_1.z.object({
    newsletterId: zod_1.z.coerce.number(),
});
exports.postNewsletterInput = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: 'Name must be at least 1 characters long' })
        .max(100, { message: 'Name must be at less than 100 characters long' }),
    startDate: zod_1.z.string().min(8).optional(),
    endDate: zod_1.z.string().min(8).optional(),
});
exports.updateNewsletterInput = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    name: zod_1.z.string().optional(),
    startDate: zod_1.z.string().optional().nullable(),
    endDate: zod_1.z.string().optional().nullable(),
});
exports.deleteNewsletterInput = zod_1.z.object({ id: zod_1.z.coerce.number() });
exports.deleteManyNewsletterItemsInput = zod_1.z.object({
    newsletterItemIds: zod_1.z.array(zod_1.z.coerce.number()),
});
exports.getItemUploadLinksInput = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({ id: zod_1.z.string() })),
});
const newsletterItemTemplateDataDetails = zod_1.z
    .discriminatedUnion('type', [
    exports.mediaItemDetails
        .pick({ type: true, format: true })
        .merge(exports.mediaItemDetails.omit({ type: true, format: true }).partial()),
    exports.textItemDetails
        .pick({ type: true })
        .merge(exports.textItemDetails.omit({ type: true }).partial()),
])
    .optional();
// const baseNewsletterItemTemplateData = z.object({
//   id: z.number(),
//   nextId: z.number().nullable(),
//   prevId: z.number().nullable(),
//   parentId: z.number().nullable(),
//   templateId: z.number().nullable(),
//   data: newsletterItemTemplateDataDetails,
// });
exports.postNewsletterItemTemplateInput = zod_1.z.object({
    name: zod_1.z.string(),
    data: zod_1.z.array(zod_1.z.object({
        templateId: zod_1.z.number().optional(),
        temp: exports.tempNewsletterItemIds,
        data: newsletterItemTemplateDataDetails,
    })),
});
exports.getNewsletterItemTemplateInput = zod_1.z.object({
    id: zod_1.z.number(),
});
exports.deleteNewsletterItemTemplateInput = zod_1.z.object({
    id: zod_1.z.number(),
});
function isMediaDetailsInput(details) {
    return ((details === null || details === void 0 ? void 0 : details.type) === NewsletterItemTypeName.Media);
}
function isTextDetailsInput(details) {
    return ((details === null || details === void 0 ? void 0 : details.type) === NewsletterItemTypeName.Text);
}
function isMediaDetails(details) {
    return (details.type === NewsletterItemTypeName.Media);
}
function isTextDetails(details) {
    return details.type === NewsletterItemTypeName.Text;
}
//# sourceMappingURL=athena-common.js.map