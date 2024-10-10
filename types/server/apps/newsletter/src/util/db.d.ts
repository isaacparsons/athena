import { Connection as DBConnection, Expression } from '../types/db';
export declare const user: (db: DBConnection, id: Expression<number>) => import("kysely").RawBuilder<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
}>;
export declare const creator: (db: DBConnection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
}, "creator">;
export declare const modifier: (db: DBConnection, id: Expression<number | null>) => import("kysely").AliasedRawBuilder<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
} | null, "modifier">;
export declare const location: (db: DBConnection, id: Expression<number | null>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string | null;
    longitude: number | null;
    lattitude: number | null;
    countryCode: string | null;
} | null, "location">;
export declare const itemDetails: (db: DBConnection, id: Expression<number | null>) => void;
