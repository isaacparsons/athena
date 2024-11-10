"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const common_1 = require("@athena/common");
const router = __1.trpc.router({
    get: __1.loggedInProcedure.input(common_1.getNewsletterInput).query(({ input, ctx }) => {
        return ctx.dao.newsletter.get(input.newsletterId);
    }),
    post: __1.loggedInProcedure.input(common_1.postNewsletterInput).mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.post(ctx.user.userId, input);
    }),
    update: __1.loggedInProcedure
        .input(common_1.updateNewsletterInput)
        .mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.update(ctx.user.userId, input);
    }),
    delete: __1.loggedInProcedure
        .input(common_1.deleteNewsletterInput)
        .mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.delete(ctx.user.userId, input.id);
    }),
});
exports.default = router;
//# sourceMappingURL=newsletter.js.map