export const TYPES = {
  ILocationDAO: Symbol.for('ILocationDAO'),
  IUserDAO: Symbol.for('IUserDAO'),
  INewsletterDAO: Symbol.for('INewsletterDAO'),
  INewsletterPostDAO: Symbol.for('INewsletterPostDAO'),
  INewsletterPostDetailsDAO: Symbol.for('INewsletterPostDetailsDAO'),
  ITemplateDAO: Symbol.for('ITemplateDAO'),
  ITemplateNodeDAO: Symbol.for('ITemplateNodeDAO'),
  IGCSManager: Symbol.for('IGCSManager'),
  DBClient: Symbol.for('DBClient'),
  gcsConfig: Symbol.for('gcsConfig'),
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
