import postgres from 'postgres';

declare global {
  namespace Express {
    interface Request {
      db: postgres.Sql;
      userId?: number;
    }
  }
}
