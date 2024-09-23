import { Insertable, Selectable, Updateable, Kysely } from 'kysely';
import { IDbTable, DbTable } from './db-table';
import { Database } from '../db';
import { UniqueId } from '.';
export interface LocationTable {
  id: UniqueId;
  countryCode: string | null;
  name: string | null;
  longitude: number | null;
  lattitude: number | null;
}
export type Location = Selectable<LocationTable>;
export type NewLocation = Insertable<LocationTable>;
export type LocationUpdate = Updateable<LocationTable>;

export class DbLocation extends DbTable implements IDbTable {
  constructor(db: Kysely<Database>, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
      .addColumn('countryCode', 'varchar')
      .addColumn('name', 'varchar')
      .addColumn('longitude', 'double precision')
      .addColumn('lattitude', 'double precision')
      .execute();
    return;
  }
}
