import { Kysely, Transaction as KyselyTransaction, ColumnType, Selectable, CreateTableBuilder } from 'kysely';
import { DB } from '../types/db';
export type Database = DB;
export { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres';
export { Pool } from 'pg';
export { sql, Expression, PostgresDialect, Kysely as DB } from 'kysely';
export type Created = ColumnType<string, string, never>;
export type Modified = ColumnType<string | null, never, string>;
export type Creator = ColumnType<number, number, never>;
export type Modifier = ColumnType<number | null, never, number>;
export declare const MetaColumns: readonly ["created", "modified", "creatorId", "modifierId"];
export type Meta = {
    created: Created;
    modified: Modified;
    creatorId: Creator;
    modifierId: Modifier;
};
export type SelectMeta = Selectable<Meta>;
export declare enum TABLE_NAMES {
    LOCATION = "location",
    COUNTRY = "country",
    USER = "user",
    FEDEREATED_CREDENTIAL = "federated_credential",
    NEWSLETTER = "newsletter",
    USER_NEWSLETTER = "user_newsletter",
    USER_TEMPLATE = "user_template",
    NEWSLETTER_POST = "newsletter_post",
    NEWSLETTER_POST_MEDIA = "newsletter_post_media",
    NEWSLETTER_POST_TEXT = "newsletter_post_text",
    NEWSLETTER_POST_CONTAINER = "newsletter_post_container"
}
export type META_TABLES = TABLE_NAMES.NEWSLETTER_POST | TABLE_NAMES.NEWSLETTER;
export type TableName = keyof Database;
export type EntityTableName = Extract<TableName, 'newsletter' | 'newsletter_post'>;
export type DBConnection = Kysely<Database>;
export type Transaction = KyselyTransaction<Database>;
export interface ITable<T extends TableName, C extends string = never> {
    db: DBConnection;
    name: string;
    tableBuilder: CreateTableBuilder<T, C>;
    createTable: () => Promise<void>;
    deleteTable: () => Promise<void>;
    truncateTable: () => Promise<void>;
}
export declare abstract class Table<T extends TableName, C extends string = never> implements ITable<T, C> {
    readonly db: DBConnection;
    readonly name: string;
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<T, C>;
    createTable(): Promise<void>;
    deleteTable(): Promise<void>;
    truncateTable(): Promise<void>;
}
export declare class EntityTable<T extends EntityTableName, C extends string = never> extends Table<T, C | 'id' | 'created' | 'creatorId' | 'modified' | 'modifierId'> implements ITable<T, C | 'id' | 'created' | 'creatorId' | 'modified' | 'modifierId'> {
    readonly db: DBConnection;
    readonly name: string;
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<T, C>;
    createTable(): Promise<void>;
    deleteTable(): Promise<void>;
}
