export declare const userRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
            newsletterItemTemplate: import("../dao/newsletter-item-template").NewsletterItemTemplateDAO;
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
                    newsletterItemTemplate: import("../dao/newsletter-item-template").NewsletterItemTemplateDAO;
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
                newsletterItemTemplate: import("../dao/newsletter-item-template").NewsletterItemTemplateDAO;
            };
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("@athena/athena-common").User>;
    newsletters: import("@trpc/server").BuildProcedure<"query", {
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
                    newsletterItemTemplate: import("../dao/newsletter-item-template").NewsletterItemTemplateDAO;
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
                newsletterItemTemplate: import("../dao/newsletter-item-template").NewsletterItemTemplateDAO;
            };
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        id: number;
        meta: {
            created: string;
            modified: string | null;
            creator: {
                id: number;
                firstName: string | null;
                lastName: string | null;
                email: string;
            };
            modifier: {
                id: number;
                firstName: string | null;
                lastName: string | null;
                email: string;
            } | null;
        };
        properties: {
            name: string;
            dateRange: {
                start: string | null;
                end: string | null;
            };
        };
        owner: {
            id: number;
            firstName: string | null;
            lastName: string | null;
            email: string;
        };
    }[]>;
}>;
export type UserRouter = typeof userRouter;
