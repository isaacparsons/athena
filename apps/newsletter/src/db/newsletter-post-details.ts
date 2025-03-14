import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, TABLE_NAMES } from '@athena/db';
import {
  NewsletterPostContainer,
  NewsletterPostMedia,
  NewsletterPostText,
} from '../types/db';

export interface NewsletterPostMediaTable {
  name: TABLE_NAMES.NEWSLETTER_POST_MEDIA;
  columns: NewsletterPostMedia;
}

export type SelectNewsletterPostMedia = Selectable<NewsletterPostMedia>;
export type InsertNewsletterPostMedia = Insertable<NewsletterPostMedia>;
export type UpdateNewsletterPostMedia = Updateable<NewsletterPostMedia>;

export interface NewsletterPostTextTable {
  name: TABLE_NAMES.NEWSLETTER_POST_TEXT;
  columns: NewsletterPostText;
}

export type SelectNewsletterPostText = Selectable<NewsletterPostText>;
export type InsertNewsletterPostText = Insertable<NewsletterPostText>;
export type UpdateNewsletterPostText = Updateable<NewsletterPostText>;

export interface NewsletterPostContainerTable {
  name: TABLE_NAMES.NEWSLETTER_POST_CONTAINER;
  columns: NewsletterPostContainer;
}

export type SelectNewsletterPostContainer = Selectable<NewsletterPostContainer>;
export type InsertNewsletterPostContainer = Insertable<NewsletterPostContainer>;
export type UpdateNewsletterPostContainer = Updateable<NewsletterPostContainer>;

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

export class NewsletterPostContainerTableClient extends Table<
  'newsletter_post_container',
  'id' | 'name' | 'type' | 'newsletterPostId'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'newsletter_post_container',
    'id' | 'name' | 'type' | 'newsletterPostId'
  > = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('type', 'varchar', (col) => col.notNull())
    .addColumn('newsletterPostId', 'integer', (col) =>
      col
        .references(`${TABLE_NAMES.NEWSLETTER_POST}.id`)
        .notNull()
        .onDelete('cascade')
    );
}
