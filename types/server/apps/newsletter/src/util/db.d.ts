import { DBConnection, Expression } from '../db';
export declare const newsletterItemDetailsMedia: (db: DBConnection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string;
    type: import("@athena/athena-common").NewsletterItemTypeName.Media;
    fileName: string;
    format: import("@athena/athena-common").MediaFormat;
    caption: string | null;
    newsletterItemId: number;
} | null, "mediaDetails">;
export declare const newsletterItemDetailsText: (db: DBConnection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string;
    type: import("@athena/athena-common").NewsletterItemTypeName.Text;
    description: string | null;
    link: string | null;
    newsletterItemId: number;
} | null, "textDetails">;
export declare const location: (db: DBConnection, id: Expression<number | null>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string | null;
    longitude: number | null;
    lattitude: number | null;
    countryCode: string | null;
} | null, "location">;
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
export declare const user: (db: DBConnection, id: Expression<number | null>, label?: string) => import("kysely").AliasedRawBuilder<{
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
}, string>;
