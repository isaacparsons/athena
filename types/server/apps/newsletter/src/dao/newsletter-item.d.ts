import { Connection as DBConnection } from '../types/db';
import { LocationDAO } from './location';
import { CreateNewsletterItemInput, DeleteManyNewsletterItemsInput, UpdateNewsletterItemInput } from '@athena/athena-common';
import { NewsletterItemDetailsDAO } from './newsletter-item-details';
export declare class NewsletterItemDAO {
    readonly db: DBConnection;
    readonly locationDAO: LocationDAO;
    readonly newsletterItemDetailsDAO: NewsletterItemDetailsDAO;
    constructor(db: DBConnection, locationDAO: LocationDAO, newsletterItemDetailsDAO: NewsletterItemDetailsDAO);
    deleteMany(input: DeleteManyNewsletterItemsInput): Promise<void>;
    post(userId: number, input: CreateNewsletterItemInput): Promise<number>;
    get(id: number): Promise<import("@athena/athena-common").NewsletterItem>;
    update(userId: number, input: UpdateNewsletterItemInput): Promise<void>;
}
