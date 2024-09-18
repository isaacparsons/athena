import { Request, Response, NextFunction } from 'express';

import { drive_v3 } from 'googleapis';
import { UserSession } from '../routes/auth';
import { formatResponseError } from '../util/response-format';
import { parseEnv } from '../util/parse-env';

export interface AuthenticatedRequest extends Request {
  googleDrive: drive_v3.Drive;
  user: UserSession;
}

const env = parseEnv();

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('Not authenticated!!!');
  res.clearCookie(env.app.sessionCookieName);
  res.send(formatResponseError('Not authenticated'));
}
