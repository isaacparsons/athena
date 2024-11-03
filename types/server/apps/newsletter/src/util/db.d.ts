import { Connection, Expression } from '../db';
export declare const newsletterItemDetailsMedia: (db: Connection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string;
    type: "media";
    fileName: string;
    caption: string | null;
    newsletterItemId: number;
} | null, "mediaDetails">;
export declare const newsletterItemDetailsText: (db: Connection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string;
    type: "text";
    description: string | null;
    link: string | null;
    newsletterItemId: number;
} | null, "textDetails">;
export declare const location: (db: Connection, id: Expression<number | null>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string | null;
    longitude: number | null;
    lattitude: number | null;
    countryCode: string | null;
} | null, "location">;
export declare const creator: (db: Connection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
}, "creator">;
export declare const modifier: (db: Connection, id: Expression<number | null>) => import("kysely").AliasedRawBuilder<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
} | null, "modifier">;
export declare const user: (db: Connection, id: Expression<number | null>, label?: string) => import("kysely").AliasedRawBuilder<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
}, string>;
