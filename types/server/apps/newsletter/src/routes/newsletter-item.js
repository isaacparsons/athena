"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const trpc_1 = require("../trpc/trpc");
const nanoid = tslib_1.__importStar(require("nanoid"));
const logged_in_1 = require("../procedures/logged-in");
const athena_common_1 = require("@athena/athena-common");
const router = trpc_1.trpc.router({
    get: logged_in_1.loggedInProcedure
        .input(athena_common_1.getNewsletterItemInput)
        .query(({ input, ctx }) => {
        return ctx.dao.newsletterItem.get(input.newsletterItemId);
    }),
    getItemUploadLinks: logged_in_1.loggedInProcedure
        .input(athena_common_1.getItemUploadLinksInput)
        .query(({ input, ctx }) => {
        return Promise.all(input.items.map((item) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const fileName = `${ctx.user.userId}-${nanoid.nanoid()}`;
            const url = yield ctx.gcs.getSignedUrl(fileName, 'write');
            return {
                url,
                id: item.id,
                fileName,
            };
        })));
    }),
    create: logged_in_1.loggedInProcedure
        .input(athena_common_1.postNewsletterItemInput)
        .mutation(({ input, ctx }) => {
        return ctx.dao.newsletterItem.post(ctx.user.userId, input);
    }),
    createBatch: logged_in_1.loggedInProcedure
        .input(athena_common_1.postNewsletterItemBatchInput)
        .mutation(({ input, ctx }) => {
        return ctx.dao.newsletterItem.postBatch(ctx.user.userId, input);
    }),
    update: logged_in_1.loggedInProcedure
        .input(athena_common_1.updateNewsletterItemInput)
        .mutation(({ input, ctx }) => {
        return ctx.dao.newsletterItem.update(ctx.user.userId, input);
    }),
    deleteMany: logged_in_1.loggedInProcedure
        .input(athena_common_1.deleteManyNewsletterItemsInput)
        .mutation(({ input, ctx }) => {
        return ctx.dao.newsletterItem.deleteMany(input);
    }),
});
exports.default = router;
//# sourceMappingURL=newsletter-item.js.map