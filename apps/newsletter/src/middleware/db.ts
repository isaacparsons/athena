import { Request, Response, NextFunction, RequestHandler } from 'express';
import { DBConnection } from '../db/db';

export default (db: DBConnection): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    req.db = db;
    next();
  };
