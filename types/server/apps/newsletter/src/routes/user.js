"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../trpc/trpc");
const logged_in_1 = require("../procedures/logged-in");
exports.userRouter = trpc_1.trpc.router({
    get: logged_in_1.loggedInProcedure.query(({ ctx }) => {
        return ctx.dao.user.get(ctx.user.userId);
    }),
    newsletters: logged_in_1.loggedInProcedure.query(({ ctx }) => {
        return ctx.dao.user.newsletters(ctx.user.userId);
    }),
    newsletterItemTemplates: logged_in_1.loggedInProcedure.query(({ ctx }) => {
        return ctx.dao.user.newsletterItemTemplates(ctx.user.userId);
    }),
});
//# sourceMappingURL=user.js.map