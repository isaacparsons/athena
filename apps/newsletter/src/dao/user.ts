import { Connection as DBConnection } from '../types/db';

export class UserDAO {
  constructor(readonly db: DBConnection) {
    this.db.selectFrom('userNewsletter as un');
  }

  get(id: number) {
    return this.db
      .selectFrom('user')
      .where('user.id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();
  }
  // async newsletters() {
  //   return this.db
  //     .selectFrom('userNewsletter as un')
  //     .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
  //     .where('un.userId', '=', this.userId)
  //     .selectAll('n')
  //     .execute();
  // }

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
