import { Insertable, Selectable, Updateable, Generated, Kysely } from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';

export interface NewsletterItemPhotoTable {
  id: Generated<number>;
  newsletterItemId: number;
  link: string;
  name: string;
  caption: string | null;
  locationId: number | null;
  format: string | null;
  size: number | null;
}
export type NewsletterItemPhoto = Selectable<NewsletterItemPhotoTable>;
export type NewNewsletterItemPhoto = Insertable<NewsletterItemPhotoTable>;
export type NewsletterItemPhotoUpdate = Updateable<NewsletterItemPhotoTable>;

export class DbNewsletterItemPhoto extends DbTable implements IDbTable {
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
      .addColumn('link', 'varchar', (col) => col.notNull())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('caption', 'varchar')
      .addColumn('locationId', 'integer', (col) =>
        col.references('location.id').onDelete('set null')
      )
      .addColumn('format', 'varchar')
      .addColumn('size', 'integer')
      .execute();
    return;
  }
}
