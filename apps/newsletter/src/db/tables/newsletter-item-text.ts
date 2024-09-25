import { Insertable, Selectable, Updateable, Kysely, ColumnType } from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';
import { UniqueId } from '.';

export interface NewsletterItemTextTable {
  id: UniqueId;
  newsletterItemId: ColumnType<number, number, never>;
  link: string | null;
  title: string;
  description: string | null;
}
export type NewsletterItemText = Selectable<NewsletterItemTextTable>;
export type NewNewsletterItemText = Insertable<NewsletterItemTextTable>;
export type NewsletterItemTextUpdate = Updateable<NewsletterItemTextTable>;

export class DbNewsletterItemText extends DbTable implements IDbTable {
  constructor(db: Kysely<Database>, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('newsletterItemId', 'integer', (col) =>
        col.references('newsletterItem.id').onDelete('cascade').notNull()
      )
      .addColumn('title', 'varchar', (col) => col.notNull())
      .addColumn('link', 'varchar')
      .addColumn('description', 'varchar')
      .execute();
    return;
  }
}
