import { TRPCError } from '@trpc/server';
import { parseEnv } from '../util/parse-env';
import { publicProcedure } from '../trpc/trpc';

const env = parseEnv();

export const loggedInProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  const adminSecret = ctx.req.headers['admin-secret'];
  if (adminSecret === env.app.adminSecret) {
    const admin = await ctx.db
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
  throw new TRPCError({ code: 'UNAUTHORIZED' });
});
