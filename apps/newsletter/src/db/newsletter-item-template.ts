import { Insertable, Selectable, Updateable, sql } from 'kysely';
import { Connection, Table, ITable, UniqueId, TABLE_NAMES, Meta } from '../db';

export interface NewsletterItemTemplateTableColumns extends Meta {
  id: UniqueId;
  name: string;
}

export interface NewsletterItemTemplateTable {
  name: TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE;
  columns: NewsletterItemTemplateTableColumns;
}

export type SelectNewsletterItemTemplate =
  Selectable<NewsletterItemTemplateTableColumns>;
export type InsertNewsletterItemTemplate =
  Insertable<NewsletterItemTemplateTableColumns>;
export type UpdateNewsletterItemTemplate =
  Updateable<NewsletterItemTemplateTableColumns>;

export class NewsletterItemTemplateTableClient extends Table implements ITable {
  constructor(db: Connection, name: string) {
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
      .addColumn('creatorId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade')
      )
      .addColumn('modified', 'timestamp')
      .addColumn('modifierId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade')
      )
      .execute();
    return;
  }
}

export interface NewsletterItemTemplateDataTableColumns {
  id: UniqueId;
  data: object | null;
  templateId: number | null;
  parentId: number | null;
  prevId: number | null;
  nextId: number | null;
}

export interface NewsletterItemTemplateDataTable {
  name: TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE_DATA;
  columns: NewsletterItemTemplateDataTableColumns;
}

export type SelectNewsletterItemTemplateData =
  Selectable<NewsletterItemTemplateDataTableColumns>;
export type InsertNewsletterItemTemplateData =
  Insertable<NewsletterItemTemplateDataTableColumns>;
export type UpdateNewsletterItemTemplateData =
  Updateable<NewsletterItemTemplateDataTableColumns>;

export class NewsletterItemTemplateDataTableClient
  extends Table
  implements ITable
{
  constructor(db: Connection, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('parentId', 'integer', (col) =>
        col.references('newsletter_item_template_data.id').onDelete('cascade')
      )
      .addColumn('nextId', 'integer', (col) =>
        col.references('newsletter_item_template_data.id').onDelete('cascade')
      )
      .addColumn('prevId', 'integer', (col) =>
        col.references('newsletter_item_template_data.id').onDelete('cascade')
      )
      .addColumn('templateId', 'integer', (col) =>
        col.references('newsletter_item_template.id').onDelete('cascade')
      )
      .addColumn('data', 'jsonb')
      .execute();
    return;
  }
}

/** input
 * name
 * data: [
 * {
 *  templateId
 *  data: {},
 *  temp: {
 *    id,
 *    nextId,
 *    prevId,
 *    parentId
 *  }
 * }
 * ]
 *
 *
 */

/** Movie theatre review
 * id: 2
 * name: movie theatre review
 *
 * template data 1
 * id: 3
 * parentId: null
 * nextId: 4
 * prevId: null
 * templateId: 2
 * data
 *
 * template data 2
 * id: 4
 * parentId: null
 * nextId: null
 * prevId: 3
 * templateId: 1
 * */

/** Movie Review
 *
 * template
 * id: 1
 * name: movie review
 *
 * template data 1
 * id: 1
 * parentId: null
 * nextId: 2
 * prevId: null
 * templateId: 1
 * data
 *
 * template data 2
 * id: 2
 * parentId: null
 * nextId: null
 * prevId: 1
 * templateId: 1
 * data
 * */

/** movie review input
 * name: 'Movie Review'
 * data: [
 * {
 *  data: {
 *    name: "Thoughts"
 *  },
 *  temp: {
 *    id: 1,
 *    nextId: 2,
 *    prevId: null,
 *    parentId: null
 *  }
 * },
 * {
 *  data: {
 *    name: "Review"
 *  },
 *  temp: {
 *    id: 2,
 *    nextId: null,
 *    prevId: 1,
 *    parentId: null
 *  }
 * }
 * ]
 */

/** movie theatre review input (assume movie review templates id is 123)
 * name: 'Movie Theatre Review'
 * data: [
 * {
 *  data: {
 *    name: "Overall"
 *  },
 *  temp: {
 *    id: 1,
 *    nextId: 2,
 *    prevId: null,
 *    parentId: null
 *  }
 * },
 * {
 *  templateId: 123,
 *  temp: {
 *    id: 2,
 *    nextId: null,
 *    prevId: 1,
 *    parentId: null
 *  }
 * }
 * ]
 */
