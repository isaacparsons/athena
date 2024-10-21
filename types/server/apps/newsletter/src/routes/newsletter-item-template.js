"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("../trpc/trpc");
const logged_in_1 = require("../procedures/logged-in");
const athena_common_1 = require("@athena/athena-common");
const router = trpc_1.trpc.router({
    get: logged_in_1.loggedInProcedure
        .input(athena_common_1.getNewsletterItemTemplateInput)
        .query(({ input, ctx }) => {
        return ctx.dao.newsletterItemTemplate.get(input.id);
    }),
    create: logged_in_1.loggedInProcedure
        .input(athena_common_1.postNewsletterItemTemplateInput)
        .mutation(({ input, ctx }) => {
        return ctx.dao.newsletterItemTemplate.post(ctx.user.userId, input);
    }),
    // update: loggedInProcedure
    //   .input(updateNewsletterItemInput)
    //   .mutation(({ input, ctx }) => {
    //     return ctx.dao.newsletterItem.update(ctx.user.userId, input);
    //   }),
    // deleteMany: loggedInProcedure
    //   .input(deleteManyNewsletterItemsInput)
    //   .mutation(({ input, ctx }) => {
    //     return ctx.dao.newsletterItem.deleteMany(input);
    //   }),
});
exports.default = router;
//# sourceMappingURL=newsletter-item-template.js.map