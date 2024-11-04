import { Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, TABLE_NAMES } from '../db';
import { NewsletterItemTypeName } from '@athena/athena-common';
interface NewsletterItemDetailsBase {
  id: UniqueId;
  type: NewsletterItemTypeName;
  newsletterItemId: number;
}
export interface NewsletterItemMediaTableColumns extends NewsletterItemDetailsBase {
  type: 'media';
  name: string;
  caption: string | null;
  fileName: string;
}
export interface NewsletterItemMediaTable {
  name: TABLE_NAMES.NEWSLETTER_ITEM_MEDIA;
  columns: NewsletterItemMediaTableColumns;
}
export type SelectNewsletterItemMedia = Selectable<NewsletterItemMediaTableColumns>;
export type InsertNewsletterItemMedia = Insertable<NewsletterItemMediaTableColumns>;
export type UpdateNewsletterItemMedia = Updateable<NewsletterItemMediaTableColumns>;
export interface NewsletterItemTextTableColumns extends NewsletterItemDetailsBase {
  type: 'text';
  name: string;
  description: string | null;
  link: string | null;
}
export interface NewsletterItemTextTable {
  name: TABLE_NAMES.NEWSLETTER_ITEM_TEXT;
  columns: NewsletterItemTextTableColumns;
}
export type SelectNewsletterItemText = Selectable<NewsletterItemTextTableColumns>;
export type InsertNewsletterItemText = Insertable<NewsletterItemTextTableColumns>;
export type UpdateNewsletterItemText = Updateable<NewsletterItemTextTableColumns>;
export declare class NewsletterItemMediaTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string);
  createTable(): Promise<void>;
}
export declare class NewsletterItemTextTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string);
  createTable(): Promise<void>;
}
export {};
