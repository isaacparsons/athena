"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedInProcedure = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const server_1 = require("@trpc/server");
const util_1 = require("../../util");
const __1 = require("..");
const config = (0, util_1.getConfig)();
exports.loggedInProcedure = __1.publicProcedure.use((opts) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { ctx } = opts;
    // TODO:  fix all this
    // if (!ctx.req.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
    // return opts.next({
    //   ctx: {
    //     user: ctx.req.user,
    //   },
    // });
    const adminSecret = lodash_1.default.get(ctx, ['req', 'headers', 'admin-secret']);
    if (adminSecret === config.app.adminSecret) {
        const admin = yield ctx.db
            .selectFrom('user')
            .where('firstName', '=', 'SUPER')
            .where('lastName', '=', 'USER')
            .selectAll()
            .executeTakeFirstOrThrow(() => new Error('Admin user not found'));
        return opts.next({
            ctx: {
                user: {
                    email: admin.email,
                    userId: admin.id,
                    accessToken: '',
                    refreshToken: '',
                },
            },
        });
    }
    if (ctx.req.isAuthenticated()) {
        return opts.next({
            ctx: {
                user: ctx.req.user,
            },
        });
    }
    ctx.res.clearCookie(config.app.sessionCookieName);
    throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
}));
//# sourceMappingURL=logged-in.js.map