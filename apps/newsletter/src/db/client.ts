import {
  CountryTableClient,
  UserNewsletterTableClient,
  NewsletterTableClient,
  UserTableClient,
  FederatedCredentialTableClient,
  LocationTableClient,
  NewsletterItemTableClient,
  NewsletterItemMediaTableClient,
  NewsletterItemTextTableClient,
  NewsletterItemTemplateTableClient,
  NewsletterItemTemplateDataTableClient,
  UserTemplateTableClient,
} from '../db';
import {
  ITable,
  PostgresDialect,
  Pool,
  DB,
  Database,
  TABLE_NAMES,
} from '../types/db';

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
      new LocationTableClient(dbClient, TABLE_NAMES.LOCATION),
      new CountryTableClient(dbClient, TABLE_NAMES.COUNTRY),
      new UserTableClient(dbClient, TABLE_NAMES.USER),
      new FederatedCredentialTableClient(
        dbClient,
        TABLE_NAMES.FEDEREATED_CREDENTIAL
      ),
      new NewsletterTableClient(dbClient, TABLE_NAMES.NEWSLETTER),
      new UserNewsletterTableClient(dbClient, TABLE_NAMES.USER_NEWSLETTER),
      new NewsletterItemTableClient(dbClient, TABLE_NAMES.NEWSLETTER_ITEM),
      new NewsletterItemMediaTableClient(
        dbClient,
        TABLE_NAMES.NEWSLETTER_ITEM_MEDIA
      ),
      new NewsletterItemTextTableClient(
        dbClient,
        TABLE_NAMES.NEWSLETTER_ITEM_TEXT
      ),
      new NewsletterItemTemplateTableClient(
        dbClient,
        TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE
      ),
      new NewsletterItemTemplateDataTableClient(
        dbClient,
        TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE_DATA
      ),
      new UserTemplateTableClient(dbClient, TABLE_NAMES.USER_TEMPLATE),
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
