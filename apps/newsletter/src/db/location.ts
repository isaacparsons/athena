import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import {
  DBConnection, Table,
  TABLE_NAMES
} from '@athena/db';
import { Location } from '../types/db';

export interface LocationTable {
  name: TABLE_NAMES.LOCATION;
  columns: Location;
}

export type SelectLocation = Selectable<Location>;
export type InsertLocation = Insertable<Location>;
export type UpdateLocation = Updateable<Location>;

export class LocationTableClient extends Table<
  'location',
  'id' | 'countryCode' | 'name' | 'longitude' | 'latitude'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'location',
    'id' | 'countryCode' | 'name' | 'longitude' | 'latitude'
  > = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
    .addColumn('countryCode', 'varchar')
    .addColumn('name', 'varchar')
    .addColumn('longitude', 'double precision')
    .addColumn('latitude', 'double precision');
}
