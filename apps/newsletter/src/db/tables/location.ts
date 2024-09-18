import { Insertable, Selectable, Updateable, Generated, Kysely } from 'kysely';
import { IDbTable, DbTable } from './db-table';
import { Database } from '../db';
export interface LocationTable {
  id: Generated<number>;
  code: string;
  name: string;
  longitude: number;
  lattitude: number;
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
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('countryCode', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('longitude', 'double precision')
      .addColumn('lattitude', 'double precision')
      .execute();
    return;
  }
}
