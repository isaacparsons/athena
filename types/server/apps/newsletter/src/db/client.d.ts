import { ITable, DB, Database } from '../db';
export declare const dbClient: DB<Database>;
export declare class DBManagerClient {
    tables: ITable[];
    constructor();
    createTables(): Promise<void>;
    dropTables(): Promise<void>;
    seed(): Promise<void>;
}
