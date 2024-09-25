import { DBConnection } from '../db';

export class UserDAO {
  constructor(readonly db: DBConnection, readonly userId: number) {}
  async newsletters() {
    return this.db
      .selectFrom('userNewsletter as un')
      .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
      .where('un.userId', '=', this.userId)
      .selectAll('n')
      .execute();
  }

  async newsletter(id: number) {
    return this.db
      .selectFrom('userNewsletter as un')
      .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
      .where('un.userId', '=', this.userId)
      .where('un.newsletterId', '=', id)
      .selectAll('n')
      .executeTakeFirstOrThrow();
  }
}
