import { CreateTableBuilder, Insertable, Selectable } from 'kysely';
import { DBConnection, Table } from '@athena/db';
import { Country } from '../types/db';
export type SelectCountry = Selectable<Country>;
export type InsertCountry = Insertable<Country>;
export declare class CountryTableClient extends Table<'location', 'id' | 'code' | 'name' | 'longitude' | 'latitude'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'location', 'id' | 'code' | 'name' | 'longitude' | 'latitude'>;
}
