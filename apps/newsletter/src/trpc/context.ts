import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { dbClient } from '../db/client';
import { UserDAO } from '../dao/user';
import { NewsletterDAO } from '../dao/newsletter';
import { GCSManager } from '../services/gcs';
import { LocationDAO } from '../dao/location';
import { NewsletterItemDAO } from '../dao/newsletter-item';

export function createContext({ req, res }: CreateExpressContextOptions) {
  const gcs = new GCSManager();

  const locationDAO = new LocationDAO(dbClient);
  const newsletterItemDAO = new NewsletterItemDAO(dbClient, locationDAO, gcs);
  const newsletterDAO = new NewsletterDAO(dbClient, newsletterItemDAO);
  return {
    req,
    gcs: gcs,
    db: dbClient,
    dao: {
      user: new UserDAO(dbClient),
      newsletter: newsletterDAO,
      location: locationDAO,
      newsletterItem: new NewsletterItemDAO(dbClient, locationDAO, gcs),
    },
  };
}
