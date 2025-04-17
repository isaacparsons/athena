import {
  TYPES,
  DB,
  ILocationDAO,
  INewsletterDAO,
  INewsletterPostDAO,
  ITemplateDAO,
  IUserDAO,
  IGCSManager,
  INotificationsManager,
} from '@backend/types';
import { NextFunction, Request, Response } from 'express';
import { Kysely } from 'kysely';
import { container } from '../inversify.config';

export const contextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.db = container.get<Kysely<DB>>(TYPES.DBClient);
  req.dao = {
    user: container.get<IUserDAO>(TYPES.IUserDAO),
    newsletter: container.get<INewsletterDAO>(TYPES.INewsletterDAO),
    location: container.get<ILocationDAO>(TYPES.ILocationDAO),
    newsletterPost: container.get<INewsletterPostDAO>(TYPES.INewsletterPostDAO),
    template: container.get<ITemplateDAO>(TYPES.ITemplateDAO),
  };
  req.gcs = container.get<IGCSManager>(TYPES.IGCSManager);
  req.notifications = container.get<INotificationsManager>(
    TYPES.INotificationsManager
  );
  next();
};
