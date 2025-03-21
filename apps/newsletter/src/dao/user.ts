import _ from 'lodash';
import { NewsletterBase, User } from '@athena/common';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { mapUser } from './mapping';
import { INewsletterDAO } from './newsletter';

export interface IUserDAO {
  get(id: number): Promise<User>;
  newsletters: (userId: number) => Promise<NewsletterBase[]>;
  // newsletterItemTemplates: (userId: number) => Promise<NewsletterPostTemplateBase[]>;
}

@injectable()
export class UserDAO implements IUserDAO {
  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.INewsletterDAO) readonly newsletterDAO: INewsletterDAO
  ) {}

  async get(id: number): Promise<User> {
    const user = await this.db
      .selectFrom('user')
      .where('user.id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();

    const newsletters = await this.newsletters(user.id);
    // const newsletterItemTemplates = await this.newsletterItemTemplates(user.id);
    return {
      ...mapUser(user),
      newsletters,
      // newsletterPostTemplates,
    };
  }

  async newsletters(userId: number): Promise<NewsletterBase[]> {
    return this.newsletterDAO.getByUserId(userId);
  }

  // async newsletterItemTemplates(
  //   userId: number
  // ): Promise<NewsletterPostTemplateBase[]> {
  //   const templates = await this.db
  //     .selectFrom('user_template as ut')
  //     .innerJoin(
  //       'newsletter_item_template as nit',
  //       'nit.id',
  //       'ut.newsletterItemTemplateId'
  //     )
  //     .select((eb) => [
  //       'nit.id',
  //       'nit.name',
  //       'nit.created',
  //       'nit.modified',
  //       creator(this.db, eb.ref('nit.creatorId')).as('creator'),
  //       modifier(this.db, eb.ref('nit.modifierId')).as('modifier'),
  //     ])
  //     .where('ut.userId', '=', userId)
  //     .execute();

  //   return templates.map((t) => ({
  //     id: t.id,
  //     name: t.name,
  //     meta: mapMeta(t),
  //   }));
  // }
}
