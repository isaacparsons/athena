declare const router: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
            user?: import("@athena/athena-common").UserSession;
            isAuthenticated(): () => boolean;
        };
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
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                    user?: import("@athena/athena-common").UserSession;
                    isAuthenticated(): () => boolean;
                };
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
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                user?: import("@athena/athena-common").UserSession;
                isAuthenticated(): () => boolean;
            };
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
        _input_in: {
            id: number;
        };
        _input_out: {
            id: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("@athena/athena-common").NewsletterItemTemplate>;
    create: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                    user?: import("@athena/athena-common").UserSession;
                    isAuthenticated(): () => boolean;
                };
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
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                user?: import("@athena/athena-common").UserSession;
                isAuthenticated(): () => boolean;
            };
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
        _input_in: {
            name: string;
            data: {
                temp: {
                    id: string;
                    parentId: string | null;
                    nextId: string | null;
                    prevId: string | null;
                };
                data?: {
                    type: import("@athena/athena-common").NewsletterItemTypeName.Media;
                    format: import("@athena/athena-common").MediaFormat;
                    name?: string | undefined;
                    fileName?: string | undefined;
                    caption?: string | null | undefined;
                } | {
                    type: import("@athena/athena-common").NewsletterItemTypeName.Text;
                    name?: string | undefined;
                    description?: string | null | undefined;
                    link?: string | null | undefined;
                } | undefined;
                templateId?: number | undefined;
            }[];
        };
        _input_out: {
            name: string;
            data: {
                temp: {
                    id: string;
                    parentId: string | null;
                    nextId: string | null;
                    prevId: string | null;
                };
                data?: {
                    type: import("@athena/athena-common").NewsletterItemTypeName.Media;
                    format: import("@athena/athena-common").MediaFormat;
                    name?: string | undefined;
                    fileName?: string | undefined;
                    caption?: string | null | undefined;
                } | {
                    type: import("@athena/athena-common").NewsletterItemTypeName.Text;
                    name?: string | undefined;
                    description?: string | null | undefined;
                    link?: string | null | undefined;
                } | undefined;
                templateId?: number | undefined;
            }[];
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, number>;
}>;
export default router;
