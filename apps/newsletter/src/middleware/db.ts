import { Request, Response, NextFunction } from 'express';
import { DBClient } from '../db/db';

export default (dbClient: DBClient) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.db = dbClient;
    next();
  };
