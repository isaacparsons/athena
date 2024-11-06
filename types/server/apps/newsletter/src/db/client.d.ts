import 'reflect-metadata';
import { ITable } from '../db';
export declare class DBManagerClient {
    tables: ITable[];
    constructor();
    createTables(): Promise<void>;
    dropTables(): Promise<void>;
    seed(): Promise<void>;
}
