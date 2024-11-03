import { User } from '@athena/athena-common';
import { Connection as DBConnection, jsonObjectFrom } from '../db';

export class UserDAO {
  constructor(readonly db: DBConnection) {}

  async get(id: number): Promise<User> {
    const user = await this.db
      .selectFrom('user')
      .where(`user.id`, '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();

    const newsletters = await this.newsletters(user.id);
    const newsletterItemTemplates = await this.newsletterItemTemplates(user.id);
    return {
      ...user,
      newsletters,
      newsletterItemTemplates,
    };
  }
  async newsletters(userId: number) {
    const newsletters = await this.db
      .selectFrom('user_newsletter as un')
      .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
      .where('un.userId', '=', userId)
      .select((eb) => [
        'n.id',
        'n.created',
        'n.modified',
        'n.name',
        'n.startDate',
        'n.endDate',
        jsonObjectFrom(
          eb
            .selectFrom('user as creator')
            .selectAll('creator')
            .whereRef('n.creatorId', '=', 'creator.id')
        )
          .$notNull()
          .as('creator'),
        jsonObjectFrom(
          eb
            .selectFrom('user as modifier')
            .selectAll('modifier')
            .whereRef('n.modifierId', '=', 'modifier.id')
        ).as('modifier'),
        jsonObjectFrom(
          eb
            .selectFrom('user as owner')
            .selectAll('owner')
            .whereRef('n.ownerId', '=', 'owner.id')
        )
          .$notNull()
          .as('owner'),
      ])
      .execute();

    return newsletters.map((newsletter) => ({
      id: newsletter.id,
      meta: {
        created: newsletter.created,
        modified: newsletter.modified,
        creator: newsletter.creator,
        modifier: newsletter.modifier,
      },
      properties: {
        name: newsletter.name,
        dateRange: {
          start: newsletter.startDate,
          end: newsletter.endDate,
        },
      },
      owner: newsletter.owner,
    }));
  }

  async newsletterItemTemplates(userId: number) {
    const templates = await this.db
      .selectFrom('user_template as ut')
      .innerJoin(
        'newsletter_item_template as nit',
        'nit.id',
        'ut.newsletterItemTemplateId'
      )
      .select((eb) => [
        'nit.id',
        'nit.name',
        'nit.created',
        'nit.modified',
        jsonObjectFrom(
          eb
            .selectFrom('user as creator')
            .selectAll('creator')
            .whereRef('creator.id', '=', 'nit.creatorId')
        )
          .$notNull()
          .as('creator'),
        jsonObjectFrom(
          eb
            .selectFrom('user as modifier')
            .selectAll('modifier')
            .whereRef('modifier.id', '=', 'nit.modifierId')
        ).as('modifier'),
      ])
      .where('ut.userId', '=', userId)
      .execute();

    return templates.map((t) => ({
      id: t.id,
      name: t.name,
      meta: {
        created: t.created,
        modified: t.modified,
        creator: t.creator,
        modifier: t.modifier,
      },
    }));
  }
}
