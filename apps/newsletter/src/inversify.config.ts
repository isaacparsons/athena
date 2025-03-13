import { Container } from 'inversify';
import { GCSConfig, TYPES } from './types/types';
import {
  NewsletterDAO,
  INewsletterDAO,
  INewsletterPostDetailsDAO,
  NewsletterPostDAO,
  NewsletterPostDetailsDAO,
  INewsletterPostDAO,
  IUserDAO,
  UserDAO,
  // INewsletterPostTemplateDAO,
  // NewsletterPostTemplateDAO,
  ILocationDAO,
  LocationDAO,
} from './dao';
import { GCSManager, IGCSManager } from './services';
import { Database, DB, Pool, PostgresDialect } from './db';
import { getConfig } from './util';

const config = getConfig();

const container = new Container();
container.bind<GCSConfig>(TYPES.gcsConfig).toConstantValue(config.gcs);
container.bind(TYPES.DBClient).toConstantValue(
  new DB<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: config.db.name,
        host: config.db.host,
        user: config.db.username,
        password: config.db.password,
        port: config.db.port,
        max: 10,
      }),
    }),
  })
);
container.bind<ILocationDAO>(TYPES.ILocationDAO).to(LocationDAO);
container.bind<INewsletterDAO>(TYPES.INewsletterDAO).to(NewsletterDAO);
container
  .bind<INewsletterPostDetailsDAO>(TYPES.INewsletterPostDetailsDAO)
  .to(NewsletterPostDetailsDAO);
container.bind<INewsletterPostDAO>(TYPES.INewsletterPostDAO).to(NewsletterPostDAO);
container.bind<IUserDAO>(TYPES.IUserDAO).to(UserDAO);
// container
//   .bind<INewsletterPostTemplateDAO>(TYPES.INewsletterPostTemplateDAO)
//   .to(NewsletterPostTemplateDAO);
container.bind<IGCSManager>(TYPES.IGCSManager).to(GCSManager).inSingletonScope();

export { container };
