import { Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, TABLE_NAMES } from '../db';

export interface LocationTableColumns {
  id: UniqueId;
  countryCode: string | null;
  name: string | null;
  longitude: number | null;
  lattitude: number | null;
}

export interface LocationTable {
  name: TABLE_NAMES.LOCATION;
  columns: LocationTableColumns;
}

export type SelectLocation = Selectable<LocationTableColumns>;
export type InsertLocation = Insertable<LocationTableColumns>;
export type UpdateLocation = Updateable<LocationTableColumns>;

export class LocationTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
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
