import 'reflect-metadata';
import { INewsletterDAO, INewsletterPostDAO } from '@athena/dao';
import { ITable, DBConnection } from '@athena/db';
export declare class DBManagerClient {
    tables: ITable<any, any>[];
    client: DBConnection;
    newsletterDAO: INewsletterDAO;
    newsletterItemsDAO: INewsletterPostDAO;
    constructor();
    createTables(): Promise<void>;
    dropTables(): Promise<void>;
    truncateTables(ignore?: string[]): Promise<void>;
    addCustom(): Promise<void>;
    seed(): Promise<void>;
}
