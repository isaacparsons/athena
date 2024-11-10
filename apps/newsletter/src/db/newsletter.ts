import { Insertable, Selectable, Updateable, sql } from 'kysely';
import {
  DBConnection,
  Table,
  ITable,
  UniqueId,
  TABLE_NAMES,
  MutableForeignKey,
  MutableNullableDate,
  Meta,
} from '@athena/db';

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

export class NewsletterTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('name', 'varchar', (cb) => cb.notNull())
      .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo(sql`now()`))
      .addColumn('creatorId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade')
      )
      .addColumn('modified', 'timestamp')
      .addColumn('modifierId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade')
      )
      .addColumn('ownerId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).notNull().onDelete('restrict')
      )
      .addColumn('startDate', 'date')
      .addColumn('endDate', 'date')
      .execute();
    return;
  }
}
