import { DBConnection, Expression } from '@athena/db';
export declare const newsletterItemDetailsMedia: (db: DBConnection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string;
    type: import("@athena/common").NewsletterItemTypeName.Media;
    fileName: string;
    format: import("@athena/common").MediaFormat;
    caption: string | null;
    newsletterItemId: number;
} | null, "mediaDetails">;
export declare const newsletterItemDetailsContainer: (db: DBConnection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string;
    type: import("@athena/common").NewsletterItemTypeName.Container;
    newsletterItemId: number;
} | null, "containerDetails">;
export declare const newsletterItemDetailsText: (db: DBConnection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string;
    type: import("@athena/common").NewsletterItemTypeName.Text;
    description: string | null;
    link: string | null;
    newsletterItemId: number;
} | null, "textDetails">;
export declare const location: (db: DBConnection, id: Expression<number | null>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string | null;
    longitude: number | null;
    latitude: number | null;
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
