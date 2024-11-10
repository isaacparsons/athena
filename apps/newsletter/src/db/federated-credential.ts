import { Insertable, Selectable, Updateable } from 'kysely';
import {
  DBConnection,
  Table,
  ITable,
  UniqueId,
  ImmutableString,
  ImmutableNumber,
  TABLE_NAMES,
} from '@athena/db';

export interface FederatedCredentialTableColumns {
  id: UniqueId;
  provider: ImmutableString;
  subjectId: ImmutableString;
  userId: ImmutableNumber;
}

export interface FederatedCredentialTable {
  name: TABLE_NAMES.FEDEREATED_CREDENTIAL;
  columns: FederatedCredentialTableColumns;
}

export type SelectFederatedCredential = Selectable<FederatedCredentialTableColumns>;
export type InsertFederatedCredential = Insertable<FederatedCredentialTableColumns>;
export type UpdateFederatedCredential = Updateable<FederatedCredentialTableColumns>;

export class FederatedCredentialTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
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
        col.references(`${TABLE_NAMES.USER}.id`).notNull().onDelete('cascade')
      )
      .execute();
    return;
  }
}
