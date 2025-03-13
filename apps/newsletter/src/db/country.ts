import { CreateTableBuilder, Insertable, Selectable } from 'kysely';
import {
  DBConnection,
  Table,
} from '@athena/db';
import { Country } from '../types/db';

export type SelectCountry = Selectable<Country>;
export type InsertCountry = Insertable<Country>;

export class CountryTableClient extends Table<
  'location',
  'id' | 'code' | 'name' | 'longitude' | 'latitude'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'location',
    'id' | 'code' | 'name' | 'longitude' | 'latitude'
  > = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
    .addColumn('code', 'varchar', (col) => col.notNull())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('longitude', 'double precision', (col) => col.notNull())
    .addColumn('latitude', 'double precision', (col) => col.notNull());
}
