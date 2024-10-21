"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedInProcedure = void 0;
const tslib_1 = require("tslib");
const server_1 = require("@trpc/server");
const parse_env_1 = require("../util/parse-env");
const trpc_1 = require("../trpc/trpc");
const env = (0, parse_env_1.parseEnv)();
exports.loggedInProcedure = trpc_1.publicProcedure.use((opts) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { ctx } = opts;
    // TODO:  fix all this
    // if (!ctx.req.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
    // return opts.next({
    //   ctx: {
    //     user: ctx.req.user,
    //   },
    // });
    const adminSecret = ctx.req.headers['admin-secret'];
    if (adminSecret === env.app.adminSecret) {
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
    ctx.res.clearCookie(env.app.sessionCookieName);
    throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
}));
//# sourceMappingURL=logged-in.js.map