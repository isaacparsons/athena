declare const router: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
            user?: import("@athena/athena-common").UserSession;
            isAuthenticated(): () => boolean;
        };
        res: import("express").Response<any, Record<string, any>>;
        gcs: import("../services/gcs").GCSManager;
        db: import("kysely").Kysely<import("../types/db").Database>;
        dao: {
            user: import("../dao/user").UserDAO;
            newsletter: import("../dao/newsletter").NewsletterDAO;
            location: import("../dao/location").LocationDAO;
            newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
        };
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    get: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                    user?: import("@athena/athena-common").UserSession;
                    isAuthenticated(): () => boolean;
                };
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../services/gcs").GCSManager;
                db: import("kysely").Kysely<import("../types/db").Database>;
                dao: {
                    user: import("../dao/user").UserDAO;
                    newsletter: import("../dao/newsletter").NewsletterDAO;
                    location: import("../dao/location").LocationDAO;
                    newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
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
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                user?: import("@athena/athena-common").UserSession;
                isAuthenticated(): () => boolean;
            };
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services/gcs").GCSManager;
            db: import("kysely").Kysely<import("../types/db").Database>;
            dao: {
                user: import("../dao/user").UserDAO;
                newsletter: import("../dao/newsletter").NewsletterDAO;
                location: import("../dao/location").LocationDAO;
                newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
            };
        };
        _input_in: {
            newsletterId: number;
        };
        _input_out: {
            newsletterId: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("@athena/athena-common").Newsletter>;
    post: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                    user?: import("@athena/athena-common").UserSession;
                    isAuthenticated(): () => boolean;
                };
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../services/gcs").GCSManager;
                db: import("kysely").Kysely<import("../types/db").Database>;
                dao: {
                    user: import("../dao/user").UserDAO;
                    newsletter: import("../dao/newsletter").NewsletterDAO;
                    location: import("../dao/location").LocationDAO;
                    newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
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
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                user?: import("@athena/athena-common").UserSession;
                isAuthenticated(): () => boolean;
            };
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services/gcs").GCSManager;
            db: import("kysely").Kysely<import("../types/db").Database>;
            dao: {
                user: import("../dao/user").UserDAO;
                newsletter: import("../dao/newsletter").NewsletterDAO;
                location: import("../dao/location").LocationDAO;
                newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
            };
        };
        _input_in: {
            name: string;
            startDate: string;
            endDate?: string | undefined;
        };
        _input_out: {
            name: string;
            startDate: string;
            endDate?: string | undefined;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        id: number;
        name: string;
        created: string;
        modified: string | null;
        creatorId: number;
        modifierId: number | null;
        ownerId: number;
        startDate: string | null;
        endDate: string | null;
    }>;
    update: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                    user?: import("@athena/athena-common").UserSession;
                    isAuthenticated(): () => boolean;
                };
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../services/gcs").GCSManager;
                db: import("kysely").Kysely<import("../types/db").Database>;
                dao: {
                    user: import("../dao/user").UserDAO;
                    newsletter: import("../dao/newsletter").NewsletterDAO;
                    location: import("../dao/location").LocationDAO;
                    newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
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
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                user?: import("@athena/athena-common").UserSession;
                isAuthenticated(): () => boolean;
            };
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services/gcs").GCSManager;
            db: import("kysely").Kysely<import("../types/db").Database>;
            dao: {
                user: import("../dao/user").UserDAO;
                newsletter: import("../dao/newsletter").NewsletterDAO;
                location: import("../dao/location").LocationDAO;
                newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
            };
        };
        _input_in: {
            id: number;
            name?: string | undefined;
            startDate?: string | null | undefined;
            endDate?: string | null | undefined;
        };
        _input_out: {
            id: number;
            name?: string | undefined;
            startDate?: string | null | undefined;
            endDate?: string | null | undefined;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("kysely").UpdateResult>;
    delete: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                    user?: import("@athena/athena-common").UserSession;
                    isAuthenticated(): () => boolean;
                };
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../services/gcs").GCSManager;
                db: import("kysely").Kysely<import("../types/db").Database>;
                dao: {
                    user: import("../dao/user").UserDAO;
                    newsletter: import("../dao/newsletter").NewsletterDAO;
                    location: import("../dao/location").LocationDAO;
                    newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
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
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                user?: import("@athena/athena-common").UserSession;
                isAuthenticated(): () => boolean;
            };
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services/gcs").GCSManager;
            db: import("kysely").Kysely<import("../types/db").Database>;
            dao: {
                user: import("../dao/user").UserDAO;
                newsletter: import("../dao/newsletter").NewsletterDAO;
                location: import("../dao/location").LocationDAO;
                newsletterItem: import("../dao/newsletter-item").NewsletterItemDAO;
            };
        };
        _input_in: {
            id: number;
        };
        _input_out: {
            id: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("kysely").DeleteResult[]>;
}>;
export default router;
