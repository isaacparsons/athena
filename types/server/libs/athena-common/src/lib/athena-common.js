"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsletterItemTemplateInput = exports.getNewsletterItemTemplateInput = exports.postNewsletterItemTemplateInput = exports.deleteNewsletterInput = exports.updateNewsletterInput = exports.postNewsletterInput = exports.getNewsletterInput = exports.getItemUploadLinksInput = exports.deleteManyNewsletterItemsInput = exports.updateNewsletterItemInput = exports.postNewsletterItemBatchInput = exports.postNewsletterItemInput = exports.postNewsletterItemInputBase = exports.getNewsletterItemInput = exports.newsletterItemDetails = exports.textItemDetails = exports.mediaItemDetails = exports.locationInput = exports.NewsletterItemType = void 0;
const zod_1 = require("zod");
var NewsletterItemType;
(function (NewsletterItemType) {
    NewsletterItemType["media"] = "media";
    NewsletterItemType["text"] = "text";
})(NewsletterItemType || (exports.NewsletterItemType = NewsletterItemType = {}));
exports.locationInput = zod_1.z
    .object({
    name: zod_1.z.string().optional(),
    countryCode: zod_1.z.string().optional(),
    lattitude: zod_1.z.coerce.number().optional(),
    longitude: zod_1.z.coerce.number().optional(),
})
    .optional();
exports.mediaItemDetails = zod_1.z.object({
    type: zod_1.z.literal(NewsletterItemType.media),
    name: zod_1.z.string(),
    fileName: zod_1.z.string(),
    caption: zod_1.z.string().optional(),
});
exports.textItemDetails = zod_1.z.object({
    type: zod_1.z.literal(NewsletterItemType.text),
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
exports.postNewsletterItemBatchInput = zod_1.z.object({
    newsletterId: zod_1.z.coerce.number(),
    parentId: zod_1.z.coerce.number().nullable(),
    nextItemId: zod_1.z.coerce.number().nullable(),
    previousItemId: zod_1.z.coerce.number().nullable(),
    batch: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string(),
        date: zod_1.z.string().optional(),
        location: exports.locationInput,
        temp: zod_1.z.object({
            id: zod_1.z.number(),
            parentId: zod_1.z.coerce.number().nullable(),
            nextItemId: zod_1.z.coerce.number().nullable(),
            previousItemId: zod_1.z.coerce.number().nullable(),
        }),
        details: exports.newsletterItemDetails,
    })),
});
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
    name: zod_1.z.string().min(3).max(100),
    startDate: zod_1.z.string().min(8),
    endDate: zod_1.z.string().min(8).optional(),
});
exports.updateNewsletterInput = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    name: zod_1.z.string().optional(),
    startDate: zod_1.z.string().optional().nullable(),
    endDate: zod_1.z.string().optional().nullable(),
});
exports.deleteNewsletterInput = zod_1.z.object({ id: zod_1.z.coerce.number() });
/** Newsletter item templates
 *
 * examples: 'album', 'review', 'experience', 'celebration', 'notable-mention',
 */
const newsletterItemTemplateDataDetails = zod_1.z
    .discriminatedUnion('type', [
    exports.mediaItemDetails
        .pick({ type: true })
        .merge(exports.mediaItemDetails.omit({ type: true }).partial()),
    exports.textItemDetails
        .pick({ type: true })
        .merge(exports.textItemDetails.omit({ type: true }).partial()),
])
    .optional();
const baseNewsletterItemTemplateData = zod_1.z.object({
    id: zod_1.z.number(),
    nextId: zod_1.z.number().nullable(),
    prevId: zod_1.z.number().nullable(),
    parentId: zod_1.z.number().nullable(),
    templateId: zod_1.z.number().nullable(),
    data: newsletterItemTemplateDataDetails,
});
// type CreateNewsletterItemTemplateData = z.infer<
//   typeof baseNewsletterItemTemplateData
// > & {
//   children: CreateNewsletterItemTemplateData[];
// };
// const newsletterItemTemplateDataInput: z.ZodType<CreateNewsletterItemTemplateData> =
//   baseNewsletterItemTemplateData.extend({
//     children: z.lazy(() => newsletterItemTemplateDataInput.array()),
//   });
exports.postNewsletterItemTemplateInput = zod_1.z.object({
    name: zod_1.z.string(),
    data: zod_1.z.array(zod_1.z.object({
        templateId: zod_1.z.number().optional(),
        temp: zod_1.z.object({
            id: zod_1.z.number(),
            parentId: zod_1.z.number().nullable(),
            nextId: zod_1.z.number().nullable(),
            prevId: zod_1.z.number().nullable(),
        }),
        data: newsletterItemTemplateDataDetails,
    })),
});
exports.getNewsletterItemTemplateInput = zod_1.z.object({
    id: zod_1.z.number(),
});
// export const updateNewsletterItemTemplateInput = z.object({
//   id: z.number(),
//   data: newsletterItemTemplateDataInput,
// });
exports.deleteNewsletterItemTemplateInput = zod_1.z.object({
    id: zod_1.z.number(),
});
//# sourceMappingURL=athena-common.js.map