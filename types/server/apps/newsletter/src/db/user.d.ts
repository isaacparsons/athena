import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, UniqueId, ImmutableString, ImmutableNumber, TABLE_NAMES } from '@athena/db';
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
export declare class UserTableClient extends Table<'user', 'id' | 'firstName' | 'lastName' | 'email'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'user', 'id' | 'firstName' | 'lastName' | 'email'>;
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
export declare class UserNewsletterTableClient extends Table<'user_newsletter', 'userId' | 'newsletterId'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'user_newsletter', 'userId' | 'newsletterId'>;
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
export declare class UserTemplateTableClient extends Table<'user_template', 'userId' | 'newsletterItemTemplateId'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'user_template', 'userId' | 'newsletterItemTemplateId'>;
}
