"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("..");
const common_1 = require("@athena/common");
const router = __1.trpc.router({
    get: __1.loggedInProcedure.input(common_1.getInput).query((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ input, ctx }) {
        return yield ctx.dao.newsletter.get(input.id);
    })),
    create: __1.loggedInProcedure
        .input(common_1.createNewsletter)
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        return yield ctx.dao.newsletter.create(ctx.user.userId, input);
    })),
    update: __1.loggedInProcedure
        .input(common_1.updateNewsletter)
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        return yield ctx.dao.newsletter.update(ctx.user.userId, input);
    })),
    delete: __1.loggedInProcedure.input(common_1.deleteInput).mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        return yield ctx.dao.newsletter.delete(ctx.user.userId, input.id);
    })),
    inviteUser: __1.loggedInProcedure
        .input(common_1.inviteNewsletterUser)
        .mutation((_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ ctx, input }) {
        return ctx.dao.newsletter.inviteUser(ctx.user.userId, input);
    })),
});
exports.default = router;
//# sourceMappingURL=newsletter.js.map