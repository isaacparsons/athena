import _ from 'lodash'
import { TRPCError } from '@trpc/server';
import { getConfig } from '../../util';
import { publicProcedure } from '..';

const config = getConfig();

export const loggedInProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  // TODO:  fix all this
  // if (!ctx.req.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  // return opts.next({
  //   ctx: {
  //     user: ctx.req.user,
  //   },
  // });

  const adminSecret = _.get(ctx, ['req', 'headers', 'admin-secret'])
  if (adminSecret === config.app.adminSecret) {
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
  ctx.res.clearCookie(config.app.sessionCookieName);
  throw new TRPCError({ code: 'UNAUTHORIZED' });
});
