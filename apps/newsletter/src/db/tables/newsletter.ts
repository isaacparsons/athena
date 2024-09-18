import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
  sql,
  Kysely,
} from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';

export interface NewsletterTable {
  id: Generated<number>;
  name: string;
  created: ColumnType<Date, string | undefined, never>;
  modified: ColumnType<Date, string | undefined>;
  ownerId: number;
  startDate: ColumnType<Date, string | undefined>;
  endDate: ColumnType<Date, string | undefined>;
}
export type Newsletter = Selectable<NewsletterTable>;
export type NewNewsletter = Insertable<NewsletterTable>;
export type NewsletterUpdate = Updateable<NewsletterTable>;

export class DbNewsletter extends DbTable implements IDbTable {
  constructor(db: Kysely<Database>, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('name', 'varchar', (cb) => cb.notNull())
      .addColumn('created', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .addColumn('modified', 'timestamp')
      .addColumn('ownerId', 'integer', (col) =>
        col.references('user.id').onDelete('cascade')
      )
      .addColumn('startDate', 'date')
      .addColumn('endDate', 'date')
      .execute();
    return;
  }
}
