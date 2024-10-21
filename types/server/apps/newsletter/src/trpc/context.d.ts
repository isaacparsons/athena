import { UserDAO } from '../dao/user';
import { NewsletterDAO } from '../dao/newsletter';
import { GCSManager } from '../services/gcs';
import { LocationDAO } from '../dao/location';
import { NewsletterItemDAO } from '../dao/newsletter-item';
import { Request, Response } from 'express';
import { UserSession } from '@athena/athena-common';
import { NewsletterItemTemplateDAO } from '../dao/newsletter-item-template';
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
    db: import("kysely").Kysely<import("../types/db").Database>;
    dao: {
        user: UserDAO;
        newsletter: NewsletterDAO;
        location: LocationDAO;
        newsletterItem: NewsletterItemDAO;
        newsletterItemTemplate: NewsletterItemTemplateDAO;
    };
};
export {};
