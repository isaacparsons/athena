import { Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, ImmutableString, ImmutableNumber, TABLE_NAMES } from '@athena/db';
export interface UserTableColumns {
    id: UniqueId;
    firstName: string | null;
    lastName: string | null;
    email: ImmutableString;
}
export interface UserTable {
    name: TABLE_NAMES.USER;
    columns: UserTableColumns;
}
export type SelectUser = Selectable<UserTableColumns>;
export type InsertUser = Insertable<UserTableColumns>;
export type UpdateUser = Updateable<UserTableColumns>;
export declare class UserTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
export interface UserNewsletterTableColumns {
    userId: ImmutableNumber;
    newsletterId: ImmutableNumber;
}
export interface UserNewsletterTable {
    name: TABLE_NAMES.USER_NEWSLETTER;
    columns: UserNewsletterTableColumns;
}
export type SelectUserNewsletter = Selectable<UserNewsletterTableColumns>;
export type InsertUserNewsletter = Insertable<UserNewsletterTableColumns>;
export type UpdateUserNewsletter = Updateable<UserNewsletterTableColumns>;
export declare class UserNewsletterTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
export interface UserTemplateTableColumns {
    userId: ImmutableNumber;
    newsletterItemTemplateId: ImmutableNumber;
}
export interface UserTemplateTable {
    name: TABLE_NAMES.USER_TEMPLATE;
    columns: UserTemplateTableColumns;
}
export type SelectUserTemplate = Selectable<UserTemplateTableColumns>;
export type InsertUserTemplate = Insertable<UserTemplateTableColumns>;
export type UpdateUserTemplate = Updateable<UserTemplateTableColumns>;
export declare class UserTemplateTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
