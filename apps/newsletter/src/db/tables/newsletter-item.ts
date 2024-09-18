import {
  Insertable,
  Selectable,
  Updateable,
  Generated,
  ColumnType,
  sql,
  Kysely,
} from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';

export interface NewsletterItemTable {
  id: Generated<number>;
  newsletterId: number;
  title: string;
  created: ColumnType<Date, string | undefined, never>;
  modified: ColumnType<Date, string | undefined, never>;
}
export type NewsletterItem = Selectable<NewsletterItemTable>;
export type NewNewsletterItem = Insertable<NewsletterItemTable>;
export type NewsletterItemUpdate = Updateable<NewsletterItemTable>;

export class DbNewsletterItem extends DbTable implements IDbTable {
  constructor(db: Kysely<Database>, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('title', 'varchar', (cb) => cb.notNull())
      .addColumn('newsletterId', 'integer', (col) =>
        col.references('newsletter.id').onDelete('cascade')
      )
      .addColumn('created', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .addColumn('modified', 'timestamp')
      .execute();
    return;
  }
}
