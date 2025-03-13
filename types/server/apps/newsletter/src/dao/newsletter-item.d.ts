import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { ILocationDAO, INewsletterItemDetailsDAO } from '@athena/dao';
import { NewsletterItem, DeleteBatchInput, CreateNewsletterItem, CreateNewsletterItemsBatch, UpdateNewsletterItem } from '@athena/common';
import { IGCSManager } from '@athena/services';
export interface INewsletterItemDAO {
    deleteMany(input: DeleteBatchInput): Promise<void>;
    post(userId: number, input: CreateNewsletterItem): Promise<number>;
    postBatch(userId: number, input: CreateNewsletterItemsBatch): Promise<number[]>;
    get(id: number): Promise<NewsletterItem>;
    update(userId: number, input: UpdateNewsletterItem): Promise<number>;
}
export declare class NewsletterItemDAO implements INewsletterItemDAO {
    readonly db: DBConnection;
    readonly locationDAO: ILocationDAO;
    readonly gcs: IGCSManager;
    readonly newsletterItemDetailsDAO: INewsletterItemDetailsDAO;
    constructor(db: DBConnection, locationDAO: ILocationDAO, gcs: IGCSManager, newsletterItemDetailsDAO: INewsletterItemDetailsDAO);
    deleteMany(input: DeleteBatchInput): Promise<void>;
    post(userId: number, input: CreateNewsletterItem): Promise<number>;
    postBatch(userId: number, input: CreateNewsletterItemsBatch): Promise<number[]>;
    get(id: number): Promise<NewsletterItem>;
    update(userId: number, input: UpdateNewsletterItem): Promise<number>;
}
