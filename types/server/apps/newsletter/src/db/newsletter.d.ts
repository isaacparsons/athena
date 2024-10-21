import { Insertable, Selectable, Updateable } from 'kysely';
import { Connection, Table, ITable, UniqueId, TABLE_NAMES, MutableForeignKey, MutableNullableDate, Meta } from '../types/db';
export interface NewsletterTableColumns extends Meta {
    id: UniqueId;
    name: string;
    ownerId: MutableForeignKey;
    startDate: MutableNullableDate;
    endDate: MutableNullableDate;
}
export interface NewsletterTable {
    name: TABLE_NAMES.NEWSLETTER;
    columns: NewsletterTableColumns;
}
export type SelectNewsletter = Selectable<NewsletterTableColumns>;
export type InsertNewsletter = Insertable<NewsletterTableColumns>;
export type UpdateNewsletter = Updateable<NewsletterTableColumns>;
export declare class NewsletterTableClient extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
