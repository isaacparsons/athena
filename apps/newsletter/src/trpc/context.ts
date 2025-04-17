import { Request, Response } from 'express';
import { UserSession } from '@athena/common';
import { DB, DAO, IGCSManager, INotificationsManager } from '@backend/types';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { Kysely } from 'kysely';
import { AuthService } from '../services';

export type Context = {
  req: Request & {
    user?: UserSession;
    isAuthenticated(): () => boolean;
  };
  res: Response;
  gcs: IGCSManager;
  notifications: INotificationsManager;
  db: Kysely<DB>;
  dao: DAO;
  auth: typeof AuthService;
};

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    gcs: req.gcs,
    db: req.db,
    dao: req.dao,
    notifications: req.notifications,
    auth: AuthService,
  };
}
