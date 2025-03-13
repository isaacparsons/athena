import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, UniqueId, TABLE_NAMES } from '@athena/db';
export interface LocationTableColumns {
    id: UniqueId;
    countryCode: string | null;
    name: string | null;
    longitude: number | null;
    latitude: number | null;
}
export interface LocationTable {
    name: TABLE_NAMES.LOCATION;
    columns: LocationTableColumns;
}
export type SelectLocation = Selectable<LocationTableColumns>;
export type InsertLocation = Insertable<LocationTableColumns>;
export type UpdateLocation = Updateable<LocationTableColumns>;
export declare class LocationTableClient extends Table<'location', 'id' | 'countryCode' | 'name' | 'longitude' | 'latitude'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'location', 'id' | 'countryCode' | 'name' | 'longitude' | 'latitude'>;
}
