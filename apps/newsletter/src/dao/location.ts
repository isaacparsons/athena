import { Connection } from '../types/db';
import { LocationInput } from '../types/api';

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
