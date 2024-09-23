import { Insertable, Selectable, Updateable, Kysely } from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';
import { ImmutableNumber, ImmutableString, UniqueId } from '.';

export interface FederatedCredentialTable {
  id: UniqueId;
  provider: ImmutableString;
  subjectId: ImmutableString;
  userId: ImmutableNumber;
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
      .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
      .addColumn('provider', 'varchar', (col) => col.notNull())
      .addColumn('subjectId', 'varchar', (col) => col.notNull())
      .addColumn('userId', 'integer', (col) =>
        col.references('user.id').notNull().onDelete('cascade')
      )
      .execute();
    return;
  }
}
