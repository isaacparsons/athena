import { DBConnection, Database } from '../db';
import { NewsletterItemPhotoDAO } from './newsletter-item-photo';
import { CreateNewsletterInput } from '../../routes/newsletter';
import { Transaction } from 'kysely';

export class NewsletterDAO {
  newsletterItemPhotoDAO: NewsletterItemPhotoDAO;
  constructor(
    readonly db: DBConnection,
    readonly userId: number,
    newsletterItemPhotoDAO?: NewsletterItemPhotoDAO
  ) {
    this.newsletterItemPhotoDAO =
      newsletterItemPhotoDAO ?? new NewsletterItemPhotoDAO(db);
  }
  async get() {
    return await this.db
      .selectFrom('userNewsletter as un')
      .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
      .where('un.userId', '=', this.userId)
      .selectAll('n')
      .execute();
  }

  async members(newsletterId: number) {
    return await this.db
      .selectFrom('userNewsletter as un')
      .innerJoin('user as u', 'u.id', 'un.userId')
      .where('un.newsletterId', '=', newsletterId)
      .selectAll('u')
      .execute();
  }

  async getById(id: number) {
    const newsletter = await this.db
      .selectFrom('userNewsletter as un')
      .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
      .where('un.userId', '=', this.userId)
      .where('un.newsletterId', '=', id)
      .selectAll('n')
      .executeTakeFirstOrThrow();

    const members = await this.db
      .selectFrom('userNewsletter as un')
      .innerJoin('user as u', 'u.id', 'un.userId')
      .where('un.newsletterId', '=', id)
      .selectAll('u')
      .execute();

    const items = await this.newsletterItemPhotoDAO.get(id);

    return {
      newsletter,
      members,
      items,
    };
  }

  async create(input: CreateNewsletterInput) {
    return await this.db
      .transaction()
      .execute(async (trx: Transaction<Database>) => {
        const newsletter = await trx
          .insertInto('newsletter')
          .values({
            ...input,
            ownerId: this.userId,
            created: new Date().toISOString(),
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        await trx
          .insertInto('userNewsletter')
          .values({
            userId: this.userId,
            newsletterId: newsletter.id,
          })
          .executeTakeFirstOrThrow();

        return newsletter;
      });
  }

  async delete(id: number) {
    const newsletter = await this.db
      .selectFrom('newsletter')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow(
        () => new Error(`newsletter with id: ${id} does not exist`)
      );

    if (newsletter.ownerId == this.userId) {
      throw new Error(`Only an owner can delete a newsletter`);
    }

    return this.db
      .deleteFrom('newsletter')
      .where('id', '=', id)
      .where('ownerId', '=', this.userId)
      .execute();
  }
}
