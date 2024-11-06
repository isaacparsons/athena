import 'reflect-metadata';
import { DBConnection } from '../db';
import { LocationInput } from '@athena/athena-common';
export interface ILocationDAO {
    post(input: LocationInput): Promise<number>;
}
export declare class LocationDAO implements ILocationDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    post(input: LocationInput): Promise<number>;
}
