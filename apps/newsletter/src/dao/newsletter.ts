import { inject, injectable, injectFromBase } from 'inversify';
import 'reflect-metadata';
import {
  Newsletter,
  CreateNewsletter,
  UpdateNewsletter,
  InviteNewsletterUser,
  NewsletterRole,
  ReadNewsletter,
  RemoveNewsletterMember,
} from '@athena/common';
import { creator, modifier, owner } from '@backend/db';
import {
  TYPES,
  DBConnection,
  DB,
  Transaction,
  jsonArrayFrom,
  NewsletterRow,
  INewsletterDAO,
  INewsletterPostDAO,
  IGCSManager,
} from '@backend/types';
import { mapDateRange, mapMeta, mapUser, mapUsers } from './mapping';
import { EntityDAO } from './entity';
import { Expression, expressionBuilder } from 'kysely';

@injectable()
@injectFromBase()
export class NewsletterDAO
  extends EntityDAO<'newsletter', NewsletterRow, Newsletter>
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
      name: row.name,
      dateRange: mapDateRange(row),
      owner: mapUser(row.owner),
      members: mapUsers(row.members),
      posts: row.posts,
    };
  }

  private members(newsletterId: Expression<number>) {
    const eb = expressionBuilder<DB, 'user_newsletter' | 'user'>();
    return jsonArrayFrom(
      eb
        .selectFrom('user_newsletter as un')
        .where('un.newsletterId', '=', newsletterId)
        .innerJoin('user', 'user.id', 'un.userId')
        .selectAll('user')
    ).as('members');
  }

  async readMember(userId: number, newsletterId: number) {
    return this.db
      .selectFrom('user_newsletter')
      .where(({ and, eb }) =>
        and([eb('userId', '=', userId), eb('newsletterId', '=', newsletterId)])
      )
      .selectAll()
      .executeTakeFirstOrThrow();
  }

  async read(id: number): Promise<ReadNewsletter> {
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
      const posts = await this.newsletterItemDAO.readByNewsletterId(id);
      return this.toEntity({ ...newsletter, posts });
    });
  }

  readByUserId(id: number): Promise<Newsletter[]> {
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
      const newsletter = await this.postEntities(trx, userId, [
        {
          name: input.name,
          startDate: input.dateRange?.start,
          endDate: input.dateRange?.end,
          ownerId: userId,
        },
      ])
        .returningAll()
        .executeTakeFirstOrThrow();
      await trx
        .insertInto('user_newsletter')
        .values({
          userId: userId,
          role: NewsletterRole.OWNER,
          newsletterId: newsletter.id,
        })
        .executeTakeFirstOrThrow();

      return newsletter.id;
    });
  }

  async update(userId: number, input: UpdateNewsletter): Promise<number> {
    const res = await this.updateEntity(this.db, userId, {
      id: input.id,
      name: input.name,
      startDate: input.dateRange?.start,
      endDate: input.dateRange?.end,
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

  async inviteUser(userId: number, input: InviteNewsletterUser) {
    const { newsletterId, email } = input;
    await this.db
      .insertInto('user_newsletter')
      .values({
        userId: this.db.selectFrom('user').select('id').where('email', '=', email),
        newsletterId,
        role: input.role,
      })
      .executeTakeFirstOrThrow();
  }

  async removeMember(input: RemoveNewsletterMember) {
    const { userId, newsletterId } = input;
    this.db
      .deleteFrom('user_newsletter')
      .where('userId', '=', userId)
      .where('newsletterId', '=', newsletterId)
      .executeTakeFirstOrThrow();
  }

  // async editPermissions(){}
}
