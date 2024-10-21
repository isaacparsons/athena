import { Insertable, Selectable, Updateable } from 'kysely';
import { Connection, Table, ITable, UniqueId, TABLE_NAMES } from '../types/db';
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
export declare class LocationTableClient extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
