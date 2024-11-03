"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManagerClient = exports.dbClient = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../db");
const env = process.env; //parseEnv();
const dialect = new db_1.PostgresDialect({
    pool: new db_1.Pool({
        database: env['DB_NAME'],
        host: env['DB_HOST'],
        user: env['DB_USERNAME'],
        password: env['DB_PASSWORD'],
        port: env['DB_PORT'],
        max: 10,
    }),
});
exports.dbClient = new db_1.DB({
    dialect,
});
class DBManagerClient {
    constructor() {
        this.tables = [
            new db_1.LocationTableClient(exports.dbClient, db_1.TABLE_NAMES.LOCATION),
            new db_1.CountryTableClient(exports.dbClient, db_1.TABLE_NAMES.COUNTRY),
            new db_1.UserTableClient(exports.dbClient, db_1.TABLE_NAMES.USER),
            new db_1.FederatedCredentialTableClient(exports.dbClient, db_1.TABLE_NAMES.FEDEREATED_CREDENTIAL),
            new db_1.NewsletterTableClient(exports.dbClient, db_1.TABLE_NAMES.NEWSLETTER),
            new db_1.UserNewsletterTableClient(exports.dbClient, db_1.TABLE_NAMES.USER_NEWSLETTER),
            new db_1.NewsletterItemTableClient(exports.dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM),
            new db_1.NewsletterItemMediaTableClient(exports.dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_MEDIA),
            new db_1.NewsletterItemTextTableClient(exports.dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEXT),
            new db_1.NewsletterItemTemplateTableClient(exports.dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE),
            new db_1.NewsletterItemTemplateDataTableClient(exports.dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE_DATA),
            new db_1.UserTemplateTableClient(exports.dbClient, db_1.TABLE_NAMES.USER_TEMPLATE),
        ];
    }
    createTables() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.tables.length; i++) {
                yield this.tables[i].createTable();
            }
        });
    }
    dropTables() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.tables.length; i++) {
                yield this.tables[i].deleteTable();
            }
        });
    }
    seed() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('seeding...');
            const user = yield exports.dbClient
                .insertInto('user')
                .values({
                firstName: 'SUPER',
                lastName: 'USER',
                email: 'isaac.2962@gmail.com',
            })
                .returningAll()
                .executeTakeFirstOrThrow();
            console.log('user created!');
            console.log(user);
            // const newsletter = await new NewsletterDAO(dbClient).post({
            //   name: 'Test newsletter 1',
            //   startDate: new Date(2024, 1, 1).toISOString(),
            //   endDate: new Date(2024, 1, 30).toISOString(),
            // });
            // console.log('newsletter created!');
            // console.log(newsletter);
        });
    }
}
exports.DBManagerClient = DBManagerClient;
//# sourceMappingURL=client.js.map