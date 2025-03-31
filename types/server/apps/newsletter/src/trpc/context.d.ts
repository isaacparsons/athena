import { Database, DB } from '@athena/db';
import { UserDAO, NewsletterDAO, LocationDAO, NewsletterPostDAO, INewsletterDAO, IUserDAO, ILocationDAO, INewsletterPostDAO, TemplateDAO, ITemplateDAO } from '@athena/dao';
import { GCSManager, IGCSManager } from '@athena/services';
import { Request, Response } from 'express';
import { UserSession } from '@athena/common';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
export type Context = {
    req: Request & {
        user?: UserSession;
        isAuthenticated(): () => boolean;
    };
    res: Response;
    gcs: GCSManager;
    db: DB<Database>;
    dao: {
        user: UserDAO;
        newsletter: NewsletterDAO;
        location: LocationDAO;
        newsletterPost: NewsletterPostDAO;
        template: TemplateDAO;
    };
};
export declare function createContext({ req, res }: CreateExpressContextOptions): {
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    gcs: IGCSManager;
    db: DB<import("../types/db").DB>;
    dao: {
        user: IUserDAO;
        newsletter: INewsletterDAO;
        location: ILocationDAO;
        newsletterPost: INewsletterPostDAO;
        template: ITemplateDAO;
    };
};
