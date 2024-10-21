"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logged_in_1 = require("../procedures/logged-in");
const trpc_1 = require("../trpc/trpc");
const athena_common_1 = require("@athena/athena-common");
const router = trpc_1.trpc.router({
    get: logged_in_1.loggedInProcedure.input(athena_common_1.getNewsletterInput).query(({ input, ctx }) => {
        return ctx.dao.newsletter.get(input.newsletterId);
    }),
    post: logged_in_1.loggedInProcedure
        .input(athena_common_1.postNewsletterInput)
        .mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.post(ctx.user.userId, input);
    }),
    update: logged_in_1.loggedInProcedure
        .input(athena_common_1.updateNewsletterInput)
        .mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.update(ctx.user.userId, input);
    }),
    delete: logged_in_1.loggedInProcedure
        .input(athena_common_1.deleteNewsletterInput)
        .mutation(({ ctx, input }) => {
        return ctx.dao.newsletter.delete(ctx.user.userId, input.id);
    }),
});
exports.default = router;
//# sourceMappingURL=newsletter.js.map