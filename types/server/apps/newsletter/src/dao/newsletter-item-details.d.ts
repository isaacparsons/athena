import 'reflect-metadata';
import { DBConnection } from '../db';
import { NewsletterItemDetailsMedia, NewsletterItemDetailsText, CreateNewsletterItemDetailsInput } from '@athena/athena-common';
export interface INewsletterItemDetailsDAO {
    get(newsletterItemId: number): Promise<NewsletterItemDetailsText | NewsletterItemDetailsMedia | undefined>;
    post(newsletterItemId: number, input: CreateNewsletterItemDetailsInput): Promise<void>;
}
export declare class NewsletterItemDetailsDAO implements INewsletterItemDetailsDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    get(newsletterItemId: number): Promise<NewsletterItemDetailsText | NewsletterItemDetailsMedia | undefined>;
    post(newsletterItemId: number, input: CreateNewsletterItemDetailsInput): Promise<void | undefined>;
}
