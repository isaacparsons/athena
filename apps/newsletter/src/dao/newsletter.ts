import _ from 'lodash';
import { NewsletterItemDAO } from './newsletter-item';
import {
  Connection as DBConnection,
  Transaction,
  jsonArrayFrom,
  jsonObjectFrom,
} from '../types/db';
import { Newsletter } from '../types/api';
import { parseDateRange } from '../util/helpers';
import { creator, modifier, user } from '../util/db';
import {
  CreateNewsletterInput,
  UpdateNewsletterInput,
} from '../routes/newsletter';

export class NewsletterDAO {
  constructor(
    readonly db: DBConnection,
    readonly newsletterItemDAO: NewsletterItemDAO
  ) {}

  async get(id: number): Promise<Newsletter> {
    const newsletter = await this.db
      .selectFrom('newsletter as n')
      .where('n.id', '=', id)
      .selectAll()
      .select(({ ref }) => user(this.db, ref('n.ownerId')).as('owner'))
      .select(({ ref }) => creator(this.db, ref('n.creatorId')))
      .select(({ ref }) => modifier(this.db, ref('n.modifierId')))
      .select((eb) =>
        jsonArrayFrom(
          eb
            .selectFrom('userNewsletter as un')
            .whereRef('un.newsletterId', '=', 'n.id')
            .innerJoin('user', 'user.id', 'un.userId')
            .selectAll('user')
        ).as('members')
      )
      .executeTakeFirstOrThrow(
        () => new Error(`newsletter with id: ${id} does not exist`)
      );

    return {
      meta: {
        created: newsletter.created,
        modified: newsletter.modified,
        creator: newsletter.creator,
        modifier: newsletter.modifier,
      },
      properties: {
        name: newsletter.name,
        dateRange: parseDateRange(newsletter.startDate, newsletter.endDate),
      },
      owner: newsletter.owner,
      members: newsletter.members,
      items: [],
    };
  }

  async post(userId: number, input: CreateNewsletterInput) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const newsletter = await trx
        .insertInto('newsletter')
        .values({
          ...input,
          ownerId: userId,
          created: new Date().toISOString(),
          creatorId: userId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      await trx
        .insertInto('userNewsletter')
        .values({
          userId: userId,
          newsletterId: newsletter.id,
        })
        .executeTakeFirstOrThrow();
      return newsletter;
    });
  }

  async update(userId: number, input: UpdateNewsletterInput) {
    const inputWithoutId = _.omit(input, 'id');
    return this.db
      .updateTable('newsletter')
      .set({
        ...inputWithoutId,
        modifierId: userId,
        modified: new Date().toISOString(),
      })
      .where('id', '=', input.id)
      .executeTakeFirstOrThrow();
  }

  async delete(userId: number, id: number) {
    return this.db
      .deleteFrom('newsletter')
      .where('id', '=', id)
      .where('ownerId', '=', userId)
      .execute();
  }
}
