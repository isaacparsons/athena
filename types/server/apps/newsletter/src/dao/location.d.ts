import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { LocationInput } from '@athena/common';
export interface ILocationDAO {
    post(input: LocationInput): Promise<number>;
}
export declare class LocationDAO implements ILocationDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    post(input: LocationInput): Promise<number>;
}
