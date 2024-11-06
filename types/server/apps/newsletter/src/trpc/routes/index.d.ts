export * from './user';
export * from './newsletter';
export * from './newsletter-item';
export * from './newsletter-item-template';
export * from './auth';
export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
    users: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, import("@athena/athena-common").UserNewsletters>;
        newsletterItemTemplates: import("@trpc/server").BuildProcedure<"query", {
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
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, import("@athena/athena-common").UserNewsletterItemTemplates>;
    }>;
    newsletters: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
                startDate?: string | undefined;
                endDate?: string | undefined;
            };
            _input_out: {
                name: string;
                startDate?: string | undefined;
                endDate?: string | undefined;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, number>;
        update: import("@trpc/server").BuildProcedure<"mutation", {
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
        }, number>;
        delete: import("@trpc/server").BuildProcedure<"mutation", {
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
        }, number>;
    }>;
    newsletterItems: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
                newsletterItemId: number;
            };
            _input_out: {
                newsletterItemId: number;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, import("@athena/athena-common").NewsletterItem<import("@athena/athena-common").NewsletterItemTypeName>>;
        getItemUploadLinks: import("@trpc/server").BuildProcedure<"query", {
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
                items: {
                    id: string;
                }[];
            };
            _input_out: {
                items: {
                    id: string;
                }[];
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            url: string;
            id: string;
            fileName: string;
        }[]>;
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
                parentId: number | null;
                newsletterId: number;
                nextItemId: number | null;
                previousItemId: number | null;
                title: string;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
                date?: string | undefined;
                details?: {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemTypeName.Media;
                    fileName: string;
                    format: import("@athena/athena-common").MediaFormat;
                    caption?: string | null | undefined;
                } | {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemTypeName.Text;
                    description?: string | null | undefined;
                    link?: string | null | undefined;
                } | undefined;
            };
            _input_out: {
                parentId: number | null;
                newsletterId: number;
                nextItemId: number | null;
                previousItemId: number | null;
                title: string;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
                date?: string | undefined;
                details?: {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemTypeName.Media;
                    fileName: string;
                    format: import("@athena/athena-common").MediaFormat;
                    caption?: string | null | undefined;
                } | {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemTypeName.Text;
                    description?: string | null | undefined;
                    link?: string | null | undefined;
                } | undefined;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, number>;
        createBatch: import("@trpc/server").BuildProcedure<"mutation", {
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
                parentId: number | null;
                newsletterId: number;
                nextItemId: number | null;
                previousItemId: number | null;
                batch: {
                    newsletterId: number;
                    title: string;
                    temp: {
                        id: string;
                        parentId: string | null;
                        nextId: string | null;
                        prevId: string | null;
                    };
                    location?: {
                        name?: string | undefined;
                        longitude?: number | undefined;
                        lattitude?: number | undefined;
                        countryCode?: string | undefined;
                    } | undefined;
                    date?: string | undefined;
                    details?: {
                        name: string;
                        type: import("@athena/athena-common").NewsletterItemTypeName.Media;
                        fileName: string;
                        format: import("@athena/athena-common").MediaFormat;
                        caption?: string | null | undefined;
                    } | {
                        name: string;
                        type: import("@athena/athena-common").NewsletterItemTypeName.Text;
                        description?: string | null | undefined;
                        link?: string | null | undefined;
                    } | undefined;
                }[];
            };
            _input_out: {
                parentId: number | null;
                newsletterId: number;
                nextItemId: number | null;
                previousItemId: number | null;
                batch: {
                    newsletterId: number;
                    title: string;
                    temp: {
                        id: string;
                        parentId: string | null;
                        nextId: string | null;
                        prevId: string | null;
                    };
                    location?: {
                        name?: string | undefined;
                        longitude?: number | undefined;
                        lattitude?: number | undefined;
                        countryCode?: string | undefined;
                    } | undefined;
                    date?: string | undefined;
                    details?: {
                        name: string;
                        type: import("@athena/athena-common").NewsletterItemTypeName.Media;
                        fileName: string;
                        format: import("@athena/athena-common").MediaFormat;
                        caption?: string | null | undefined;
                    } | {
                        name: string;
                        type: import("@athena/athena-common").NewsletterItemTypeName.Text;
                        description?: string | null | undefined;
                        link?: string | null | undefined;
                    } | undefined;
                }[];
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, number[]>;
        update: import("@trpc/server").BuildProcedure<"mutation", {
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
                newsletterItemId: number;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
                date?: string | null | undefined;
                nextItemId?: number | undefined;
                title?: string | undefined;
                details?: {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemTypeName.Media;
                    fileName: string;
                    format: import("@athena/athena-common").MediaFormat;
                    caption?: string | null | undefined;
                } | {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemTypeName.Text;
                    description?: string | null | undefined;
                    link?: string | null | undefined;
                } | undefined;
            };
            _input_out: {
                newsletterItemId: number;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
                date?: string | null | undefined;
                nextItemId?: number | undefined;
                title?: string | undefined;
                details?: {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemTypeName.Media;
                    fileName: string;
                    format: import("@athena/athena-common").MediaFormat;
                    caption?: string | null | undefined;
                } | {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemTypeName.Text;
                    description?: string | null | undefined;
                    link?: string | null | undefined;
                } | undefined;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, void>;
        deleteMany: import("@trpc/server").BuildProcedure<"mutation", {
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
                newsletterItemIds: number[];
            };
            _input_out: {
                newsletterItemIds: number[];
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, void>;
    }>;
    newsletterItemTemplates: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
}>;
export type AppRouter = typeof appRouter;
export * from './newsletter';
