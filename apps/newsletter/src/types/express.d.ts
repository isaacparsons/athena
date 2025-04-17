import { Kysely } from 'kysely';
import { Database } from '../src/db/db';
import { DAO, INotificationsManager } from './types';
import { IGCSManager } from '@backend/services';

declare global {
  namespace Express {
    interface User {
      email: string;
      userId: number;
      accessToken: string;
      refreshToken: string;
    }
    interface Request {
      db: Kysely<Database>;
      dao: DAO;
      gcs: IGCSManager;
      notifications: INotificationsManager;
      user?: UserSession;
      isAuthenticated(): this is AuthenticatedRequest;
    }
  }
}
