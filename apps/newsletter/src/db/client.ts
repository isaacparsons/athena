import { Kysely } from 'kysely';
import {
  DbCountry,
  DbUserNewsletter,
  DbNewsletter,
  DbUser,
  DbFederatedCredential,
  DbLocation,
  DbNewsletterItem,
  DbNewsletterItemPhoto,
} from './tables/index';
import { Database } from './db';
import { IDbTable } from './tables/db-table';

export class DBClient {
  db: Kysely<Database>;
  tables: IDbTable[];
  constructor(db: Kysely<Database>) {
    this.db = db;
    this.tables = [
      new DbLocation(this.db, 'location'),
      new DbCountry(this.db, 'country'),
      new DbUser(this.db, 'user'),
      new DbFederatedCredential(this.db, 'federatedCredential'),
      new DbNewsletter(this.db, 'newsletter'),
      new DbUserNewsletter(this.db, 'userNewsletter'),
      new DbNewsletterItem(this.db, 'newsletterItem'),
      new DbNewsletterItemPhoto(this.db, 'newsletterItemPhoto'),
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
}
