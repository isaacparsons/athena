import { DBConnection } from '../db';
import { LocationInput } from '@athena/athena-common';
export declare class LocationDAO {
  readonly db: DBConnection;
  constructor(db: DBConnection);
  post(input: LocationInput): Promise<{
    id: number;
    name: string | null;
    longitude: number | null;
    lattitude: number | null;
    countryCode: string | null;
  }>;
}
