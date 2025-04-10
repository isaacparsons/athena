import {
  UserDAO,
  NewsletterDAO,
  LocationDAO,
  NewsletterPostDAO,
  INewsletterDAO,
  IUserDAO,
  ILocationDAO,
  INewsletterPostDAO,
  TemplateDAO,
  ITemplateDAO,
} from '@backend/dao';
import { GCSManager, IGCSManager } from '@backend/services';
import { Request, Response } from 'express';
import { UserSession } from '@athena/common';
import { container } from '../inversify.config';
import { TYPES, DB } from '@backend/types';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { Kysely } from 'kysely';

export type Context = {
  req: Request & {
    user?: UserSession;
    isAuthenticated(): () => boolean;
  };
  res: Response;
  gcs: GCSManager;
  db: Kysely<DB>;
  dao: {
    user: UserDAO;
    newsletter: NewsletterDAO;
    location: LocationDAO;
    newsletterPost: NewsletterPostDAO;
    template: TemplateDAO;
  };
};

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    gcs: container.get<IGCSManager>(TYPES.IGCSManager),
    db: req.db, //container.get<Kysely<DB>>(TYPES.DBClient),
    dao: {
      user: container.get<IUserDAO>(TYPES.IUserDAO),
      newsletter: container.get<INewsletterDAO>(TYPES.INewsletterDAO),
      location: container.get<ILocationDAO>(TYPES.ILocationDAO),
      newsletterPost: container.get<INewsletterPostDAO>(TYPES.INewsletterPostDAO),
      template: container.get<ITemplateDAO>(TYPES.ITemplateDAO),
    },
  };
}
