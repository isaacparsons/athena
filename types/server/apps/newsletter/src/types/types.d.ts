export declare const TYPES: {
    ILocationDAO: symbol;
    IUserDAO: symbol;
    INewsletterDAO: symbol;
    INewsletterPostDAO: symbol;
    INewsletterPostDetailsDAO: symbol;
    ITemplateDAO: symbol;
    IGCSManager: symbol;
    DBClient: symbol;
    gcsConfig: symbol;
};
export type Config = {
    app: {
        host: string;
        port: number;
        sessionSecret: string;
        sessionCookieName: string;
        adminSecret: string;
    };
    db: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
    };
    google: {
        clientId: string;
        clientSecret: string;
        callbackUrl: string;
    };
    gcs: {
        bucketName: string;
    };
    client: {
        host: string;
        port: number;
    };
};
export type AppConfig = Config['app'];
export type DbConfig = Config['db'];
export type GoogleConfig = Config['google'];
export type GCSConfig = Config['gcs'];
export type ClientConfig = Config['client'];
