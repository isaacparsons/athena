import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';
import { Connection, Table, ITable, UniqueId, TABLE_NAMES, Meta } from '../types/db';
export interface NewsletterItemTableColumns extends Meta {
    id: UniqueId;
    newsletterId: ColumnType<number, number, never>;
    title: string;
    date: string | null;
    locationId: number | null;
    parentId: ColumnType<number | null, number | null, number | null>;
    nextItemId: ColumnType<number | null, number | null, number | null>;
    previousItemId: ColumnType<number | null, number | null, number | null>;
}
export interface NewsletterItemTable {
    name: TABLE_NAMES.NEWSLETTER_ITEM;
    columns: NewsletterItemTableColumns;
}
export type SelectNewsletterItem = Selectable<NewsletterItemTableColumns>;
export type InsertNewsletterItem = Insertable<NewsletterItemTableColumns>;
export type UpdateNewsletterItem = Updateable<NewsletterItemTableColumns>;
export declare class NewsletterItemTableClient extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
