import { CreateTableBuilder } from 'kysely';
import { DBConnection, Table, TABLE_NAMES } from '@backend/types';

export class NewsletterPostMediaTableClient extends Table<
  'newsletter_post_media',
  'id' | 'name' | 'caption' | 'fileName' | 'format' | 'type' | 'newsletterPostId'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }
  tableBuilder: CreateTableBuilder<
    'newsletter_post_media',
    'id' | 'name' | 'caption' | 'fileName' | 'format' | 'type' | 'newsletterPostId'
  > = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('caption', 'varchar')
    .addColumn('fileName', 'varchar', (col) => col.notNull())
    .addColumn('format', 'varchar', (col) => col.notNull())
    .addColumn('type', 'varchar', (col) => col.notNull())
    .addColumn('newsletterPostId', 'integer', (col) =>
      col
        .references(`${TABLE_NAMES.NEWSLETTER_POST}.id`)
        .notNull()
        .onDelete('cascade')
    );
}

export class NewsletterPostTextTableClient extends Table<
  'newsletter_post_text',
  'id' | 'name' | 'link' | 'type' | 'description' | 'newsletterPostId'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'newsletter_post_text',
    'id' | 'name' | 'link' | 'type' | 'description' | 'newsletterPostId'
  > = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('link', 'varchar')
    .addColumn('type', 'varchar', (col) => col.notNull())
    .addColumn('description', 'varchar')
    .addColumn('newsletterPostId', 'integer', (col) =>
      col
        .references(`${TABLE_NAMES.NEWSLETTER_POST}.id`)
        .notNull()
        .onDelete('cascade')
    );
}
