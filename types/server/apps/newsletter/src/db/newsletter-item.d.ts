import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, TABLE_NAMES, Meta } from '../db';
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
type TableInfo<T> = {
    name: TABLE_NAMES;
    columns: (keyof T)[];
};
export declare const NewsletterItemTableInfo: TableInfo<NewsletterItemTableColumns>;
export type SelectNewsletterItem = Selectable<NewsletterItemTableColumns>;
export type InsertNewsletterItem = Insertable<NewsletterItemTableColumns>;
export type UpdateNewsletterItem = Updateable<NewsletterItemTableColumns>;
export declare class NewsletterItemTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
export {};
