import { Kysely } from 'kysely';
import { Database } from '../db';
export interface IDbTable {
  db: Kysely<Database>;
  name: string;
  createTable: () => Promise<void>;
  deleteTable: () => Promise<void>;
}

export abstract class DbTable implements IDbTable {
  db: Kysely<Database>;
  name: string;
  constructor(db: Kysely<Database>, name: string) {
    this.name = name;
    this.db = db;
  }
  async createTable() {
    throw new Error('not implemented');
  }
  async deleteTable() {
    this.db.schema.dropTable(this.name).ifExists().cascade().execute();
    return;
  }
}
