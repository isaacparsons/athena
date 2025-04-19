import { inject, injectable, injectFromBase } from 'inversify';
import 'reflect-metadata';
import {
  Newsletter,
  CreateNewsletter,
  UpdateNewsletter,
  NewsletterRole,
  ReadNewsletter,
  RemoveNewsletterMember,
  UpdateNewsletterMember,
  NewsletterMember,
  InviteNewsletterUsers,
} from '@athena/common';
import { creator, modifier, newsletterMember } from '@backend/db';
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
import { mapDateRange, mapMeta } from './mapping';
import { EntityDAO } from './entity';
import { AliasedRawBuilder, Expression, expressionBuilder } from 'kysely';

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
      owner: row.owner,
      members: row.members,
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
        .select([
          'un.role',
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.email',
        ])
    ).as('members') as AliasedRawBuilder<NewsletterMember[], 'members'>;
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
          newsletterMember(eb.val(id), eb.ref('ownerId')).as('owner'),
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
          newsletterMember(eb.val(id), eb.ref('n.ownerId')).as('owner'),
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
    const res = await this.deleteEntity(this.db, id);
    return res.id;
  }

  async inviteUsers(userId: number, input: InviteNewsletterUsers) {
    const { newsletterId, users } = input;

    await Promise.all(
      users.map((u) =>
        this.db
          .insertInto('user_newsletter')
          .values(({ selectFrom }) => ({
            userId: selectFrom('user').select('id').where('email', '=', u.email),
            newsletterId,
            role: u.role,
          }))
          .executeTakeFirstOrThrow()
      )
    );
  }

  async removeMember(input: RemoveNewsletterMember) {
    const { userId, newsletterId } = input;
    await this.db
      .deleteFrom('user_newsletter')
      .where('userId', '=', userId)
      .where('newsletterId', '=', newsletterId)
      .executeTakeFirstOrThrow();
  }

  async updateMember(input: UpdateNewsletterMember) {
    await this.db
      .updateTable('user_newsletter')
      .where(({ and, eb }) =>
        and([
          eb('newsletterId', '=', input.newsletterId),
          eb('userId', '=', input.userId),
        ])
      )
      .set('role', input.role)
      .executeTakeFirstOrThrow();
  }
}
