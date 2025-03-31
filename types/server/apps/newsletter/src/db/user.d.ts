import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, TABLE_NAMES } from '@athena/db';
import { User } from '../types/db';
export interface UserTable {
    name: TABLE_NAMES.USER;
    columns: User;
}
export type SelectUser = Selectable<User>;
export type InsertUser = Insertable<User>;
export type UpdateUser = Updateable<User>;
export declare class UserTableClient extends Table<'user', 'id' | 'firstName' | 'lastName' | 'email'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'user', 'id' | 'firstName' | 'lastName' | 'email'>;
}
