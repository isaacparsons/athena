export declare const userRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
        gcs: import("../../services").IGCSManager;
        db: import("kysely").Kysely<import("../../db").Database>;
        dao: {
            user: import("../../dao").IUserDAO;
            newsletter: import("../../dao").INewsletterDAO;
            location: import("../../dao").ILocationDAO;
            newsletterItem: import("../../dao").INewsletterItemDAO;
            newsletterItemTemplate: import("../../dao").INewsletterItemTemplateDAO;
        };
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    get: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../../services").IGCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").IUserDAO;
                    newsletter: import("../../dao").INewsletterDAO;
                    location: import("../../dao").ILocationDAO;
                    newsletterItem: import("../../dao").INewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").INewsletterItemTemplateDAO;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {
                email: string;
                userId: number;
                accessToken: string;
                refreshToken: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../../services").IGCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").IUserDAO;
                newsletter: import("../../dao").INewsletterDAO;
                location: import("../../dao").ILocationDAO;
                newsletterItem: import("../../dao").INewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").INewsletterItemTemplateDAO;
            };
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        id: number;
        email: string;
        newsletters: {
            id: number;
            properties: {
                name: string;
                dateRange: {
                    start?: string | undefined;
                    end?: string | undefined;
                };
            };
            owner: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            meta: {
                created: string;
                creator: {
                    id: number;
                    email: string;
                    firstName?: string | undefined;
                    lastName?: string | undefined;
                };
                modified?: string | undefined;
                modifier?: {
                    id: number;
                    email: string;
                    firstName?: string | undefined;
                    lastName?: string | undefined;
                } | undefined;
            };
        }[];
        newsletterItemTemplates: {
            id: number;
            name: string;
            meta: {
                created: string;
                creator: {
                    id: number;
                    email: string;
                    firstName?: string | undefined;
                    lastName?: string | undefined;
                };
                modified?: string | undefined;
                modifier?: {
                    id: number;
                    email: string;
                    firstName?: string | undefined;
                    lastName?: string | undefined;
                } | undefined;
            };
        }[];
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>;
    newsletters: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../../services").IGCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").IUserDAO;
                    newsletter: import("../../dao").INewsletterDAO;
                    location: import("../../dao").ILocationDAO;
                    newsletterItem: import("../../dao").INewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").INewsletterItemTemplateDAO;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {
                email: string;
                userId: number;
                accessToken: string;
                refreshToken: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../../services").IGCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").IUserDAO;
                newsletter: import("../../dao").INewsletterDAO;
                location: import("../../dao").ILocationDAO;
                newsletterItem: import("../../dao").INewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").INewsletterItemTemplateDAO;
            };
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        id: number;
        properties: {
            name: string;
            dateRange: {
                start?: string | undefined;
                end?: string | undefined;
            };
        };
        owner: {
            id: number;
            email: string;
            firstName?: string | undefined;
            lastName?: string | undefined;
        };
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }[]>;
    newsletterItemTemplates: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../../services").IGCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").IUserDAO;
                    newsletter: import("../../dao").INewsletterDAO;
                    location: import("../../dao").ILocationDAO;
                    newsletterItem: import("../../dao").INewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").INewsletterItemTemplateDAO;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {
                email: string;
                userId: number;
                accessToken: string;
                refreshToken: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../../services").IGCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").IUserDAO;
                newsletter: import("../../dao").INewsletterDAO;
                location: import("../../dao").ILocationDAO;
                newsletterItem: import("../../dao").INewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").INewsletterItemTemplateDAO;
            };
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        id: number;
        name: string;
        meta: {
            created: string;
            creator: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            };
            modified?: string | undefined;
            modifier?: {
                id: number;
                email: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
            } | undefined;
        };
    }[]>;
}>;
export type UserRouter = typeof userRouter;
