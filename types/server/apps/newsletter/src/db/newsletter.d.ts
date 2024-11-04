import { Insertable, Selectable, Updateable } from 'kysely';
import {
  DBConnection,
  Table,
  ITable,
  UniqueId,
  TABLE_NAMES,
  MutableForeignKey,
  MutableNullableDate,
  Meta,
} from '../db';
export interface NewsletterTableColumns extends Meta {
  id: UniqueId;
  name: string;
  ownerId: MutableForeignKey;
  startDate: MutableNullableDate;
  endDate: MutableNullableDate;
}
export interface NewsletterTable {
  name: TABLE_NAMES.NEWSLETTER;
  columns: NewsletterTableColumns;
}
export type SelectNewsletter = Selectable<NewsletterTableColumns>;
export type InsertNewsletter = Insertable<NewsletterTableColumns>;
export type UpdateNewsletter = Updateable<NewsletterTableColumns>;
export declare class NewsletterTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string);
  createTable(): Promise<void>;
}
