import { Kysely } from 'kysely';
import { Database } from '../src/db/db';

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}

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
      user?: UserSession;
      isAuthenticated(): this is AuthenticatedRequest;
    }
  }
}
