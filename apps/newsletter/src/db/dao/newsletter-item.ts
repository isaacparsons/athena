import { DBConnection } from '../db';
import { NewNewsletterItem } from '../tables';

export class NewsletterItemDAO {
  constructor(readonly db: DBConnection, readonly userId: number) {}

  async delete(newsletterId: number, newsletterItemId: number) {
    await this.db
      .selectFrom('userNewsletter as un')
      .innerJoin('user as u', 'u.id', 'un.userId')
      .where('un.newsletterId', '=', newsletterId)
      .selectAll()
      .executeTakeFirstOrThrow(
        () => new Error(`must be a member of the newsletter to delete an item`)
      );

    await this.db
      .deleteFrom('newsletterItem')
      .where('id', '=', newsletterItemId)
      .execute();
  }

  async post(input: Omit<NewNewsletterItem, 'created' | 'creatorId'>) {
    return this.db
      .insertInto('newsletterItem')
      .values({
        created: new Date().toISOString(),
        creatorId: this.userId,
        ...input,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
