import { Connection as DBConnection } from '../types/db';
import { CreateNewsletterItemTemplateInput } from '@athena/athena-common';
export declare class NewsletterItemTemplateDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    post(userId: number, input: CreateNewsletterItemTemplateInput): Promise<number>;
    get(id: number): Promise<{
        templates: {
            items: {
                id: number;
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
                templateId: number | null;
                data: object | null;
            }[];
            id: number;
            name: string;
        }[];
        items: {
            id: number;
            parentId: number | null;
            nextId: number | null;
            prevId: number | null;
            templateId: number | null;
            data: object | null;
        }[];
        id: number;
        name: string;
    }>;
    private getTemplate;
}
