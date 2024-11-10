import { Insertable, Selectable, Updateable, sql } from 'kysely';
import {
  DBConnection,
  Table,
  ITable,
  UniqueId,
  TABLE_NAMES,
  Meta,
} from '@athena/db';

export interface NewsletterItemTemplateTableColumns extends Meta {
  id: UniqueId;
  name: string;
}

export interface NewsletterItemTemplateTable {
  name: TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE;
  columns: NewsletterItemTemplateTableColumns;
}

export type SelectNewsletterItemTemplate =
  Selectable<NewsletterItemTemplateTableColumns>;
export type InsertNewsletterItemTemplate =
  Insertable<NewsletterItemTemplateTableColumns>;
export type UpdateNewsletterItemTemplate =
  Updateable<NewsletterItemTemplateTableColumns>;

export class NewsletterItemTemplateTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('name', 'varchar', (cb) => cb.notNull())
      .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo(sql`now()`))
      .addColumn('creatorId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade')
      )
      .addColumn('modified', 'timestamp')
      .addColumn('modifierId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade')
      )
      .execute();
    return;
  }
}

export interface NewsletterItemTemplateDataTableColumns {
  id: UniqueId;
  data: object | null;
  templateId: number | null;
  parentId: number | null;
  prevId: number | null;
  nextId: number | null;
}

export interface NewsletterItemTemplateDataTable {
  name: TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE_DATA;
  columns: NewsletterItemTemplateDataTableColumns;
}

export type SelectNewsletterItemTemplateData =
  Selectable<NewsletterItemTemplateDataTableColumns>;
export type InsertNewsletterItemTemplateData =
  Insertable<NewsletterItemTemplateDataTableColumns>;
export type UpdateNewsletterItemTemplateData =
  Updateable<NewsletterItemTemplateDataTableColumns>;

export class NewsletterItemTemplateDataTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('parentId', 'integer', (col) =>
        col.references('newsletter_item_template_data.id').onDelete('cascade')
      )
      .addColumn('nextId', 'integer', (col) =>
        col.references('newsletter_item_template_data.id').onDelete('cascade')
      )
      .addColumn('prevId', 'integer', (col) =>
        col.references('newsletter_item_template_data.id').onDelete('cascade')
      )
      .addColumn('templateId', 'integer', (col) =>
        col.references('newsletter_item_template.id').onDelete('cascade')
      )
      .addColumn('data', 'jsonb')
      .execute();
    return;
  }
}
