"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types/types");
const dao_1 = require("./dao");
const services_1 = require("./services");
const db_1 = require("./db");
const util_1 = require("./util");
const config = (0, util_1.getConfig)();
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.gcsConfig).toConstantValue(config.gcs);
container.bind(types_1.TYPES.DBClient).toConstantValue(new db_1.DB({
    dialect: new db_1.PostgresDialect({
        pool: new db_1.Pool({
            database: config.db.name,
            host: config.db.host,
            user: config.db.username,
            password: config.db.password,
            port: config.db.port,
            max: 10, //10
        }),
    }),
}));
container.bind(types_1.TYPES.ILocationDAO).to(dao_1.LocationDAO).inSingletonScope();
container
    .bind(types_1.TYPES.INewsletterDAO)
    .to(dao_1.NewsletterDAO)
    .inSingletonScope();
container
    .bind(types_1.TYPES.INewsletterPostDetailsDAO)
    .to(dao_1.NewsletterPostDetailsDAO)
    .inSingletonScope();
container
    .bind(types_1.TYPES.INewsletterPostDAO)
    .to(dao_1.NewsletterPostDAO)
    .inSingletonScope();
container.bind(types_1.TYPES.IUserDAO).to(dao_1.UserDAO).inSingletonScope();
// container
//   .bind<INewsletterPostTemplateDAO>(TYPES.INewsletterPostTemplateDAO)
//   .to(NewsletterPostTemplateDAO);
container.bind(types_1.TYPES.IGCSManager).to(services_1.GCSManager).inSingletonScope();
//# sourceMappingURL=inversify.config.js.map