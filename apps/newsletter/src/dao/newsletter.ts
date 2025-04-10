import { inject, injectable, injectFromBase } from 'inversify';
import 'reflect-metadata';
import { INewsletterPostDAO } from '@backend/dao';
import {
  Newsletter,
  CreateNewsletter,
  UpdateNewsletter,
  InviteNewsletterUser,
  NewsletterRole,
  NewsletterPermissions,
  ReadNewsletter,
  ReadNewsletterPost,
} from '@athena/common';
import { creator, modifier, owner } from '@backend/db';
import { IGCSManager } from '@backend/services';
import {
  TYPES,
  DBConnection,
  DB,
  SelectNewsletter,
  SelectUser,
  Transaction,
  jsonArrayFrom,
} from '@backend/types';
import { mapDateRange, mapMeta, mapUser, mapUsers } from './mapping';
import { EntityDAO, IEntityDAO, EntityMetaRow } from './entity';
import { Expression, expressionBuilder } from 'kysely';

export const newsletterRolePermissionsMap: Record<
  NewsletterRole,
  NewsletterPermissions[]
> = {
  [NewsletterRole.READ_ONLY]: [NewsletterPermissions.READ],
  [NewsletterRole.OWNER]: [
    NewsletterPermissions.READ,
    NewsletterPermissions.WRITE,
    NewsletterPermissions.UPDATE,
    NewsletterPermissions.DELETE,
    NewsletterPermissions.COMMENT,
    NewsletterPermissions.EDIT_MEMBER,
    NewsletterPermissions.SHARE,
    NewsletterPermissions.INVITE,
  ],
  [NewsletterRole.EDITOR]: [
    NewsletterPermissions.READ,
    NewsletterPermissions.WRITE,
    NewsletterPermissions.UPDATE,
    NewsletterPermissions.DELETE,
    NewsletterPermissions.COMMENT,
    NewsletterPermissions.SHARE,
  ],
  [NewsletterRole.COMMENTOR]: [
    NewsletterPermissions.READ,
    NewsletterPermissions.COMMENT,
  ],
};

type NewsletterRow = EntityMetaRow &
  Omit<SelectNewsletter, 'modifierId' | 'creatorId' | 'locationId' | 'ownerId'> & {
    posts: Omit<ReadNewsletterPost, 'children'>[];
    owner: SelectUser;
    members: SelectUser[];
  };

export type INewsletterDAO = IEntityDAO<NewsletterRow, Newsletter> & {
  read(id: number): Promise<ReadNewsletter>;
  readByUserId(id: number): Promise<Newsletter[]>;
  create(userId: number, input: CreateNewsletter): Promise<number>;
  update(userId: number, input: UpdateNewsletter): Promise<number>;
  delete(userId: number, id: number): Promise<number>;
  inviteUser(userId: number, input: InviteNewsletterUser): Promise<void>;
};

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

  private validPermissions(
    role: NewsletterRole,
    permissions: NewsletterPermissions[]
  ) {
    const rolePermissions = newsletterRolePermissionsMap[role];
    return permissions.every((permission) => rolePermissions.includes(permission));
  }

  async inviteUser(userId: number, input: InviteNewsletterUser) {
    const { newsletterId, email } = input;
    const { role } = await this.db
      .selectFrom('user_newsletter')
      .select('role')
      .where(({ and, eb }) =>
        and([eb('userId', '=', userId), eb('newsletterId', '=', newsletterId)])
      )
      .executeTakeFirstOrThrow();
    if (
      !this.validPermissions(role as NewsletterRole, [NewsletterPermissions.INVITE])
    )
      throw new Error(`Do not have permissions`);

    await this.db
      .insertInto('user_newsletter')
      .values({
        userId: this.db.selectFrom('user').select('id').where('email', '=', email),
        newsletterId,
        role: input.role,
      })
      .executeTakeFirstOrThrow();
  }

  // async removeMember() {}

  // async editPermissions(){}
}
