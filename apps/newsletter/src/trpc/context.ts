import { Request, Response } from 'express';
import { UserSession } from '@athena/common';
import { DB, DAO, IGCSManager } from '@backend/types';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { Kysely } from 'kysely';

export type Context = {
  req: Request & {
    user?: UserSession;
    isAuthenticated(): () => boolean;
  };
  res: Response;
  gcs: IGCSManager;
  db: Kysely<DB>;
  dao: DAO;
};

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    gcs: req.gcs,
    db: req.db,
    dao: req.dao,
  };
}
