import {
  CountryTable,
  UserNewsletterTable,
  NewsletterTable,
  UserTable,
  FederatedCredentialTable,
  LocationTable,
  NewsletterItemTable,
  NewsletterItemMediaTable,
  NewsletterItemTextTable,
} from '../db/tables';
import {
  ITable,
  Connection as DBConnection,
  PostgresDialect,
  Pool,
  DB,
  Database,
} from '../types/db';
import { NewsletterDAO } from '../dao/newsletter';
import { parseEnv } from '../util/parse-env';

const env = process.env as any; //parseEnv();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: env['DB_NAME'],
    host: env['DB_HOST'],
    user: env['DB_USERNAME'],
    password: env['DB_PASSWORD'],
    port: env['DB_PORT'],
    max: 10,
  }),
});

export const dbClient = new DB<Database>({
  dialect,
});

export class DBManagerClient {
  tables: ITable[];
  constructor() {
    this.tables = [
      new LocationTable(dbClient, 'location'),
      new CountryTable(dbClient, 'country'),
      new UserTable(dbClient, 'user'),
      new FederatedCredentialTable(dbClient, 'federatedCredential'),
      new NewsletterTable(dbClient, 'newsletter'),
      new UserNewsletterTable(dbClient, 'userNewsletter'),
      new NewsletterItemTable(dbClient, 'newsletterItem'),
      new NewsletterItemMediaTable(dbClient, 'newsletterItemMedia'),
      new NewsletterItemTextTable(dbClient, 'newsletterItemText'),
    ];
  }
  async createTables() {
    for (let i = 0; i < this.tables.length; i++) {
      await this.tables[i].createTable();
    }
  }

  async dropTables() {
    for (let i = 0; i < this.tables.length; i++) {
      await this.tables[i].deleteTable();
    }
  }

  async seed() {
    console.log('seeding...');
    const user = await dbClient
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
  }
}
