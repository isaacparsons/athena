import { Request, Response, NextFunction } from 'express';
import db from '../db/db';

export default (req: Request, res: Response, next: NextFunction) => {
  req.db = db;
  next();
};
