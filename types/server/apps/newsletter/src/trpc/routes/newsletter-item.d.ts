declare const router: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
        _input_in: {
            id: number;
        };
        _input_out: {
            id: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("@athena/common").NewsletterItem>;
    getItemUploadLinks: import("@trpc/server").BuildProcedure<"query", {
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
        _input_in: {
            position: {
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            };
            newsletterId: number;
            title: string;
            details: {
                name: string;
                type: import("@athena/common").NewsletterItemTypeName.Media;
                fileName: string;
                format: import("@athena/common").MediaFormat;
                caption?: string | null | undefined;
            } | {
                name: string;
                type: import("@athena/common").NewsletterItemTypeName.Text;
                description?: string | null | undefined;
                link?: string | null | undefined;
            } | {
                name: string;
                type: import("@athena/common").NewsletterItemTypeName.Container;
            };
            location?: {
                country?: string | undefined;
                name?: string | undefined;
                position?: {
                    longitude: number;
                    latitude: number;
                } | undefined;
            } | undefined;
            date?: string | null | undefined;
        };
        _input_out: {
            position: {
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            };
            newsletterId: number;
            title: string;
            details: {
                name: string;
                type: import("@athena/common").NewsletterItemTypeName.Media;
                fileName: string;
                format: import("@athena/common").MediaFormat;
                caption?: string | null | undefined;
            } | {
                name: string;
                type: import("@athena/common").NewsletterItemTypeName.Text;
                description?: string | null | undefined;
                link?: string | null | undefined;
            } | {
                name: string;
                type: import("@athena/common").NewsletterItemTypeName.Container;
            };
            location?: {
                country?: string | undefined;
                name?: string | undefined;
                position?: {
                    longitude: number;
                    latitude: number;
                } | undefined;
            } | undefined;
            date?: string | null | undefined;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, number>;
    createBatch: import("@trpc/server").BuildProcedure<"mutation", {
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
        _input_in: {
            position: {
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            };
            newsletterId: number;
            batch: {
                newsletterId: number;
                title: string;
                details: {
                    name: string;
                    type: import("@athena/common").NewsletterItemTypeName.Media;
                    fileName: string;
                    format: import("@athena/common").MediaFormat;
                    caption?: string | null | undefined;
                } | {
                    name: string;
                    type: import("@athena/common").NewsletterItemTypeName.Text;
                    description?: string | null | undefined;
                    link?: string | null | undefined;
                } | {
                    name: string;
                    type: import("@athena/common").NewsletterItemTypeName.Container;
                };
                temp: {
                    id: string;
                    parentId: string | null;
                    nextId: string | null;
                    prevId: string | null;
                };
                location?: {
                    country?: string | undefined;
                    name?: string | undefined;
                    position?: {
                        longitude: number;
                        latitude: number;
                    } | undefined;
                } | undefined;
                date?: string | null | undefined;
            }[];
        };
        _input_out: {
            position: {
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            };
            newsletterId: number;
            batch: {
                newsletterId: number;
                title: string;
                details: {
                    name: string;
                    type: import("@athena/common").NewsletterItemTypeName.Media;
                    fileName: string;
                    format: import("@athena/common").MediaFormat;
                    caption?: string | null | undefined;
                } | {
                    name: string;
                    type: import("@athena/common").NewsletterItemTypeName.Text;
                    description?: string | null | undefined;
                    link?: string | null | undefined;
                } | {
                    name: string;
                    type: import("@athena/common").NewsletterItemTypeName.Container;
                };
                temp: {
                    id: string;
                    parentId: string | null;
                    nextId: string | null;
                    prevId: string | null;
                };
                location?: {
                    country?: string | undefined;
                    name?: string | undefined;
                    position?: {
                        longitude: number;
                        latitude: number;
                    } | undefined;
                } | undefined;
                date?: string | null | undefined;
            }[];
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, number[]>;
    update: import("@trpc/server").BuildProcedure<"mutation", {
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
        _input_in: {
            id: number;
            location?: {
                id: number;
                country?: string | undefined;
                name?: string | undefined;
                position?: {
                    longitude: number;
                    latitude: number;
                } | undefined;
            } | undefined;
            date?: string | null | undefined;
            newsletterId?: number | undefined;
            title?: string | undefined;
            details?: {
                id: number;
                type: import("@athena/common").NewsletterItemTypeName.Media;
                name?: string | undefined;
                newsletterItemId?: number | undefined;
                fileName?: string | undefined;
                format?: import("@athena/common").MediaFormat | undefined;
                caption?: string | null | undefined;
            } | {
                id: number;
                type: import("@athena/common").NewsletterItemTypeName.Text;
                name?: string | undefined;
                newsletterItemId?: number | undefined;
                description?: string | null | undefined;
                link?: string | null | undefined;
            } | {
                id: number;
                type: import("@athena/common").NewsletterItemTypeName.Container;
                name?: string | undefined;
                newsletterItemId?: number | undefined;
            } | undefined;
            childPositions?: {
                id: number;
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            }[] | undefined;
        };
        _input_out: {
            id: number;
            location?: {
                id: number;
                country?: string | undefined;
                name?: string | undefined;
                position?: {
                    longitude: number;
                    latitude: number;
                } | undefined;
            } | undefined;
            date?: string | null | undefined;
            newsletterId?: number | undefined;
            title?: string | undefined;
            details?: {
                id: number;
                type: import("@athena/common").NewsletterItemTypeName.Media;
                name?: string | undefined;
                newsletterItemId?: number | undefined;
                fileName?: string | undefined;
                format?: import("@athena/common").MediaFormat | undefined;
                caption?: string | null | undefined;
            } | {
                id: number;
                type: import("@athena/common").NewsletterItemTypeName.Text;
                name?: string | undefined;
                newsletterItemId?: number | undefined;
                description?: string | null | undefined;
                link?: string | null | undefined;
            } | {
                id: number;
                type: import("@athena/common").NewsletterItemTypeName.Container;
                name?: string | undefined;
                newsletterItemId?: number | undefined;
            } | undefined;
            childPositions?: {
                id: number;
                parentId: number | null;
                nextId: number | null;
                prevId: number | null;
            }[] | undefined;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, number>;
    deleteMany: import("@trpc/server").BuildProcedure<"mutation", {
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
        _input_in: {
            ids: number[];
        };
        _input_out: {
            ids: number[];
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, void>;
}>;
export default router;
