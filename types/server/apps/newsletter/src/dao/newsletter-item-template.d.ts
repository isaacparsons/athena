import { Connection as DBConnection } from '../types/db';
import { CreateNewsletterItemTemplateInput, NewsletterItemTemplate } from '@athena/athena-common';
export declare class NewsletterItemTemplateDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    post(userId: number, input: CreateNewsletterItemTemplateInput): Promise<number>;
    get(id: number): Promise<NewsletterItemTemplate>;
    private getTemplate;
}
