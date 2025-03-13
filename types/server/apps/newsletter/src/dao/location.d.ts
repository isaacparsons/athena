import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { CreateLocation, LocationInput, UpdateLocation } from '@athena/common';
export interface ILocationDAO {
    post(input: LocationInput): Promise<number>;
    update(input: UpdateLocation): Promise<number>;
}
export declare class LocationDAO implements ILocationDAO {
    readonly db: DBConnection;
    constructor(db: DBConnection);
    post(input: CreateLocation): Promise<number>;
    update(input: UpdateLocation): Promise<number>;
}
