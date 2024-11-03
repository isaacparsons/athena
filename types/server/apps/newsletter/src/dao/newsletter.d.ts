import { NewsletterItemDAO } from '.';
import { Connection as DBConnection } from '../db';
import { Newsletter, CreateNewsletterInput, UpdateNewsletterInput } from '@athena/athena-common';
import { GCSManager } from '../services';
export declare class NewsletterDAO {
    readonly db: DBConnection;
    readonly gcs: GCSManager;
    readonly newsletterItemDAO: NewsletterItemDAO;
    constructor(db: DBConnection, gcs: GCSManager, newsletterItemDAO: NewsletterItemDAO);
    get(id: number): Promise<Newsletter>;
    post(userId: number, input: CreateNewsletterInput): Promise<number>;
    update(userId: number, input: UpdateNewsletterInput): Promise<import("kysely").UpdateResult>;
    delete(userId: number, id: number): Promise<import("kysely").DeleteResult[]>;
}
