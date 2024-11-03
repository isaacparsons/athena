import { Connection } from '../db';
import { LocationInput } from '@athena/athena-common';
export declare class LocationDAO {
    readonly db: Connection;
    constructor(db: Connection);
    post(input: LocationInput): Promise<{
        id: number;
        name: string | null;
        longitude: number | null;
        lattitude: number | null;
        countryCode: string | null;
    }>;
}
