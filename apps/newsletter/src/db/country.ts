import { Insertable, Selectable } from 'kysely';
import {
  DBConnection,
  Table,
  ITable,
  UniqueId,
  ImmutableString,
  ImmutableNumber,
  TABLE_NAMES,
} from '@athena/db';

export interface CountryTableColumns {
  id: UniqueId;
  code: ImmutableString;
  name: ImmutableString;
  longitude: ImmutableNumber;
  latitude: ImmutableNumber;
}

export const CountryTable = {
  tableName: TABLE_NAMES.COUNTRY,
  columns: ['id', 'code', 'name', 'longitude', 'latitude'],
  id: `${TABLE_NAMES.COUNTRY}.id`,
  code: `${TABLE_NAMES.COUNTRY}.code`,
  name: `${TABLE_NAMES.COUNTRY}.name`,
  longtitude: `${TABLE_NAMES.COUNTRY}.longtitude`,
  latitude: `${TABLE_NAMES.COUNTRY}.latitude`,
};

export type SelectCountry = Selectable<CountryTableColumns>;
export type InsertCountry = Insertable<CountryTableColumns>;

export class CountryTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
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
      .addColumn('latitude', 'double precision', (col) => col.notNull())
      .execute();
    return;
  }
}
