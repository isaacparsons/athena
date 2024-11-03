declare const router: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
            user?: import("@athena/athena-common").UserSession;
            isAuthenticated(): () => boolean;
        };
        res: import("express").Response<any, Record<string, any>>;
        gcs: import("../../services").GCSManager;
        db: import("kysely").Kysely<import("../../db").Database>;
        dao: {
            user: import("../../dao").UserDAO;
            newsletter: import("../../dao").NewsletterDAO;
            location: import("../../dao").LocationDAO;
            newsletterItem: import("../../dao").NewsletterItemDAO;
            newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
                gcs: import("../../services").GCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").UserDAO;
                    newsletter: import("../../dao").NewsletterDAO;
                    location: import("../../dao").LocationDAO;
                    newsletterItem: import("../../dao").NewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
            gcs: import("../../services").GCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").UserDAO;
                newsletter: import("../../dao").NewsletterDAO;
                location: import("../../dao").LocationDAO;
                newsletterItem: import("../../dao").NewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
    }, import("@athena/athena-common").NewsletterItem<keyof import("@athena/athena-common").NewsletterItemDetailsMap>>;
    getItemUploadLinks: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
                    user?: import("@athena/athena-common").UserSession;
                    isAuthenticated(): () => boolean;
                };
                res: import("express").Response<any, Record<string, any>>;
                gcs: import("../../services").GCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").UserDAO;
                    newsletter: import("../../dao").NewsletterDAO;
                    location: import("../../dao").LocationDAO;
                    newsletterItem: import("../../dao").NewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
            gcs: import("../../services").GCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").UserDAO;
                newsletter: import("../../dao").NewsletterDAO;
                location: import("../../dao").LocationDAO;
                newsletterItem: import("../../dao").NewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
                gcs: import("../../services").GCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").UserDAO;
                    newsletter: import("../../dao").NewsletterDAO;
                    location: import("../../dao").LocationDAO;
                    newsletterItem: import("../../dao").NewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
            gcs: import("../../services").GCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").UserDAO;
                newsletter: import("../../dao").NewsletterDAO;
                location: import("../../dao").LocationDAO;
                newsletterItem: import("../../dao").NewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
            };
        };
        _input_in: {
            parentId: number | null;
            newsletterId: number;
            nextItemId: number | null;
            previousItemId: number | null;
            title: string;
            date?: string | undefined;
            location?: {
                name?: string | undefined;
                longitude?: number | undefined;
                lattitude?: number | undefined;
                countryCode?: string | undefined;
            } | undefined;
            details?: {
                name: string;
                type: "media";
                fileName: string;
                caption?: string | null | undefined;
            } | {
                name: string;
                type: "text";
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
            date?: string | undefined;
            location?: {
                name?: string | undefined;
                longitude?: number | undefined;
                lattitude?: number | undefined;
                countryCode?: string | undefined;
            } | undefined;
            details?: {
                name: string;
                type: "media";
                fileName: string;
                caption?: string | null | undefined;
            } | {
                name: string;
                type: "text";
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
                gcs: import("../../services").GCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").UserDAO;
                    newsletter: import("../../dao").NewsletterDAO;
                    location: import("../../dao").LocationDAO;
                    newsletterItem: import("../../dao").NewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
            gcs: import("../../services").GCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").UserDAO;
                newsletter: import("../../dao").NewsletterDAO;
                location: import("../../dao").LocationDAO;
                newsletterItem: import("../../dao").NewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
                date?: string | undefined;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
                details?: {
                    name: string;
                    type: "media";
                    fileName: string;
                    caption?: string | null | undefined;
                } | {
                    name: string;
                    type: "text";
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
                date?: string | undefined;
                location?: {
                    name?: string | undefined;
                    longitude?: number | undefined;
                    lattitude?: number | undefined;
                    countryCode?: string | undefined;
                } | undefined;
                details?: {
                    name: string;
                    type: "media";
                    fileName: string;
                    caption?: string | null | undefined;
                } | {
                    name: string;
                    type: "text";
                    description?: string | null | undefined;
                    link?: string | null | undefined;
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
                gcs: import("../../services").GCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").UserDAO;
                    newsletter: import("../../dao").NewsletterDAO;
                    location: import("../../dao").LocationDAO;
                    newsletterItem: import("../../dao").NewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
            gcs: import("../../services").GCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").UserDAO;
                newsletter: import("../../dao").NewsletterDAO;
                location: import("../../dao").LocationDAO;
                newsletterItem: import("../../dao").NewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
            };
        };
        _input_in: {
            newsletterItemId: number;
            date?: string | null | undefined;
            nextItemId?: number | undefined;
            title?: string | undefined;
            location?: {
                name?: string | undefined;
                longitude?: number | undefined;
                lattitude?: number | undefined;
                countryCode?: string | undefined;
            } | undefined;
            details?: {
                name: string;
                type: "media";
                fileName: string;
                caption?: string | null | undefined;
            } | {
                name: string;
                type: "text";
                description?: string | null | undefined;
                link?: string | null | undefined;
            } | undefined;
        };
        _input_out: {
            newsletterItemId: number;
            date?: string | null | undefined;
            nextItemId?: number | undefined;
            title?: string | undefined;
            location?: {
                name?: string | undefined;
                longitude?: number | undefined;
                lattitude?: number | undefined;
                countryCode?: string | undefined;
            } | undefined;
            details?: {
                name: string;
                type: "media";
                fileName: string;
                caption?: string | null | undefined;
            } | {
                name: string;
                type: "text";
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
                gcs: import("../../services").GCSManager;
                db: import("kysely").Kysely<import("../../db").Database>;
                dao: {
                    user: import("../../dao").UserDAO;
                    newsletter: import("../../dao").NewsletterDAO;
                    location: import("../../dao").LocationDAO;
                    newsletterItem: import("../../dao").NewsletterItemDAO;
                    newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
            gcs: import("../../services").GCSManager;
            db: import("kysely").Kysely<import("../../db").Database>;
            dao: {
                user: import("../../dao").UserDAO;
                newsletter: import("../../dao").NewsletterDAO;
                location: import("../../dao").LocationDAO;
                newsletterItem: import("../../dao").NewsletterItemDAO;
                newsletterItemTemplate: import("../../dao").NewsletterItemTemplateDAO;
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
export default router;
