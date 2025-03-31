export declare const trpc: {
    _config: import("@trpc/server").RootConfig<{
        ctx: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services").IGCSManager;
            db: import("kysely").Kysely<import("../types/db").DB>;
            dao: {
                user: import("../dao").IUserDAO;
                newsletter: import("../dao").INewsletterDAO;
                location: import("../dao").ILocationDAO;
                newsletterPost: import("../dao").INewsletterPostDAO;
                template: import("../dao").ITemplateDAO;
            };
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>;
    procedure: import("@trpc/server").ProcedureBuilder<{
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../services").IGCSManager;
                db: import("kysely").Kysely<import("../types/db").DB>;
                dao: {
                    user: import("../dao").IUserDAO;
                    newsletter: import("../dao").INewsletterDAO;
                    location: import("../dao").ILocationDAO;
                    newsletterPost: import("../dao").INewsletterPostDAO;
                    template: import("../dao").ITemplateDAO;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _ctx_out: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services").IGCSManager;
            db: import("kysely").Kysely<import("../types/db").DB>;
            dao: {
                user: import("../dao").IUserDAO;
                newsletter: import("../dao").INewsletterDAO;
                location: import("../dao").ILocationDAO;
                newsletterPost: import("../dao").INewsletterPostDAO;
                template: import("../dao").ITemplateDAO;
            };
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: object;
    }>;
    middleware: <TNewParams extends import("@trpc/server").ProcedureParams<import("@trpc/server").AnyRootConfig, unknown, unknown, unknown, unknown, unknown, unknown>>(fn: import("@trpc/server").MiddlewareFunction<{
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../services").IGCSManager;
                db: import("kysely").Kysely<import("../types/db").DB>;
                dao: {
                    user: import("../dao").IUserDAO;
                    newsletter: import("../dao").INewsletterDAO;
                    location: import("../dao").ILocationDAO;
                    newsletterPost: import("../dao").INewsletterPostDAO;
                    template: import("../dao").ITemplateDAO;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _ctx_out: {};
        _input_out: typeof import("@trpc/server").unsetMarker;
        _input_in: unknown;
        _output_in: unknown;
        _output_out: unknown;
        _meta: object;
    }, TNewParams>) => import("@trpc/server").MiddlewareBuilder<{
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../services").IGCSManager;
                db: import("kysely").Kysely<import("../types/db").DB>;
                dao: {
                    user: import("../dao").IUserDAO;
                    newsletter: import("../dao").INewsletterDAO;
                    location: import("../dao").ILocationDAO;
                    newsletterPost: import("../dao").INewsletterPostDAO;
                    template: import("../dao").ITemplateDAO;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _ctx_out: {};
        _input_out: typeof import("@trpc/server").unsetMarker;
        _input_in: unknown;
        _output_in: unknown;
        _output_out: unknown;
        _meta: object;
    }, TNewParams>;
    router: <TProcRouterRecord extends import("@trpc/server").ProcedureRouterRecord>(procedures: TProcRouterRecord) => import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services").IGCSManager;
            db: import("kysely").Kysely<import("../types/db").DB>;
            dao: {
                user: import("../dao").IUserDAO;
                newsletter: import("../dao").INewsletterDAO;
                location: import("../dao").ILocationDAO;
                newsletterPost: import("../dao").INewsletterPostDAO;
                template: import("../dao").ITemplateDAO;
            };
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, TProcRouterRecord>;
    mergeRouters: typeof import("@trpc/server").mergeRouters;
    createCallerFactory: <TRouter extends import("@trpc/server").Router<import("@trpc/server").AnyRouterDef<import("@trpc/server").RootConfig<{
        ctx: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services").IGCSManager;
            db: import("kysely").Kysely<import("../types/db").DB>;
            dao: {
                user: import("../dao").IUserDAO;
                newsletter: import("../dao").INewsletterDAO;
                location: import("../dao").ILocationDAO;
                newsletterPost: import("../dao").INewsletterPostDAO;
                template: import("../dao").ITemplateDAO;
            };
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, any>>>(router: TRouter) => import("@trpc/server").RouterCaller<TRouter["_def"]>;
};
export declare const publicProcedure: import("@trpc/server").ProcedureBuilder<{
    _config: import("@trpc/server").RootConfig<{
        ctx: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            gcs: import("../services").IGCSManager;
            db: import("kysely").Kysely<import("../types/db").DB>;
            dao: {
                user: import("../dao").IUserDAO;
                newsletter: import("../dao").INewsletterDAO;
                location: import("../dao").ILocationDAO;
                newsletterPost: import("../dao").INewsletterPostDAO;
                template: import("../dao").ITemplateDAO;
            };
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>;
    _ctx_out: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
        gcs: import("../services").IGCSManager;
        db: import("kysely").Kysely<import("../types/db").DB>;
        dao: {
            user: import("../dao").IUserDAO;
            newsletter: import("../dao").INewsletterDAO;
            location: import("../dao").ILocationDAO;
            newsletterPost: import("../dao").INewsletterPostDAO;
            template: import("../dao").ITemplateDAO;
        };
    };
    _input_in: typeof import("@trpc/server").unsetMarker;
    _input_out: typeof import("@trpc/server").unsetMarker;
    _output_in: typeof import("@trpc/server").unsetMarker;
    _output_out: typeof import("@trpc/server").unsetMarker;
    _meta: object;
}>;
