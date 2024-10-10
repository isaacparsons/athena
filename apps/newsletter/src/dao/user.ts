import { User } from '@athena/athena-common';
import { Connection as DBConnection, jsonObjectFrom } from '../types/db';

export class UserDAO {
  constructor(readonly db: DBConnection) {
    this.db.selectFrom('userNewsletter as un');
  }

  async get(id: number): Promise<User> {
    const user = await this.db
      .selectFrom('user')
      .where('user.id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();

    const newsletters = await this.newsletters(user.id);
    return {
      ...user,
      newsletters,
    };
  }
  async newsletters(userId: number) {
    const newsletters = await this.db
      .selectFrom('userNewsletter as un')
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

  // async newsletter(id: number) {
  //   return this.db
  //     .selectFrom('userNewsletter as un')
  //     .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
  //     .where('un.userId', '=', this.userId)
  //     .where('un.newsletterId', '=', id)
  //     .selectAll('n')
  //     .executeTakeFirstOrThrow();
  // }
}
