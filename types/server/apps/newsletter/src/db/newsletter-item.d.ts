import { ColumnType, CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, UniqueId, Meta, EntityTable } from '@athena/db';
export interface NewsletterItemTableColumns extends Meta {
    id: UniqueId;
    newsletterId: ColumnType<number, number, never>;
    title: string;
    date: string | null;
    locationId: number | null;
    parentId: ColumnType<number | null, number | null, number | null>;
    nextId: ColumnType<number | null, number | null, number | null>;
    prevId: ColumnType<number | null, number | null, number | null>;
}
export type SelectNewsletterItem = Selectable<NewsletterItemTableColumns>;
export type InsertNewsletterItem = Insertable<NewsletterItemTableColumns>;
export type UpdateNewsletterItem = Updateable<NewsletterItemTableColumns>;
export declare class NewsletterItemTableClient extends EntityTable<'newsletter_item', 'title' | 'newsletterId' | 'date' | 'locationId' | 'parentId' | 'nextId' | 'prevId'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'newsletter_item', 'title' | 'newsletterId' | 'date' | 'locationId' | 'parentId' | 'nextId' | 'prevId'>;
}
