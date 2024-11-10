import 'reflect-metadata';
import { ITable } from '@athena/db';
export declare class DBManagerClient {
    tables: ITable[];
    constructor();
    createTables(): Promise<void>;
    dropTables(): Promise<void>;
    seed(): Promise<void>;
}
