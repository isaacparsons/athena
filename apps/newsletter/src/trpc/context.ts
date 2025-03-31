import { Database, DB } from '@athena/db';
import {
  UserDAO,
  NewsletterDAO,
  LocationDAO,
  NewsletterPostDAO,
  // NewsletterPostTemplateDAO,
  INewsletterDAO,
  IUserDAO,
  ILocationDAO,
  INewsletterPostDAO,
  TemplateDAO,
  ITemplateDAO,
  // INewsletterPostTemplateDAO,
} from '@athena/dao';
import { GCSManager, IGCSManager } from '@athena/services';
import { Request, Response } from 'express';
import { UserSession } from '@athena/common';
import { container } from '../inversify.config';
import { TYPES } from '../types/types';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

// type ContextInput = {
//   req: Request & {
//     user?: UserSession;
//     isAuthenticated(): () => boolean;
//   };
//   res: Response;
// };

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
    newsletterPost: NewsletterPostDAO;
    template: TemplateDAO;
  };
};

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    gcs: container.get<IGCSManager>(TYPES.IGCSManager),
    db: container.get<DB<Database>>(TYPES.DBClient),
    dao: {
      user: container.get<IUserDAO>(TYPES.IUserDAO),
      newsletter: container.get<INewsletterDAO>(TYPES.INewsletterDAO),
      location: container.get<ILocationDAO>(TYPES.ILocationDAO),
      newsletterPost: container.get<INewsletterPostDAO>(TYPES.INewsletterPostDAO),
      template: container.get<ITemplateDAO>(TYPES.ITemplateDAO),
    },
  };
}
