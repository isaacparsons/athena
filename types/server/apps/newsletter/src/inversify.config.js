"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types/types");
const dao_1 = require("./dao");
const services_1 = require("./services");
const db_1 = require("./db");
const env = process.env; //parseEnv();
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.DBClient).toConstantValue(new db_1.DB({
    dialect: new db_1.PostgresDialect({
        pool: new db_1.Pool({
            database: env['DB_NAME'],
            host: env['DB_HOST'],
            user: env['DB_USERNAME'],
            password: env['DB_PASSWORD'],
            port: env['DB_PORT'],
            max: 10,
        }),
    }),
}));
container.bind(types_1.TYPES.ILocationDAO).to(dao_1.LocationDAO);
container.bind(types_1.TYPES.INewsletterDAO).to(dao_1.NewsletterDAO);
container
    .bind(types_1.TYPES.INewsletterItemDetailsDAO)
    .to(dao_1.NewsletterItemDetailsDAO);
container.bind(types_1.TYPES.INewsletterItemDAO).to(dao_1.NewsletterItemDAO);
container.bind(types_1.TYPES.IUserDAO).to(dao_1.UserDAO);
container
    .bind(types_1.TYPES.INewsletterItemTemplateDAO)
    .to(dao_1.NewsletterItemTemplateDAO);
container.bind(types_1.TYPES.IGCSManager).to(services_1.GCSManager);
//# sourceMappingURL=inversify.config.js.map