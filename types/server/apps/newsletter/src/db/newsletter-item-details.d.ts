import { Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, ITable, UniqueId, TABLE_NAMES } from '@athena/db';
import { MediaFormat, NewsletterItemTypeName } from '@athena/common';
interface NewsletterItemDetailsBase {
    id: UniqueId;
    type: NewsletterItemTypeName;
    newsletterItemId: number;
}
export interface NewsletterItemMediaTableColumns extends NewsletterItemDetailsBase {
    type: NewsletterItemTypeName.Media;
    name: string;
    caption: string | null;
    fileName: string;
    format: MediaFormat;
}
export interface NewsletterItemMediaTable {
    name: TABLE_NAMES.NEWSLETTER_ITEM_MEDIA;
    columns: NewsletterItemMediaTableColumns;
}
export type SelectNewsletterItemMedia = Selectable<NewsletterItemMediaTableColumns>;
export type InsertNewsletterItemMedia = Insertable<NewsletterItemMediaTableColumns>;
export type UpdateNewsletterItemMedia = Updateable<NewsletterItemMediaTableColumns>;
export interface NewsletterItemTextTableColumns extends NewsletterItemDetailsBase {
    type: NewsletterItemTypeName.Text;
    name: string;
    description: string | null;
    link: string | null;
}
export interface NewsletterItemTextTable {
    name: TABLE_NAMES.NEWSLETTER_ITEM_TEXT;
    columns: NewsletterItemTextTableColumns;
}
export type SelectNewsletterItemText = Selectable<NewsletterItemTextTableColumns>;
export type InsertNewsletterItemText = Insertable<NewsletterItemTextTableColumns>;
export type UpdateNewsletterItemText = Updateable<NewsletterItemTextTableColumns>;
export interface NewsletterItemContainerTableColumns extends NewsletterItemDetailsBase {
    type: NewsletterItemTypeName.Container;
    name: string;
}
export interface NewsletterItemContainerTable {
    name: TABLE_NAMES.NEWSLETTER_ITEM_CONTAINER;
    columns: NewsletterItemContainerTableColumns;
}
export type SelectNewsletterItemContainer = Selectable<NewsletterItemContainerTableColumns>;
export type InsertNewsletterItemContainer = Insertable<NewsletterItemContainerTableColumns>;
export type UpdateNewsletterItemContainer = Updateable<NewsletterItemContainerTableColumns>;
export declare class NewsletterItemMediaTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
export declare class NewsletterItemTextTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
export declare class NewsletterItemContainerTableClient extends Table implements ITable {
    constructor(db: DBConnection, name: string);
    createTable(): Promise<void>;
}
export {};
