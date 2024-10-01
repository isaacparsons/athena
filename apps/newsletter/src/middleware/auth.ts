import { Request, Response, NextFunction, RequestHandler } from 'express';

import { formatResponseError } from '../util/response-format';
import { parseEnv } from '../util/parse-env';
import { UserSession } from '../types/server';

export interface AuthenticatedRequest extends Request {
  user: UserSession;
}

const env = parseEnv();

export function isAuthenticated(
  handler: (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => void
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const adminSecret = req.headers['admin-secret'];
    if (adminSecret === env.app.adminSecret) {
      const admin = await req.db
        .selectFrom('user')
        .where('firstName', '=', 'SUPER')
        .where('lastName', '=', 'USER')
        .selectAll()
        .executeTakeFirstOrThrow(() => new Error('Admin user not found'));

      const authReq = {
        ...req,
        user: {
          email: admin.email,
          userId: admin.id,
          accessToken: '',
          refreshToken: '',
        },
      };
      return handler(authReq as AuthenticatedRequest, res, next);
    }

    if (req.isAuthenticated() || adminSecret === env.app.adminSecret) {
      const authReq = req as AuthenticatedRequest;
      return handler(authReq, res, next);
    }
    console.log('Not authenticated!!!');
    res.clearCookie(env.app.sessionCookieName);
    res.send(formatResponseError(new Error('Not authenticated')));
  };
}
