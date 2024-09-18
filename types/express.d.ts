import { Kysely } from 'kysely';
import { Database, DBClient } from '../apps/newsletter/src/db/db';
import { drive_v3 } from 'googleapis';

declare global {
  namespace Express {
    interface Request {
      db: Kysely<Database>;
      user?: UserSession;
      googleDrive?: drive_v3.Drive;
    }
  }
}
