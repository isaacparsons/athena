import { Container } from 'inversify';
import { GCSConfig, TYPES } from './types/types';
import {
  NewsletterDAO,
  NewsletterPostDAO,
  NewsletterPostDetailsDAO,
  UserDAO,
  LocationDAO,
  TemplateDAO,
  TemplateNodeDAO,
} from './dao';
import { GCSManager } from './services';
import {
  DB,
  Pool,
  PostgresDialect,
  INewsletterDAO,
  INewsletterPostDetailsDAO,
  INewsletterPostDAO,
  ILocationDAO,
  IUserDAO,
  ITemplateDAO,
  ITemplateNodeDAO,
  IGCSManager,
} from '@backend/types';
import { getConfig } from './util';
import { Kysely } from 'kysely';

const config = getConfig();

const container = new Container();
container.bind<GCSConfig>(TYPES.gcsConfig).toConstantValue(config.gcs);
container.bind(TYPES.DBClient).toConstantValue(
  new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: config.db.name,
        host: config.db.host,
        user: config.db.username,
        password: config.db.password,
        port: config.db.port,
        max: 10, //10
      }),
    }),
  })
);
container.bind<ILocationDAO>(TYPES.ILocationDAO).to(LocationDAO).inSingletonScope();
container
  .bind<INewsletterDAO>(TYPES.INewsletterDAO)
  .to(NewsletterDAO)
  .inSingletonScope();
container
  .bind<INewsletterPostDetailsDAO>(TYPES.INewsletterPostDetailsDAO)
  .to(NewsletterPostDetailsDAO)
  .inSingletonScope();
container
  .bind<INewsletterPostDAO>(TYPES.INewsletterPostDAO)
  .to(NewsletterPostDAO)
  .inSingletonScope();
container.bind<IUserDAO>(TYPES.IUserDAO).to(UserDAO).inSingletonScope();
container.bind<ITemplateDAO>(TYPES.ITemplateDAO).to(TemplateDAO).inSingletonScope();
container
  .bind<ITemplateNodeDAO>(TYPES.ITemplateNodeDAO)
  .to(TemplateNodeDAO)
  .inSingletonScope();
container.bind<IGCSManager>(TYPES.IGCSManager).to(GCSManager).inSingletonScope();

export { container };
