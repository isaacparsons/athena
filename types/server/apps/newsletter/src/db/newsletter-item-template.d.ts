import { Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, TABLE_NAMES, Meta } from '@athena/db';
export interface NewsletterItemTemplateTableColumns extends Meta {
    id: UniqueId;
    name: string;
}
export interface NewsletterItemTemplateTable {
    name: TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE;
    columns: NewsletterItemTemplateTableColumns;
}
export type SelectNewsletterItemTemplate = Selectable<NewsletterItemTemplateTableColumns>;
export type InsertNewsletterItemTemplate = Insertable<NewsletterItemTemplateTableColumns>;
export type UpdateNewsletterItemTemplate = Updateable<NewsletterItemTemplateTableColumns>;
export declare class NewsletterItemTemplateTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
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
export type SelectNewsletterItemTemplateData = Selectable<NewsletterItemTemplateDataTableColumns>;
export type InsertNewsletterItemTemplateData = Insertable<NewsletterItemTemplateDataTableColumns>;
export type UpdateNewsletterItemTemplateData = Updateable<NewsletterItemTemplateDataTableColumns>;
export declare class NewsletterItemTemplateDataTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
