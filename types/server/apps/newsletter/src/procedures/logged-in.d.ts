export declare const loggedInProcedure: import("@trpc/server").ProcedureBuilder<{
    _config: import("@trpc/server").RootConfig<{
        ctx: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                user?: import("@athena/api").UserSession;
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
            user?: import("@athena/api").UserSession;
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
    _input_in: typeof import("@trpc/server").unsetMarker;
    _input_out: typeof import("@trpc/server").unsetMarker;
    _output_in: typeof import("@trpc/server").unsetMarker;
    _output_out: typeof import("@trpc/server").unsetMarker;
}>;
