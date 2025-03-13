import { DBConnection, EntityTableName, Expression } from '@athena/db';
export declare const newsletterItemDetailsMedia: (db: DBConnection, id: Expression<number>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string;
    type: import("@athena/common").NewsletterItemTypeName.Media;
    newsletterItemId: number;
    fileName: string;
    format: import("@athena/common").MediaFormat;
    caption: string | null;
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
    newsletterItemId: number;
    description: string | null;
    link: string | null;
} | null, "textDetails">;
export declare const location: (db: DBConnection, id: Expression<number | null>) => import("kysely").AliasedRawBuilder<{
    id: number;
    name: string | null;
    longitude: number | null;
    latitude: number | null;
    countryCode: string | null;
} | null, "location">;
export declare const creator: (db: DBConnection, id: Expression<number>) => import("kysely").RawBuilder<{
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
}>;
export declare const modifier: (db: DBConnection, id: Expression<number | null>) => import("kysely").RawBuilder<{
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
} | null>;
export declare const owner: (db: DBConnection, id: Expression<number>) => import("kysely").RawBuilder<{
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
}>;
export declare const selectEntityColumns: <T extends EntityTableName>(db: DBConnection, tableName: T) => import("kysely").SelectQueryBuilder<import("@athena/db").Database, import("kysely/dist/cjs/parser/table-parser").ExtractTableAlias<import("@athena/db").Database, T>, {
    created: import("kysely").SelectType<"created" extends infer T_1 ? T_1 extends "created" ? T_1 extends import("kysely").AnyColumn<import("@athena/db").Database, import("kysely/dist/cjs/parser/table-parser").ExtractTableAlias<import("@athena/db").Database, T>> ? import("kysely/dist/cjs/util/type-utils").ExtractColumnType<import("@athena/db").Database, import("kysely/dist/cjs/parser/table-parser").ExtractTableAlias<import("@athena/db").Database, T>, T_1> : never : never : never>;
    modified: import("kysely").SelectType<"modified" extends infer T_2 ? T_2 extends "modified" ? T_2 extends import("kysely").AnyColumn<import("@athena/db").Database, import("kysely/dist/cjs/parser/table-parser").ExtractTableAlias<import("@athena/db").Database, T>> ? import("kysely/dist/cjs/util/type-utils").ExtractColumnType<import("@athena/db").Database, import("kysely/dist/cjs/parser/table-parser").ExtractTableAlias<import("@athena/db").Database, T>, T_2> : never : never : never>;
    id: import("kysely").SelectType<"id" extends infer T_3 ? T_3 extends "id" ? T_3 extends import("kysely").AnyColumn<import("@athena/db").Database, import("kysely/dist/cjs/parser/table-parser").ExtractTableAlias<import("@athena/db").Database, T>> ? import("kysely/dist/cjs/util/type-utils").ExtractColumnType<import("@athena/db").Database, import("kysely/dist/cjs/parser/table-parser").ExtractTableAlias<import("@athena/db").Database, T>, T_3> : never : never : never>;
    creator: {
        id: number;
        email: string;
        firstName: string | null;
        lastName: string | null;
    };
    modifier: {
        id: number;
        email: string;
        firstName: string | null;
        lastName: string | null;
    } | null;
}>;
