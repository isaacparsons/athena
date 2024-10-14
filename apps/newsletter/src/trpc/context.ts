import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { dbClient } from '../db/client';
import { UserDAO } from '../dao/user';
import { NewsletterDAO } from '../dao/newsletter';
import { GCSManager } from '../services/gcs';
import { LocationDAO } from '../dao/location';
import { NewsletterItemDAO } from '../dao/newsletter-item';
import { NewsletterItemDetailsDAO } from '../dao/newsletter-item-details';
import { Request, Response } from 'express';
import { UserSession } from '@athena/athena-common';

const gcs = new GCSManager();

const locationDAO = new LocationDAO(dbClient);
const newsletterItemDetailsDAO = new NewsletterItemDetailsDAO(dbClient);
const newsletterItemDAO = new NewsletterItemDAO(
  dbClient,
  locationDAO,
  newsletterItemDetailsDAO
);
const newsletterDAO = new NewsletterDAO(dbClient, gcs, newsletterItemDAO);
const userDAO = new UserDAO(dbClient);

export function createContext({
  req,
  res,
}: {
  req: Request & {
    user?: UserSession;
    isAuthenticated(): () => boolean;
  };
  res: Response;
}) {
  return {
    req,
    res,
    gcs: gcs,
    db: dbClient,
    dao: {
      user: userDAO,
      newsletter: newsletterDAO,
      location: locationDAO,
      newsletterItem: newsletterItemDAO,
    },
  };
}
