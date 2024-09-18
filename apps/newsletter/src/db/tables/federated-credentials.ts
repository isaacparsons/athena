import { Insertable, Selectable, Updateable, Generated, Kysely } from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';

export interface FederatedCredentialTable {
  id: Generated<number>;
  provider: string;
  subjectId: string;
  userId: number;
}
export type FederatedCredential = Selectable<FederatedCredentialTable>;
export type NewFederatedCredential = Insertable<FederatedCredentialTable>;
export type FederatedCredentialUpdate = Updateable<FederatedCredentialTable>;

export class DbFederatedCredential extends DbTable implements IDbTable {
  constructor(db: Kysely<Database>, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('provider', 'varchar', (col) => col.notNull())
      .addColumn('subjectId', 'varchar', (col) => col.notNull())
      .addColumn('userId', 'integer', (col) =>
        col.references('user.id').onDelete('cascade')
      )
      .execute();
    return;
  }
}
