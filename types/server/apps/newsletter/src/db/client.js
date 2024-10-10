"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManagerClient = exports.dbClient = void 0;
const tslib_1 = require("tslib");
const tables_1 = require("../db/tables");
const db_1 = require("../types/db");
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
            new tables_1.LocationTable(exports.dbClient, 'location'),
            new tables_1.CountryTable(exports.dbClient, 'country'),
            new tables_1.UserTable(exports.dbClient, 'user'),
            new tables_1.FederatedCredentialTable(exports.dbClient, 'federatedCredential'),
            new tables_1.NewsletterTable(exports.dbClient, 'newsletter'),
            new tables_1.UserNewsletterTable(exports.dbClient, 'userNewsletter'),
            new tables_1.NewsletterItemTable(exports.dbClient, 'newsletterItem'),
            new tables_1.NewsletterItemMediaTable(exports.dbClient, 'newsletterItemMedia'),
            new tables_1.NewsletterItemTextTable(exports.dbClient, 'newsletterItemText'),
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