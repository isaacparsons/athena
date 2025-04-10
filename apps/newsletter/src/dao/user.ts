import 'reflect-metadata';
import { Newsletter, ReadUser, Template } from '@athena/common';
import { inject, injectable } from 'inversify';
import { TYPES, DBConnection } from '@backend/types';
import { mapUser } from './mapping';
import { INewsletterDAO, ITemplateDAO } from '@backend/dao';

export interface IUserDAO {
  read(id: number): Promise<ReadUser>;
  newsletters: (userId: number) => Promise<Newsletter[]>;
  templates: (userId: number) => Promise<Template[]>;
}

@injectable()
export class UserDAO implements IUserDAO {
  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.INewsletterDAO) readonly newsletterDAO: INewsletterDAO,
    @inject(TYPES.ITemplateDAO) readonly templateDAO: ITemplateDAO
  ) {}

  async read(id: number): Promise<ReadUser> {
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

  async newsletters(userId: number): Promise<Newsletter[]> {
    return this.newsletterDAO.readByUserId(userId);
  }

  async templates(userId: number): Promise<Template[]> {
    return this.templateDAO.readByUserId(userId);
  }
}
