import { Kysely } from 'kysely';
import { Database } from '../apps/newsletter/src/db/db';

declare global {
  namespace Express {
    interface Request {
      db: Kysely<Database>;
      user?: UserSession;
    }
  }
}
