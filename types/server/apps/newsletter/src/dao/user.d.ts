import { NewsletterBase, NewsletterItemTemplateBase, User } from '@athena/common';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
export interface IUserDAO {
    get(id: number): Promise<User>;
    newsletters: (userId: number) => Promise<NewsletterBase[]>;
    newsletterItemTemplates: (userId: number) => Promise<NewsletterItemTemplateBase[]>;
}
export declare class UserDAO implements IUserDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    get(id: number): Promise<User>;
    newsletters(userId: number): Promise<NewsletterBase[]>;
    newsletterItemTemplates(userId: number): Promise<NewsletterItemTemplateBase[]>;
}
