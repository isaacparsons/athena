import 'reflect-metadata';
import { INewsletterItemDAO } from '@athena/dao';
import { DBConnection } from '@athena/db';
import { Newsletter, CreateNewsletterInput, UpdateNewsletterInput } from '@athena/common';
import { IGCSManager } from '@athena/services';
export interface INewsletterDAO {
    get(id: number): Promise<Newsletter>;
    post(userId: number, input: CreateNewsletterInput): Promise<number>;
    update(userId: number, input: UpdateNewsletterInput): Promise<number>;
    delete(userId: number, id: number): Promise<number>;
}
export declare class NewsletterDAO implements INewsletterDAO {
    readonly db: DBConnection;
    readonly gcs: IGCSManager;
    readonly newsletterItemDAO: INewsletterItemDAO;
    constructor(db: DBConnection, gcs: IGCSManager, newsletterItemDAO: INewsletterItemDAO);
    get(id: number): Promise<Newsletter>;
    post(userId: number, input: CreateNewsletterInput): Promise<number>;
    update(userId: number, input: UpdateNewsletterInput): Promise<number>;
    delete(userId: number, id: number): Promise<number>;
}
