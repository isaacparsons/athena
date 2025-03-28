import { NewsletterBase, User } from '@athena/common';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { INewsletterDAO } from './newsletter';
export interface IUserDAO {
    get(id: number): Promise<User>;
    newsletters: (userId: number) => Promise<NewsletterBase[]>;
}
export declare class UserDAO implements IUserDAO {
    readonly db: DBConnection;
    readonly newsletterDAO: INewsletterDAO;
    constructor(db: DBConnection, newsletterDAO: INewsletterDAO);
    get(id: number): Promise<User>;
    newsletters(userId: number): Promise<NewsletterBase[]>;
}
