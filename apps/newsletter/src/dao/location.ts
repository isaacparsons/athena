import { Connection } from '../types/db';
import { LocationInput } from '../routes/newsletter-item';

export class LocationDAO {
  constructor(readonly db: Connection) {}

  async post(input: LocationInput) {
    return this.db
      .insertInto('location')
      .values({
        ...input,
        name: input?.name ?? 'untitled',
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
