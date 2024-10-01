import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { dbClient } from '../db/client';
import { UserDAO } from '../dao/user';
import { NewsletterDAO } from '../dao/newsletter';

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    db: dbClient,
    dao: {
      user: new UserDAO(dbClient),
      newsletter: new NewsletterDAO(dbClient),
    },
  };
}
