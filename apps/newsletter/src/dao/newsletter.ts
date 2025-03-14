import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import _ from 'lodash';
import { INewsletterPostDAO } from '@athena/dao';
import {
  DBConnection,
  SelectNewsletter,
  SelectUser,
  Transaction,
  jsonArrayFrom,
} from '@athena/db';
import {
  Newsletter as NewsletterEntity,
  CreateNewsletter,
  UpdateNewsletter,
  NewsletterPost as NewsletterPostEntity,
} from '@athena/common';
import { creator, modifier, owner, selectEntityColumns } from '../util';
import { IGCSManager } from '@athena/services';
import { TYPES } from '../types/types';
import { mapDateRange, mapMeta, mapUser, mapUsers } from './mapping';
import { EntityDAO, EntityMetaRow } from './entity';

type NewsletterRow = EntityMetaRow &
  Omit<SelectNewsletter, 'modifierId' | 'creatorId' | 'locationId' | 'ownerId'> & {
    posts: Omit<NewsletterPostEntity, 'children'>[];
    owner: SelectUser;
    members: SelectUser[];
  };

export type INewsletterDAO = EntityDAO<NewsletterRow, NewsletterEntity> & {
  get(id: number): Promise<NewsletterEntity>;
  getByUserId(id: number): Promise<Omit<NewsletterEntity, 'posts' | 'members'>[]>;
  post(userId: number, input: CreateNewsletter): Promise<number>;
  update(userId: number, input: UpdateNewsletter): Promise<number>;
  delete(userId: number, id: number): Promise<number>;
};

@injectable()
export class NewsletterDAO implements INewsletterDAO {
  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.IGCSManager) readonly gcs: IGCSManager,
    @inject(TYPES.INewsletterPostDAO) readonly newsletterItemDAO: INewsletterPostDAO
  ) {}

  toEntity(row: NewsletterRow) {
    return {
      id: row.id,
      meta: mapMeta(row),
      properties: {
        name: row.name,
        dateRange: mapDateRange(row),
      },
      owner: mapUser(row.owner),
      members: mapUsers(row.members),
      posts: row.posts,
    };
  }

  async get(id: number): Promise<NewsletterEntity> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const newsletter = await selectEntityColumns(trx, 'newsletter')
        .where('newsletter.id', '=', id)
        .select((eb) => [
          'newsletter.name',
          'newsletter.startDate',
          'newsletter.endDate',
          owner(trx, eb.ref('newsletter.ownerId')).as('owner'),
          jsonArrayFrom(
            eb
              .selectFrom('user_newsletter as un')
              .where('un.newsletterId', '=', id)
              .innerJoin('user', 'user.id', 'un.userId')
              .selectAll('user')
          ).as('members'),
        ])
        .executeTakeFirstOrThrow(
          () => new Error(`newsletter with id: ${id} does not exist`)
        );

      const posts = await this.newsletterItemDAO.getByNewsletterId(id);

      return this.toEntity({
        ...newsletter,
        posts,
      });
    });
  }

  getByUserId(id: number): Promise<Omit<NewsletterEntity, 'posts' | 'members'>[]> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const newsletters = await trx
        .selectFrom('user_newsletter as un')
        .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
        .where('un.userId', '=', id)
        .select((eb) => [
          'n.id',
          'n.created',
          'n.modified',
          'n.name',
          'n.startDate',
          'n.endDate',
          modifier(trx, eb.ref('n.modifierId')).as('modifier'),
          creator(trx, eb.ref('n.creatorId')).as('creator'),
          owner(trx, eb.ref('n.ownerId')).as('owner'),
        ])
        .execute();

      return newsletters.map((n) => {
        const { posts, members, ...rest } = this.toEntity({
          ...n,
          posts: [],
          members: [],
        });
        return rest;
      });
    });
  }

  async post(userId: number, input: CreateNewsletter): Promise<number> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const newsletter = await trx
        .insertInto('newsletter')
        .values({
          name: input.properties.name,
          startDate: input.properties.dateRange?.start,
          endDate: input.properties.dateRange?.end,
          ownerId: userId,
          created: new Date().toISOString(),
          creatorId: userId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await trx
        .insertInto('user_newsletter')
        .values({
          userId: userId,
          newsletterId: newsletter.id,
        })
        .executeTakeFirstOrThrow();

      return newsletter.id;
    });
  }

  async update(userId: number, input: UpdateNewsletter): Promise<number> {
    const res = await this.db
      .updateTable('newsletter')
      .set({
        name: input.properties.name,
        startDate: input.properties.dateRange?.start,
        endDate: input.properties.dateRange?.end,
        modifierId: userId,
        modified: new Date().toISOString(),
      })
      .returning('id')
      .where('id', '=', input.id)
      .executeTakeFirstOrThrow();
    return res.id;
  }

  async delete(userId: number, id: number): Promise<number> {
    const res = await this.db
      .deleteFrom('newsletter')
      .where('id', '=', id)
      .where('ownerId', '=', userId)
      .returning('id')
      .executeTakeFirstOrThrow();

    return res.id;
  }
}
