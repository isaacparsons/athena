import { Insertable, Selectable, Updateable, sql, Kysely } from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';
import {
  Created,
  Modified,
  MutableForeignKey,
  MutableNullableDate,
  UniqueId,
} from '.';

export interface NewsletterTable {
  id: UniqueId;
  name: string;
  created: Created;
  modified: Modified;
  ownerId: MutableForeignKey;
  startDate: MutableNullableDate;
  endDate: MutableNullableDate;
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
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('name', 'varchar', (cb) => cb.notNull())
      .addColumn('created', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .addColumn('modified', 'timestamp')
      .addColumn('ownerId', 'integer', (col) =>
        col.references('user.id').notNull().onDelete('restrict')
      )
      .addColumn('startDate', 'date')
      .addColumn('endDate', 'date')
      .execute();
    return;
  }
}
