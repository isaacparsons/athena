export * from './country';
export * from './federated-credential';
export * from './location';
export * from './newsletter-item-details';
export * from './newsletter-item-template';
export * from './newsletter-item';
export * from './newsletter';
export * from './user';
export * from './client';
import {
  Kysely,
  Transaction as KyselyTransaction,
  ColumnType,
  Selectable,
} from 'kysely';
import {
  CountryTableColumns,
  FederatedCredentialTableColumns,
  LocationTableColumns,
  NewsletterItemMediaTableColumns,
  NewsletterItemTableColumns,
  NewsletterItemTemplateDataTableColumns,
  NewsletterItemTemplateTableColumns,
  NewsletterItemTextTableColumns,
  NewsletterTableColumns,
  UserNewsletterTableColumns,
  UserTableColumns,
  UserTemplateTableColumns,
} from '../db';
export { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres';
export { Pool } from 'pg';
export { sql, Expression, PostgresDialect, Kysely as DB } from 'kysely';
export type UniqueId = ColumnType<number, never, never>;
export type Created = ColumnType<string, string, never>;
export type Modified = ColumnType<string | null, never, string>;
export type Creator = ColumnType<number, number, never>;
export type Modifier = ColumnType<number | null, never, number>;
export type MutableNullableDate = ColumnType<
  string | null,
  string | null,
  string | null
>;
export type MutableDate = ColumnType<string, string, string>;
export type MutableForeignKey = ColumnType<number, number, number>;
export type ForeignKey = ColumnType<number, number, never>;
export type ImmutableString = ColumnType<string, string, never>;
export type ImmutableNumber = ColumnType<number, number, never>;
export type SelectMutableNullableDate = Selectable<MutableNullableDate>;
export type InsertMutableNullableDate = Selectable<MutableNullableDate>;
export type UpdateMutableNullableDate = Selectable<MutableNullableDate>;
export declare const MetaColumns: readonly [
  'created',
  'modified',
  'creatorId',
  'modifierId'
];
export type Meta = {
  created: Created;
  modified: Modified;
  creatorId: Creator;
  modifierId: Modifier;
};
export declare enum TABLE_NAMES {
  LOCATION = 'location',
  COUNTRY = 'country',
  USER = 'user',
  FEDEREATED_CREDENTIAL = 'federated_credential',
  NEWSLETTER = 'newsletter',
  USER_NEWSLETTER = 'user_newsletter',
  USER_TEMPLATE = 'user_template',
  NEWSLETTER_ITEM = 'newsletter_item',
  NEWSLETTER_ITEM_MEDIA = 'newsletter_item_media',
  NEWSLETTER_ITEM_TEXT = 'newsletter_item_text',
  NEWSLETTER_ITEM_TEMPLATE = 'newsletter_item_template',
  NEWSLETTER_ITEM_TEMPLATE_DATA = 'newsletter_item_template_data',
  NEWSLETTER_ITEM_TEMPLATE_MAPPING = 'newsletter_item_template_mapping',
}
export type META_TABLES =
  | TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE
  | TABLE_NAMES.NEWSLETTER_ITEM
  | TABLE_NAMES.NEWSLETTER;
export interface Database {
  user: UserTableColumns;
  newsletter: NewsletterTableColumns;
  user_newsletter: UserNewsletterTableColumns;
  user_template: UserTemplateTableColumns;
  newsletter_item: NewsletterItemTableColumns;
  newsletter_item_media: NewsletterItemMediaTableColumns;
  newsletter_item_text: NewsletterItemTextTableColumns;
  country: CountryTableColumns;
  federated_credential: FederatedCredentialTableColumns;
  location: LocationTableColumns;
  newsletter_item_template: NewsletterItemTemplateTableColumns;
  newsletter_item_template_data: NewsletterItemTemplateDataTableColumns;
}
export type DBConnection = Kysely<Database>;
export type Transaction = KyselyTransaction<Database>;
export interface ITable {
  db: DBConnection;
  name: string;
  createTable: () => Promise<void>;
  deleteTable: () => Promise<void>;
}
export declare abstract class Table implements ITable {
  db: DBConnection;
  name: string;
  constructor(db: DBConnection, name: string);
  createTable(): Promise<void>;
  deleteTable(): Promise<void>;
}
