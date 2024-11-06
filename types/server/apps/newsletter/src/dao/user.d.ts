import { NewsletterBase, User, UserNewsletterItemTemplates, UserNewsletters } from '@athena/athena-common';
import 'reflect-metadata';
import { DBConnection } from '../db';
export interface IUserDAO {
    get(id: number): Promise<User>;
    newsletters: (userId: number) => Promise<UserNewsletters>;
    newsletterItemTemplates: (userId: number) => Promise<UserNewsletterItemTemplates>;
}
export declare class UserDAO implements IUserDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    get(id: number): Promise<User>;
    newsletters(userId: number): Promise<NewsletterBase[]>;
    newsletterItemTemplates(userId: number): Promise<{
        id: number;
        name: string;
        meta: {
            created: string;
            modified: string | null;
            creator: {
                id: number;
                firstName: string | null;
                lastName: string | null;
                email: string;
            };
            modifier: {
                id: number;
                firstName: string | null;
                lastName: string | null;
                email: string;
            } | null;
        };
    }[]>;
}
