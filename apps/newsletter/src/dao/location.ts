import { Connection } from '../types/db';

export class LocationDAO {
  constructor(readonly db: Connection) {}

  // async post(location: NewLocation): Promise<Location> {
  //   return this.db
  //     .insertInto('location')
  //     .values(location)
  //     .returningAll()
  //     .executeTakeFirstOrThrow();
  // }
}
