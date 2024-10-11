import { UserDAO } from '../dao/user';
import { NewsletterDAO } from '../dao/newsletter';
import { GCSManager } from '../services/gcs';
import { LocationDAO } from '../dao/location';
import { NewsletterItemDAO } from '../dao/newsletter-item';
import { Request, Response } from 'express';
import { UserSession } from '@athena/athena-common';
export declare function createContext({ req, res, }: {
    req: Request & {
        user?: UserSession;
        isAuthenticated(): () => boolean;
    };
    res: Response;
}): {
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
    };
};
