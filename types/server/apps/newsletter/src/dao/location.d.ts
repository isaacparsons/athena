import { Connection } from '../types/db';
import { LocationInput } from '@athena/api';
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
