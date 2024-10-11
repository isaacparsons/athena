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
                endDate: string;
            };
            _input_out: {
                name: string;
                startDate: string;
                endDate: string;
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
                title: string;
                parentId: number | null;
                nextItemId: number | null;
                previousItemId: number | null;
                date?: string | undefined;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
                details?: {
                    name: string;
                    fileName: string;
                    type: "media";
                    caption?: string | undefined;
                } | {
                    name: string;
                    type: "text";
                    description?: string | undefined;
                    link?: string | undefined;
                } | undefined;
            };
            _input_out: {
                newsletterId: number;
                title: string;
                parentId: number | null;
                nextItemId: number | null;
                previousItemId: number | null;
                date?: string | undefined;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
                details?: {
                    name: string;
                    fileName: string;
                    type: "media";
                    caption?: string | undefined;
                } | {
                    name: string;
                    type: "text";
                    description?: string | undefined;
                    link?: string | undefined;
                } | undefined;
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
                newsletterItemId: number;
                title?: string | undefined;
                date?: string | null | undefined;
                nextItemId?: number | undefined;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
            };
            _input_out: {
                newsletterItemId: number;
                title?: string | undefined;
                date?: string | null | undefined;
                nextItemId?: number | undefined;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
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
                newsletterItemIds: number[];
            };
            _input_out: {
                newsletterItemIds: number[];
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, void>;
    }>;
}>;
export type AppRouter = typeof appRouter;
