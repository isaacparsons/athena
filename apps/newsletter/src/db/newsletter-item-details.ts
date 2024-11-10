import { Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, TABLE_NAMES } from '@athena/db';
import { MediaFormat, NewsletterItemTypeName } from '@athena/common';

interface NewsletterItemDetailsBase {
  id: UniqueId;
  type: NewsletterItemTypeName;
  newsletterItemId: number;
}

export interface NewsletterItemMediaTableColumns extends NewsletterItemDetailsBase {
  type: NewsletterItemTypeName.Media;
  name: string;
  caption: string | null;
  fileName: string;
  format: MediaFormat;
}

export interface NewsletterItemMediaTable {
  name: TABLE_NAMES.NEWSLETTER_ITEM_MEDIA;
  columns: NewsletterItemMediaTableColumns;
}

export type SelectNewsletterItemMedia = Selectable<NewsletterItemMediaTableColumns>;
export type InsertNewsletterItemMedia = Insertable<NewsletterItemMediaTableColumns>;
export type UpdateNewsletterItemMedia = Updateable<NewsletterItemMediaTableColumns>;

export interface NewsletterItemTextTableColumns extends NewsletterItemDetailsBase {
  type: NewsletterItemTypeName.Text;
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

export interface NewsletterItemContainerTableColumns
  extends NewsletterItemDetailsBase {
  type: NewsletterItemTypeName.Container;
  name: string;
}

export interface NewsletterItemContainerTable {
  name: TABLE_NAMES.NEWSLETTER_ITEM_CONTAINER;
  columns: NewsletterItemContainerTableColumns;
}

export type SelectNewsletterItemContainer =
  Selectable<NewsletterItemContainerTableColumns>;
export type InsertNewsletterItemContainer =
  Insertable<NewsletterItemContainerTableColumns>;
export type UpdateNewsletterItemContainer =
  Updateable<NewsletterItemContainerTableColumns>;

export class NewsletterItemMediaTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('caption', 'varchar')
      .addColumn('fileName', 'varchar', (col) => col.notNull())
      .addColumn('format', 'varchar', (col) => col.notNull())
      .addColumn('type', 'varchar', (col) => col.notNull())
      .addColumn('newsletterItemId', 'integer', (col) =>
        col
          .references(`${TABLE_NAMES.NEWSLETTER_ITEM}.id`)
          .notNull()
          .onDelete('cascade')
      )
      .execute();
    return;
  }
}

export class NewsletterItemTextTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('link', 'varchar')
      .addColumn('type', 'varchar', (col) => col.notNull())
      .addColumn('description', 'varchar')
      .addColumn('newsletterItemId', 'integer', (col) =>
        col
          .references(`${TABLE_NAMES.NEWSLETTER_ITEM}.id`)
          .notNull()
          .onDelete('cascade')
      )
      .execute();
    return;
  }
}

export class NewsletterItemContainerTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('type', 'varchar', (col) => col.notNull())
      .addColumn('newsletterItemId', 'integer', (col) =>
        col
          .references(`${TABLE_NAMES.NEWSLETTER_ITEM}.id`)
          .notNull()
          .onDelete('cascade')
      )
      .execute();
    return;
  }
}
