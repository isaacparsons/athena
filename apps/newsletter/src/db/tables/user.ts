import { Insertable, Kysely, Selectable, Updateable } from 'kysely';
import { DbTable, IDbTable } from './db-table';
import { Database } from '../db';
import { ImmutableString, UniqueId } from '.';

export interface UserTable {
  id: UniqueId;
  firstName: string | null;
  lastName: string | null;
  email: ImmutableString;
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export class DbUser extends DbTable implements IDbTable {
  constructor(db: Kysely<Database>, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('firstName', 'varchar')
      .addColumn('lastName', 'varchar')
      .addColumn('email', 'varchar', (cb) => cb.notNull().unique())
      .execute();
    return;
  }
}
