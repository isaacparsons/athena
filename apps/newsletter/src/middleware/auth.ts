import { Request, Response, NextFunction, RequestHandler } from 'express';
import { google } from 'googleapis';

import { drive_v3 } from 'googleapis';
import { UserSession } from '../routes/auth';

export interface AuthenticatedRequest extends Request {
  googleDrive: drive_v3.Drive;
  user: UserSession;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user['accessToken'] });
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    req.googleDrive = drive;
    if (!req.googleDrive) {
      throw new Error('not authenticated');
    }
    return next();
  }
  throw new Error('not authenticated');
}

// callback: (req, res): RequestHandler =>
// export function authedRoute(){
//   return async (req, res) =>
// }

// isAuthenticated, async (req, res) => {
//   const response = await req.googleDrive.files.list({
//     pageSize: 10,
//     fields: 'files(id, name)',
//   });

//   const files = response.data.files;
//   console.log(files);
//   res.send('GET: newsletters');
// }
