"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const __1 = require("..");
exports.userRouter = __1.trpc.router({
    get: __1.loggedInProcedure.query(({ ctx }) => {
        return ctx.dao.user.get(ctx.user.userId);
    }),
    newsletters: __1.loggedInProcedure.query(({ ctx }) => {
        return ctx.dao.user.newsletters(ctx.user.userId);
    }),
    newsletterItemTemplates: __1.loggedInProcedure.query(({ ctx }) => {
        return ctx.dao.user.newsletterItemTemplates(ctx.user.userId);
    }),
});
//# sourceMappingURL=user.js.map