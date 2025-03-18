import { inject, injectable, injectFromBase } from 'inversify';
import 'reflect-metadata';
import _ from 'lodash';
import { INewsletterPostDAO } from '@athena/dao';
import {
  DBConnection,
  Database,
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
import { creator, modifier, owner } from '../util';
import { IGCSManager } from '@athena/services';
import { TYPES } from '../types/types';
import { mapDateRange, mapMeta, mapUser, mapUsers } from './mapping';
import { EntityDAO, IEntityDAO, EntityMetaRow } from './entity';
import { Expression, expressionBuilder } from 'kysely';

type NewsletterRow = EntityMetaRow &
  Omit<SelectNewsletter, 'modifierId' | 'creatorId' | 'locationId' | 'ownerId'> & {
    posts: Omit<NewsletterPostEntity, 'children'>[];
    owner: SelectUser;
    members: SelectUser[];
  };

export type INewsletterDAO = IEntityDAO<NewsletterRow, NewsletterEntity> & {
  get(id: number): Promise<NewsletterEntity>;
  getByUserId(id: number): Promise<Omit<NewsletterEntity, 'posts' | 'members'>[]>;
  create(userId: number, input: CreateNewsletter): Promise<number>;
  update(userId: number, input: UpdateNewsletter): Promise<number>;
  delete(userId: number, id: number): Promise<number>;
};

@injectable()
@injectFromBase()
export class NewsletterDAO
  extends EntityDAO<'newsletter', NewsletterRow, NewsletterEntity>
  implements INewsletterDAO
{
  tableName = 'newsletter' as any;

  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.IGCSManager) readonly gcs: IGCSManager,
    @inject(TYPES.INewsletterPostDAO) readonly newsletterItemDAO: INewsletterPostDAO
  ) {
    super();
  }

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

  private members(newsletterId: Expression<number>) {
    const eb = expressionBuilder<Database, 'user_newsletter' | 'user'>();
    return jsonArrayFrom(
      eb
        .selectFrom('user_newsletter as un')
        .where('un.newsletterId', '=', newsletterId)
        .innerJoin('user', 'user.id', 'un.userId')
        .selectAll('user')
    ).as('members');
  }

  async get(id: number): Promise<NewsletterEntity> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const newsletter = await this.selectEntity(trx)
        .select((eb) => [
          'name',
          'startDate',
          'endDate',
          owner(trx, eb.ref('ownerId')).as('owner'),
          this.members(eb.ref('newsletter.id')),
        ])
        .where('id', '=', id)
        .executeTakeFirstOrThrow(
          () => new Error(`newsletter with id: ${id} does not exist`)
        );
      const posts = await this.newsletterItemDAO.getByNewsletterId(id);
      return this.toEntity({ ...newsletter, posts });
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

  async create(userId: number, input: CreateNewsletter): Promise<number> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const newsletter = await this.postEntity(trx, userId, {
        name: input.properties.name,
        startDate: input.properties.dateRange?.start,
        endDate: input.properties.dateRange?.end,
        ownerId: userId,
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
    const res = await this.updateEntity(this.db, userId, input.id, {
      name: input.properties.name,
      startDate: input.properties.dateRange?.start,
      endDate: input.properties.dateRange?.end,
    })
      .returning('id')
      .where('id', '=', input.id)
      .executeTakeFirstOrThrow();
    return res.id;
  }

  async delete(userId: number, id: number): Promise<number> {
    const res = await this.deleteEntity(this.db)
      .where('id', '=', id)
      .where('ownerId', '=', userId)
      .returning('id')
      .executeTakeFirstOrThrow();

    return res.id;
  }
}
