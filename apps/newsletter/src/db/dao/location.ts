import { DBConnection } from '../db';
import { NewLocation } from '../tables';

export class LocationDAO {
  constructor(readonly db: DBConnection) {}

  async post(location: NewLocation) {
    return this.db
      .insertInto('location')
      .values(location)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
