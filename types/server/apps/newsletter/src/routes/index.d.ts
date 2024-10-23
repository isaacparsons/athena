export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
    users: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
        newsletterItemTemplates: import("@trpc/server").BuildProcedure<"query", {
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
            name: string;
        }[]>;
    }>;
    newsletters: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
        }, number>;
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
    newsletterItems: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
            _input_in: {
                newsletterItemId: number;
            };
            _input_out: {
                newsletterItemId: number;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, import("@athena/athena-common").NewsletterItem>;
        getItemUploadLinks: import("@trpc/server").BuildProcedure<"query", {
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
            _input_in: {
                newsletterId: number;
                parentId: number | null;
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
                    type: import("@athena/athena-common").NewsletterItemType.media;
                    fileName: string;
                    caption?: string | undefined;
                } | {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemType.text;
                    description?: string | undefined;
                    link?: string | undefined;
                } | undefined;
            };
            _input_out: {
                newsletterId: number;
                parentId: number | null;
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
                    type: import("@athena/athena-common").NewsletterItemType.media;
                    fileName: string;
                    caption?: string | undefined;
                } | {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemType.text;
                    description?: string | undefined;
                    link?: string | undefined;
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
            _input_in: {
                newsletterId: number;
                parentId: number | null;
                nextItemId: number | null;
                previousItemId: number | null;
                batch: {
                    title: string;
                    temp: {
                        id: number;
                        parentId: number | null;
                        nextItemId: number | null;
                        previousItemId: number | null;
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
                        type: import("@athena/athena-common").NewsletterItemType.media;
                        fileName: string;
                        caption?: string | undefined;
                    } | {
                        name: string;
                        type: import("@athena/athena-common").NewsletterItemType.text;
                        description?: string | undefined;
                        link?: string | undefined;
                    } | undefined;
                }[];
            };
            _input_out: {
                newsletterId: number;
                parentId: number | null;
                nextItemId: number | null;
                previousItemId: number | null;
                batch: {
                    title: string;
                    temp: {
                        id: number;
                        parentId: number | null;
                        nextItemId: number | null;
                        previousItemId: number | null;
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
                        type: import("@athena/athena-common").NewsletterItemType.media;
                        fileName: string;
                        caption?: string | undefined;
                    } | {
                        name: string;
                        type: import("@athena/athena-common").NewsletterItemType.text;
                        description?: string | undefined;
                        link?: string | undefined;
                    } | undefined;
                }[];
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            id: number;
        }[]>;
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
                    type: import("@athena/athena-common").NewsletterItemType.media;
                    fileName: string;
                    caption?: string | undefined;
                } | {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemType.text;
                    description?: string | undefined;
                    link?: string | undefined;
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
                    type: import("@athena/athena-common").NewsletterItemType.media;
                    fileName: string;
                    caption?: string | undefined;
                } | {
                    name: string;
                    type: import("@athena/athena-common").NewsletterItemType.text;
                    description?: string | undefined;
                    link?: string | undefined;
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
            _input_in: {
                name: string;
                data: {
                    temp: {
                        id: number;
                        parentId: number | null;
                        nextId: number | null;
                        prevId: number | null;
                    };
                    templateId?: number | undefined;
                    data?: {
                        type: import("@athena/athena-common").NewsletterItemType.media;
                        name?: string | undefined;
                        fileName?: string | undefined;
                        caption?: string | undefined;
                    } | {
                        type: import("@athena/athena-common").NewsletterItemType.text;
                        name?: string | undefined;
                        description?: string | undefined;
                        link?: string | undefined;
                    } | undefined;
                }[];
            };
            _input_out: {
                name: string;
                data: {
                    temp: {
                        id: number;
                        parentId: number | null;
                        nextId: number | null;
                        prevId: number | null;
                    };
                    templateId?: number | undefined;
                    data?: {
                        type: import("@athena/athena-common").NewsletterItemType.media;
                        name?: string | undefined;
                        fileName?: string | undefined;
                        caption?: string | undefined;
                    } | {
                        type: import("@athena/athena-common").NewsletterItemType.text;
                        name?: string | undefined;
                        description?: string | undefined;
                        link?: string | undefined;
                    } | undefined;
                }[];
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, number>;
    }>;
}>;
export type AppRouter = typeof appRouter;
