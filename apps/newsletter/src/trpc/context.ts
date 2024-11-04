import { Database, DB } from '../db';
import {
  UserDAO,
  NewsletterDAO,
  LocationDAO,
  NewsletterItemDAO,
  NewsletterItemTemplateDAO,
  INewsletterDAO,
  IUserDAO,
  ILocationDAO,
  INewsletterItemDAO,
  INewsletterItemTemplateDAO,
} from '../dao';
import { GCSManager, IGCSManager } from '../services';
import { Request, Response } from 'express';
import { UserSession } from '@athena/athena-common';
import { container } from '../inversify.config';
import { TYPES } from '../types/types';

// const newsletterItemDetailsDAO = container.get<NewsletterItemDetailsDAO>(
//   NewsletterItemDetailsDAO
// );

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
  db: DB<Database>;
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
    gcs: container.get<IGCSManager>(TYPES.IGCSManager),
    db: container.get<DB<Database>>(TYPES.DBClient),
    dao: {
      user: container.get<IUserDAO>(TYPES.IUserDAO),
      newsletter: container.get<INewsletterDAO>(TYPES.INewsletterDAO),
      location: container.get<ILocationDAO>(TYPES.ILocationDAO),
      newsletterItem: container.get<INewsletterItemDAO>(TYPES.INewsletterItemDAO),
      newsletterItemTemplate: container.get<INewsletterItemTemplateDAO>(
        TYPES.INewsletterItemTemplateDAO
      ),
    },
  };
}
