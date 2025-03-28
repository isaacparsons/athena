import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, TABLE_NAMES, EntityTable } from '@athena/db';
import { Newsletter } from '../types/db';
export interface NewsletterTable {
    name: TABLE_NAMES.NEWSLETTER;
    columns: Newsletter;
}
export type SelectNewsletter = Selectable<Newsletter>;
export type InsertNewsletter = Insertable<Newsletter>;
export type UpdateNewsletter = Updateable<Newsletter>;
export declare class NewsletterTableClient extends EntityTable<'newsletter', 'name' | 'ownerId' | 'startDate' | 'endDate'> {
    constructor(db: DBConnection, name: string);
    tableBuilder: CreateTableBuilder<'newsletter', 'name' | 'ownerId' | 'startDate' | 'endDate'>;
}
