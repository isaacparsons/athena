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
import { NewsletterItemTemplateDAO } from '../dao/newsletter-item-template';

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

const newsletterItemTemplateDAO = new NewsletterItemTemplateDAO(dbClient);

type ContextInput = {
  req: Request & {
    user?: UserSession;
    isAuthenticated(): () => boolean;
  };
  res: Response;
};

export type Context = {
  req: Request & {
    user?: UserSession;
    isAuthenticated(): () => boolean;
  };
  res: Response;
  gcs: GCSManager;
  dao: {
    user: UserDAO;
    newsletter: NewsletterDAO;
    location: LocationDAO;
    newsletterItem: NewsletterItemDAO;
    newsletterItemTemplate: NewsletterItemTemplateDAO;
  };
};

export function createContext({ req, res }: ContextInput) {
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
      newsletterItemTemplate: newsletterItemTemplateDAO,
    },
  };
}
