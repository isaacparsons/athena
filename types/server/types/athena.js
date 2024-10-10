"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsletterInput = exports.updateNewsletterInput = exports.postNewsletterInput = exports.getNewsletterInput = exports.getItemUploadLinksInput = exports.deleteManyNewsletterItemsInput = exports.updateNewsletterItemInput = exports.postNewsletterItemInput = exports.getNewsletterItemInput = exports.newsletterItemDetails = exports.textItemDetails = exports.mediaItemDetails = exports.locationInput = void 0;
const zod_1 = require("zod");
exports.locationInput = zod_1.z
    .object({
    name: zod_1.z.string().optional(),
    countryCode: zod_1.z.string().optional(),
    lattitude: zod_1.z.coerce.number().optional(),
    longitude: zod_1.z.coerce.number().optional(),
})
    .optional();
exports.mediaItemDetails = zod_1.z.object({
    type: zod_1.z.literal('media'),
    name: zod_1.z.string(),
    fileName: zod_1.z.string(),
    caption: zod_1.z.string().optional(),
});
exports.textItemDetails = zod_1.z.object({
    type: zod_1.z.literal('text'),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    link: zod_1.z.string().optional(),
});
exports.newsletterItemDetails = zod_1.z
    .discriminatedUnion('type', [exports.mediaItemDetails, exports.textItemDetails])
    .optional();
exports.getNewsletterItemInput = zod_1.z.object({
    newsletterItemId: zod_1.z.coerce.number(),
});
exports.postNewsletterItemInput = zod_1.z.object({
    newsletterId: zod_1.z.coerce.number(),
    parentId: zod_1.z.coerce.number().nullable(),
    nextItemId: zod_1.z.coerce.number().nullable(),
    previousItemId: zod_1.z.coerce.number().nullable(),
    title: zod_1.z.string(),
    date: zod_1.z.string().optional(),
    location: exports.locationInput,
    details: exports.newsletterItemDetails,
});
exports.updateNewsletterItemInput = zod_1.z
    .object({
    newsletterItemId: zod_1.z.coerce.number(),
    title: zod_1.z.string().optional(),
    date: zod_1.z.string().optional().nullable(),
    // parentId: z.coerce.number().optional(),
    nextItemId: zod_1.z.coerce.number().optional(),
    location: exports.locationInput,
})
    .refine((obj) => obj.date || obj.nextItemId || obj.title || obj.location);
exports.deleteManyNewsletterItemsInput = zod_1.z.object({
    newsletterItemIds: zod_1.z.array(zod_1.z.coerce.number()),
});
exports.getItemUploadLinksInput = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({ id: zod_1.z.string() })),
});
exports.getNewsletterInput = zod_1.z.object({
    newsletterId: zod_1.z.coerce.number(),
});
exports.postNewsletterInput = zod_1.z.object({
    name: zod_1.z.string(),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
});
exports.updateNewsletterInput = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    name: zod_1.z.string().optional(),
    startDate: zod_1.z.string().optional().nullable(),
    endDate: zod_1.z.string().optional().nullable(),
});
exports.deleteNewsletterInput = zod_1.z.object({ id: zod_1.z.coerce.number() });
//# sourceMappingURL=athena.js.map