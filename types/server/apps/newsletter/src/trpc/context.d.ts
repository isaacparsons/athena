import { UserDAO, NewsletterDAO, LocationDAO, NewsletterItemDAO, NewsletterItemTemplateDAO } from '../dao';
import { GCSManager } from '../services';
import { Request, Response } from 'express';
import { UserSession } from '@athena/athena-common';
type ContextInput = {
    req: Request & {
        user?: UserSession;
        isAuthenticated(): () => boolean;
    };
    res: Response;
};
export type Context = {
    req: Request & {
        user?: UserSession;
        isAuthenticated(): () => boolean;
    };
    res: Response;
    gcs: GCSManager;
    dao: {
        user: UserDAO;
        newsletter: NewsletterDAO;
        location: LocationDAO;
        newsletterItem: NewsletterItemDAO;
        newsletterItemTemplate: NewsletterItemTemplateDAO;
    };
};
export declare function createContext({ req, res }: ContextInput): {
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> & {
        user?: UserSession;
        isAuthenticated(): () => boolean;
    };
    res: Response<any, Record<string, any>>;
    gcs: GCSManager;
    db: import("kysely/dist/cjs/kysely").Kysely<import("../db").Database>;
    dao: {
        user: UserDAO;
        newsletter: NewsletterDAO;
        location: LocationDAO;
        newsletterItem: NewsletterItemDAO;
        newsletterItemTemplate: NewsletterItemTemplateDAO;
    };
};
export {};
