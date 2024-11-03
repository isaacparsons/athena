import { Insertable, Selectable } from 'kysely';
import {
  Connection,
  Table,
  ITable,
  UniqueId,
  ImmutableString,
  ImmutableNumber,
  TABLE_NAMES,
} from '../db';

export interface CountryTableColumns {
  id: UniqueId;
  code: ImmutableString;
  name: ImmutableString;
  longitude: ImmutableNumber;
  lattitude: ImmutableNumber;
}

export const CountryTable = {
  tableName: TABLE_NAMES.COUNTRY,
  columns: ['id', 'code', 'name', 'longitude', 'lattitude'],
  id: `${TABLE_NAMES.COUNTRY}.id`,
  code: `${TABLE_NAMES.COUNTRY}.code`,
  name: `${TABLE_NAMES.COUNTRY}.name`,
  longtitude: `${TABLE_NAMES.COUNTRY}.longtitude`,
  lattitude: `${TABLE_NAMES.COUNTRY}.lattitude`,
};

export type SelectCountry = Selectable<CountryTableColumns>;
export type InsertCountry = Insertable<CountryTableColumns>;

export class CountryTableClient extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }

  async createTable() {
    this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('code', 'varchar', (col) => col.notNull())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('longitude', 'double precision', (col) => col.notNull())
      .addColumn('lattitude', 'double precision', (col) => col.notNull())
      .execute();
    return;
  }
}
