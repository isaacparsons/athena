import { ColumnType, Insertable, Selectable, Updateable, sql } from 'kysely';
import {
  DBConnection,
  Table,
  ITable,
  UniqueId,
  TABLE_NAMES,
  Meta,
  MetaColumns,
} from '../db';

export interface NewsletterItemTableColumns extends Meta {
  id: UniqueId;
  newsletterId: ColumnType<number, number, never>;
  title: string;
  date: string | null;
  locationId: number | null;
  parentId: ColumnType<number | null, number | null, number | null>;
  nextItemId: ColumnType<number | null, number | null, number | null>;
  previousItemId: ColumnType<number | null, number | null, number | null>;
}

type TableInfo<T> = {
  name: TABLE_NAMES;
  columns: (keyof T)[];
};

export const NewsletterItemTableInfo: TableInfo<NewsletterItemTableColumns> = {
  name: TABLE_NAMES.NEWSLETTER_ITEM,
  columns: [
    ...MetaColumns,
    'id',
    'newsletterId',
    'title',
    'date',
    'locationId',
    'parentId',
    'nextItemId',
    'previousItemId',
  ],
};

export type SelectNewsletterItem = Selectable<NewsletterItemTableColumns>;
export type InsertNewsletterItem = Insertable<NewsletterItemTableColumns>;
export type UpdateNewsletterItem = Updateable<NewsletterItemTableColumns>;

export class NewsletterItemTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('title', 'varchar', (cb) => cb.notNull())
      .addColumn('newsletterId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.NEWSLETTER}.id`).notNull().onDelete('cascade')
      )
      .addColumn('date', 'timestamp')
      .addColumn('locationId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.LOCATION}.id`).onDelete('set null')
      )
      .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo(sql`now()`))
      .addColumn('creatorId', 'integer', (cb) =>
        cb.references(`${TABLE_NAMES.USER}.id`).notNull()
      )
      .addColumn('modified', 'timestamp')
      .addColumn('modifierId', 'integer', (cb) =>
        cb.references(`${TABLE_NAMES.USER}.id`)
      )
      .addColumn('parentId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('cascade')
      )
      .addColumn('nextItemId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('set null')
      )
      .addColumn('previousItemId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('set null')
      )
      .execute();
    return;
  }
}
//TODO: add below check to item type
// (col) =>
//   col.check(
//     sql`(detailsType='text') OR (detailsType='video') OR (detailsType='photo')`
//   )
