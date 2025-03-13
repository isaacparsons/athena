// import { CreateTableBuilder, Insertable, Selectable, Updateable, sql } from 'kysely';
// import { DBConnection, Table, TABLE_NAMES, EntityTable } from '@athena/db';
// import { NewsletterPostTemplate, NewsletterPostTemplateData } from '../types/db';

// export interface NewsletterPostTemplateTable {
//   name: TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE;
//   columns: NewsletterPostTemplate;
// }

// export type SelectNewsletterPostTemplate = Selectable<NewsletterPostTemplate>;
// export type InsertNewsletterPostTemplate = Insertable<NewsletterPostTemplate>;
// export type UpdateNewsletterPostTemplate = Updateable<NewsletterPostTemplate>;

// export class NewsletterPostTemplateTableClient extends EntityTable<
//   'newsletter_item_template',
//   'name'
// > {
//   constructor(db: DBConnection, name: string) {
//     super(db, name);
//   }

//   tableBuilder: CreateTableBuilder<'newsletter_item_template', 'name'> =
//     this.tableBuilder.addColumn('name', 'varchar', (cb) => cb.notNull());
// }

// export interface NewsletterPostTemplateDataTable {
//   name: TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE_DATA;
//   columns: NewsletterPostTemplateData;
// }
// export type SelectNewsletterPostTemplateData =
//   Selectable<NewsletterPostTemplateData>;
// export type InsertNewsletterPostTemplateData =
//   Insertable<NewsletterPostTemplateData>;
// export type UpdateNewsletterPostTemplateData =
//   Updateable<NewsletterPostTemplateData>;

// export class NewsletterPostTemplateDataTableClient extends Table<
//   'newsletter_item_template_data',
//   'parentId' | 'nextId' | 'prevId' | 'templateId' | 'data'
// > {
//   constructor(db: DBConnection, name: string) {
//     super(db, name);
//   }

//   tableBuilder: CreateTableBuilder<
//     'newsletter_item_template_data',
//     'parentId' | 'nextId' | 'prevId' | 'templateId' | 'data'
//   > = this.tableBuilder
//     .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
//     .addColumn('parentId', 'integer', (col) =>
//       col.references('newsletter_item_template_data.id').onDelete('cascade')
//     )
//     .addColumn('nextId', 'integer', (col) =>
//       col.references('newsletter_item_template_data.id').onDelete('cascade')
//     )
//     .addColumn('prevId', 'integer', (col) =>
//       col.references('newsletter_item_template_data.id').onDelete('cascade')
//     )
//     .addColumn('templateId', 'integer', (col) =>
//       col.references('newsletter_item_template.id').onDelete('cascade')
//     )
//     .addColumn('data', 'jsonb');
// }
