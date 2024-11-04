import { User } from '@athena/athena-common';
import { Connection as DBConnection, jsonObjectFrom } from '../db';
import { creator, modifier, user } from '../util';

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
        creator(this.db, eb.ref('n.creatorId')),
        modifier(this.db, eb.ref('n.modifierId')),
        user(this.db, eb.ref('n.ownerId'), 'owner'),
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
        creator(this.db, eb.ref('nit.creatorId')),
        modifier(this.db, eb.ref('nit.modifierId')),
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
