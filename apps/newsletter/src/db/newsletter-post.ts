import { CreateTableBuilder, Insertable, Selectable, sql, Updateable } from 'kysely';
import { DBConnection, TABLE_NAMES, EntityTable } from '@athena/db';
import { NewsletterPost } from '../types/db';

export type SelectNewsletterPost = Selectable<NewsletterPost>;
export type InsertNewsletterPost = Insertable<NewsletterPost>;
export type UpdateNewsletterPost = Updateable<NewsletterPost>;

export class NewsletterPostTableClient extends EntityTable<
  'newsletter_post',
  'title' | 'newsletterId' | 'date' | 'locationId' | 'parentId' | 'nextId' | 'prevId'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'newsletter_post',
    | 'title'
    | 'newsletterId'
    | 'date'
    | 'locationId'
    | 'parentId'
    | 'nextId'
    | 'prevId'
  > = this.tableBuilder
    .addColumn('title', 'varchar', (cb) => cb.notNull())
    .addColumn('newsletterId', 'integer', (col) =>
      col.references(`${TABLE_NAMES.NEWSLETTER}.id`).notNull().onDelete('cascade')
    )
    .addColumn('date', 'text')
    .addColumn('locationId', 'integer', (col) =>
      col.references(`${TABLE_NAMES.LOCATION}.id`).onDelete('set null')
    )
    .addColumn('parentId', 'integer', (col) =>
      col.references(`${TABLE_NAMES.NEWSLETTER_POST}.id`).onDelete('cascade')
    )
    .addColumn(
      'nextId',
      'integer'
      // .references(`${TABLE_NAMES.NEWSLETTER_POST}.id`)
      // .unique()
      // .onDelete('set null')
      // .check(sql.raw(`UNIQUE (nextId) DEFERRABLE INITIALLY DEFERRED`))

      // .modifyEnd( )
    )
    .addColumn(
      'prevId',
      'integer'
      // (col) => col
      // .references(`${TABLE_NAMES.NEWSLETTER_POST}.id`)
      // .unique()
      // .onDelete('set null')
      // .modifyEnd(
      //   sql.raw(`
      //   , CONSTRAINT unique_prev_id
      //     UNIQUE DEFERRABLE INITIALLY DEFERRED
      // `)
      // )
      // .check(sql.raw(`UNIQUE (prevId) DEFERRABLE INITIALLY DEFERRED`))
      // .check(sql`UNIQUE (prevId) DEFERRABLE INITIALLY DEFERRED`)
    );

  // .modifyEnd(
  //   sql`
  //   ADD CONSTRAINT fk_prev_id
  //     FOREIGN KEY (prevId)
  //     REFERENCES ${this.name}(id)
  //     DEFERRABLE INITIALLY DEFERRED
  // `
  // );
}
// CONSTRAINT fk_prev FOREIGN KEY (prev_id) REFERENCES linked_list (id) ON DELETE SET NULL,
//TODO: add below check to item type
// (col) =>
//   col.check(
//     sql`(detailsType='text') OR (detailsType='video') OR (detailsType='photo')`
//   )
