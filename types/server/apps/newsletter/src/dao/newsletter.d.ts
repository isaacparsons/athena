import { NewsletterItemDAO } from './newsletter-item';
import { Connection as DBConnection } from '../types/db';
import { Newsletter, CreateNewsletterInput, UpdateNewsletterInput } from '@athena/api';
export declare class NewsletterDAO {
    readonly db: DBConnection;
    readonly newsletterItemDAO: NewsletterItemDAO;
    constructor(db: DBConnection, newsletterItemDAO: NewsletterItemDAO);
    get(id: number): Promise<Newsletter>;
    post(userId: number, input: CreateNewsletterInput): Promise<{
        id: number;
        name: string;
        created: string;
        modified: string | null;
        creatorId: number;
        modifierId: number | null;
        ownerId: number;
        startDate: string | null;
        endDate: string | null;
    }>;
    update(userId: number, input: UpdateNewsletterInput): Promise<import("kysely").UpdateResult>;
    delete(userId: number, id: number): Promise<import("kysely").DeleteResult[]>;
}
