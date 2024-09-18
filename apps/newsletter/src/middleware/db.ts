import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Kysely } from 'kysely';
import { Database } from '../db/db';

export default (db: Kysely<Database>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    req.db = db;
    next();
  };
