import { Connection } from '../types/db';
import { NewsletterItemDetailsMedia, NewsletterItemDetailsText, CreateNewsletterItemDetailsInput } from '@athena/athena-common';
export declare class NewsletterItemDetailsDAO {
    readonly db: Connection;
    constructor(db: Connection);
    get(newsletterItemId: number): Promise<NewsletterItemDetailsMedia | NewsletterItemDetailsText | undefined>;
    post(newsletterItemId: number, input: CreateNewsletterItemDetailsInput): Promise<import("kysely").InsertResult | undefined>;
}
