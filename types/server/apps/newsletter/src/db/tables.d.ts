import { Connection, Table, ITable } from '../types/db';
export declare class LocationTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
export declare class CountryTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
export declare class UserTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
export declare class FederatedCredentialTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
export declare class NewsletterItemTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
export declare class NewsletterItemMediaTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
export declare class NewsletterItemTextTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
export declare class NewsletterTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
export declare class UserNewsletterTable extends Table implements ITable {
    constructor(db: Connection, name: string);
    createTable(): Promise<void>;
}
