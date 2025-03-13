import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { NewsletterItemDetails, CreateNewsletterItemDetails, UpdateNewsletterItemDetails } from '@athena/common';
export interface INewsletterItemDetailsDAO {
    get(newsletterItemId: number): Promise<NewsletterItemDetails>;
    post(newsletterItemId: number, input: CreateNewsletterItemDetails): Promise<void>;
    update(input: UpdateNewsletterItemDetails): Promise<number>;
}
export declare class NewsletterItemDetailsDAO implements INewsletterItemDetailsDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    get(newsletterItemId: number): Promise<NewsletterItemDetails>;
    post(newsletterItemId: number, input: CreateNewsletterItemDetails): Promise<void | undefined>;
    update(input: UpdateNewsletterItemDetails): Promise<number>;
}
