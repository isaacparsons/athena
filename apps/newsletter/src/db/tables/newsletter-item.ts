import {
  Insertable,
  Selectable,
  Updateable,
  ColumnType,
  sql,
  Kysely,
} from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';
import { Created, Modified, UniqueId } from '.';

export interface NewsletterItemTable {
  id: UniqueId;
  newsletterId: ColumnType<number, number, never>;
  title: string;
  date: string | null;
  created: Created;
  modified: Modified;
  creatorId: ColumnType<number, number, never>;
  modifierId: ColumnType<number | null, never, number>;
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
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('title', 'varchar', (cb) => cb.notNull())
      .addColumn('newsletterId', 'integer', (col) =>
        col.references('newsletter.id').notNull().onDelete('cascade')
      )
      .addColumn('date', 'timestamp')
      .addColumn('created', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .addColumn('creatorId', 'integer', (cb) =>
        cb.references('user.id').notNull()
      )
      .addColumn('modified', 'timestamp')
      .addColumn('modifierId', 'integer', (cb) => cb.references('user.id'))
      .execute();
    return;
  }
}
