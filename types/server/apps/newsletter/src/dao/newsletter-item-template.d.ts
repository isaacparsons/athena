import 'reflect-metadata';
import { DBConnection } from '../db';
import { CreateNewsletterItemTemplateInput, NewsletterItemTemplate } from '@athena/athena-common';
export interface INewsletterItemTemplateDAO {
    post(userId: number, input: CreateNewsletterItemTemplateInput): Promise<number>;
    get(id: number): Promise<NewsletterItemTemplate>;
}
export declare class NewsletterItemTemplateDAO implements INewsletterItemTemplateDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    post(userId: number, input: CreateNewsletterItemTemplateInput): Promise<number>;
    get(id: number): Promise<NewsletterItemTemplate>;
    private getTemplate;
}
