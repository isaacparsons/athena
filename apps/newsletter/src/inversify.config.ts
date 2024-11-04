import { Container } from 'inversify';
import { TYPES } from './types/types';
import {
  NewsletterDAO,
  INewsletterDAO,
  INewsletterItemDetailsDAO,
  NewsletterItemDAO,
  NewsletterItemDetailsDAO,
  INewsletterItemDAO,
  IUserDAO,
  UserDAO,
  INewsletterItemTemplateDAO,
  NewsletterItemTemplateDAO,
  ILocationDAO,
  LocationDAO,
} from './dao';
import { GCSManager, IGCSManager } from './services';
import { Database, DB, Pool, PostgresDialect } from './db';

const env = process.env as any; //parseEnv();

const container = new Container();
container.bind(TYPES.DBClient).toConstantValue(
  new DB<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: env['DB_NAME'],
        host: env['DB_HOST'],
        user: env['DB_USERNAME'],
        password: env['DB_PASSWORD'],
        port: env['DB_PORT'],
        max: 10,
      }),
    }),
  })
);
container.bind<ILocationDAO>(TYPES.ILocationDAO).to(LocationDAO);
container.bind<INewsletterDAO>(TYPES.INewsletterDAO).to(NewsletterDAO);
container
  .bind<INewsletterItemDetailsDAO>(TYPES.INewsletterItemDetailsDAO)
  .to(NewsletterItemDetailsDAO);
container.bind<INewsletterItemDAO>(TYPES.INewsletterItemDAO).to(NewsletterItemDAO);
container.bind<IUserDAO>(TYPES.IUserDAO).to(UserDAO);
container
  .bind<INewsletterItemTemplateDAO>(TYPES.INewsletterItemTemplateDAO)
  .to(NewsletterItemTemplateDAO);
container.bind<IGCSManager>(TYPES.IGCSManager).to(GCSManager);

export { container };
