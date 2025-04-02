import { NewsletterBase, TemplateBase, User } from '@athena/common';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { mapUser } from './mapping';
import { INewsletterDAO } from './newsletter';
import { ITemplateDAO } from './template';

export interface IUserDAO {
  get(id: number): Promise<User>;
  newsletters: (userId: number) => Promise<NewsletterBase[]>;
  templates: (userId: number) => Promise<TemplateBase[]>;
}

@injectable()
export class UserDAO implements IUserDAO {
  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.INewsletterDAO) readonly newsletterDAO: INewsletterDAO,
    @inject(TYPES.ITemplateDAO) readonly templateDAO: ITemplateDAO
  ) {}

  async get(id: number): Promise<User> {
    const user = await this.db
      .selectFrom('user')
      .where('user.id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();

    const newsletters = await this.newsletters(user.id);
    const templates = await this.templates(user.id);
    return {
      ...mapUser(user),
      newsletters,
      templates,
    };
  }

  async newsletters(userId: number): Promise<NewsletterBase[]> {
    return this.newsletterDAO.getByUserId(userId);
  }

  async templates(userId: number): Promise<TemplateBase[]> {
    return this.templateDAO.getByUserId(userId);
  }
}
