import { CreateTableBuilder } from 'kysely';
import { DBConnection, Table } from '@backend/types';

export class LocationTableClient extends Table<
  'location',
  'id' | 'country' | 'name' | 'longitude' | 'latitude'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'location',
    'id' | 'country' | 'name' | 'longitude' | 'latitude'
  > = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
    .addColumn('country', 'varchar')
    .addColumn('name', 'varchar')
    .addColumn('longitude', 'double precision')
    .addColumn('latitude', 'double precision');
}
