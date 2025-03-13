import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, UniqueId, TABLE_NAMES, MutableForeignKey, MutableNullableDate, Meta, EntityTable } from '@athena/db';
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
export declare class NewsletterTableClient extends EntityTable<'newsletter', 'name' | 'ownerId' | 'startDate' | 'endDate'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'newsletter', 'name' | 'ownerId' | 'startDate' | 'endDate'>;
}
