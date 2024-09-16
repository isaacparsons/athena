import { DBClient } from '../src/db/db';
import { drive_v3 } from 'googleapis';

declare global {
  namespace Express {
    interface Request {
      db: DBClient;
      user?: UserSession;
      googleDrive?: drive_v3.Drive;
    }
  }
}
