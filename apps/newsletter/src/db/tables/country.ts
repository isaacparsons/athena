import { Insertable, Selectable, Kysely, Generated } from 'kysely';
import { IDbTable, DbTable } from './db-table';
import { Database } from '../db';

export interface CountryTable {
  id: Generated<number>;
  code: string;
  name: string;
  longitude: number;
  lattitude: number;
}
export type Country = Selectable<CountryTable>;
export type NewCountry = Insertable<CountryTable>;

export class DbCountry extends DbTable implements IDbTable {
  constructor(db: Kysely<Database>, name: string) {
    super(db, name);
  }

  async createTable() {
    this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('code', 'varchar', (col) => col.notNull())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('longitude', 'double precision', (col) => col.notNull())
      .addColumn('lattitude', 'double precision', (col) => col.notNull())
      .execute();
    return;
  }
}
