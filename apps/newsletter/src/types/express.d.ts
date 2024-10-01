import { Kysely } from 'kysely';
import { Database } from '../src/db/db';
import { UserDAO } from '../dao/user';

type DAO = {
  user: UserDAO;
};

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
      dao: DAO;
      isAuthenticated(): this is AuthenticatedRequest;
    }
  }
}
