import { Insertable, Selectable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, ImmutableString, ImmutableNumber, TABLE_NAMES } from '@athena/db';
export interface CountryTableColumns {
    id: UniqueId;
    code: ImmutableString;
    name: ImmutableString;
    longitude: ImmutableNumber;
    latitude: ImmutableNumber;
}
export declare const CountryTable: {
    tableName: TABLE_NAMES;
    columns: string[];
    id: string;
    code: string;
    name: string;
    longtitude: string;
    latitude: string;
};
export type SelectCountry = Selectable<CountryTableColumns>;
export type InsertCountry = Insertable<CountryTableColumns>;
export declare class CountryTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
