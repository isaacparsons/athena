import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Connection } from '../types/db';
import { UserDAO } from '../dao/user';

// export const daoMiddleware =
//   (db: Connection): RequestHandler =>
//   (req: Request, res: Response, next: NextFunction) => {
//     req.dao = {
//       user: new UserDAO(db),
//     };
//     next();
//   };
