import { Request, Response, NextFunction, RequestHandler } from 'express';

import { formatResponseError } from '../util/response-format';
import { parseEnv } from '../util/parse-env';
import { UserSession } from '../../types/express';

export interface AuthenticatedRequest extends Request {
  user: UserSession;
}

const env = parseEnv();

// export function isAuthenticated(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   console.log('Not authenticated!!!');
//   res.clearCookie(env.app.sessionCookieName);
//   res.send(formatResponseError('Not authenticated'));
// }

export function isAuthenticated(
  handler: (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => void
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      const authReq = req as AuthenticatedRequest;
      return handler(authReq, res, next);
    }
    console.log('Not authenticated!!!');
    res.clearCookie(env.app.sessionCookieName);
    res.send(formatResponseError('Not authenticated'));
  };
  // if (req.isAuthenticated()) {
  //   return next();
  // }
  // console.log('Not authenticated!!!');
  // res.clearCookie(env.app.sessionCookieName);
  // res.send(formatResponseError('Not authenticated'));
}
