import {
  Kysely,
  Transaction as KyselyTransaction,
  ColumnType,
  Selectable,
  CreateTableBuilder,
  sql,
} from 'kysely';
import { DB } from '../types/db';
export type Database = DB;

export { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres';
export { Pool } from 'pg';
export { sql, Expression, PostgresDialect, Kysely as DB } from 'kysely';

export type Created = ColumnType<string, string, never>;
export type Modified = ColumnType<string | null, never, string>;
export type Creator = ColumnType<number, number, never>;
export type Modifier = ColumnType<number | null, never, number>;

export const MetaColumns = [
  'created',
  'modified',
  'creatorId',
  'modifierId',
] as const;

export type Meta = {
  created: Created;
  modified: Modified;
  creatorId: Creator;
  modifierId: Modifier;
};

export type SelectMeta = Selectable<Meta>;

export enum TABLE_NAMES {
  LOCATION = 'location',
  COUNTRY = 'country',
  USER = 'user',
  FEDEREATED_CREDENTIAL = 'federated_credential',
  NEWSLETTER = 'newsletter',
  USER_NEWSLETTER = 'user_newsletter',
  USER_TEMPLATE = 'user_template',
  NEWSLETTER_POST = 'newsletter_post',
  NEWSLETTER_POST_MEDIA = 'newsletter_post_media',
  NEWSLETTER_POST_TEXT = 'newsletter_post_text',
  NEWSLETTER_POST_CONTAINER = 'newsletter_post_container',
  // NEWSLETTER_POST_TEMPLATE = 'newsletter_post_template',
  // NEWSLETTER_POST_TEMPLATE_DATA = 'newsletter_post_template_data',
  // NEWSLETTER_POST_TEMPLATE_MAPPING = 'newsletter_post_template_mapping',
}

export type META_TABLES =
  // | TABLE_NAMES.NEWSLETTER_POST_TEMPLATE
  TABLE_NAMES.NEWSLETTER_POST | TABLE_NAMES.NEWSLETTER;

export type TableName = keyof Database;
export type EntityTableName = Extract<
  TableName,
  'newsletter' | 'newsletter_post'
  // | 'newsletter_post_template'
>;

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

export abstract class Table<T extends TableName, C extends string = never>
  implements ITable<T, C>
{
  constructor(readonly db: DBConnection, readonly name: string) {}

  tableBuilder: CreateTableBuilder<T, C> = this.db.schema
    .createTable(this.name)
    .ifNotExists();

  async createTable() {
    return this.tableBuilder.execute();
  }
  async deleteTable() {
    this.db.schema.dropTable(this.name).ifExists().cascade().execute();
    return;
  }
  async truncateTable() {
    this.db.deleteFrom(this.name as any).execute();
    return;
  }
}

export class EntityTable<T extends EntityTableName, C extends string = never>
  extends Table<T, C | 'id' | 'created' | 'creatorId' | 'modified' | 'modifierId'>
  implements
    ITable<T, C | 'id' | 'created' | 'creatorId' | 'modified' | 'modifierId'>
{
  constructor(readonly db: DBConnection, readonly name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<T, C> = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
    .addColumn('created', 'text', (cb) => cb.notNull().defaultTo(sql`now()`))
    .addColumn('creatorId', 'integer', (col) =>
      col.notNull().references('user.id').onDelete('cascade')
    )
    .addColumn('modified', 'text')
    .addColumn('modifierId', 'integer', (col) =>
      col.references('user.id').onDelete('cascade')
    );

  async createTable() {
    return this.tableBuilder.execute();
  }
  async deleteTable() {
    this.db.schema.dropTable(this.name).ifExists().cascade().execute();
    return;
  }
}
