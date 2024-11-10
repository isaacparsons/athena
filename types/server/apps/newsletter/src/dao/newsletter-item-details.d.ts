import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { NewsletterItemDetailsMedia, NewsletterItemDetailsText, CreateNewsletterItemDetailsInput, NewsletterItemDetailsContainer } from '@athena/common';
export interface INewsletterItemDetailsDAO {
    get(newsletterItemId: number): Promise<NewsletterItemDetailsText | NewsletterItemDetailsMedia | NewsletterItemDetailsContainer>;
    post(newsletterItemId: number, input: CreateNewsletterItemDetailsInput): Promise<void>;
}
export declare class NewsletterItemDetailsDAO implements INewsletterItemDetailsDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    get(newsletterItemId: number): Promise<NewsletterItemDetailsText | NewsletterItemDetailsMedia | NewsletterItemDetailsContainer>;
    post(newsletterItemId: number, input: CreateNewsletterItemDetailsInput): Promise<void | undefined>;
}
