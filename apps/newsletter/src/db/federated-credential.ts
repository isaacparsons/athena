import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import {
  DBConnection,
  Table,
  TABLE_NAMES,
} from '@athena/db';
import { FederatedCredential } from '../types/db';

export interface FederatedCredentialTable {
  name: TABLE_NAMES.FEDEREATED_CREDENTIAL;
  columns: FederatedCredential;
}

export type SelectFederatedCredential = Selectable<FederatedCredential>;
export type InsertFederatedCredential = Insertable<FederatedCredential>;
export type UpdateFederatedCredential = Updateable<FederatedCredential>;

export class FederatedCredentialTableClient extends Table<
  'federated_credential',
  'id' | 'provider' | 'subjectId' | 'userId'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'federated_credential',
    'id' | 'provider' | 'subjectId' | 'userId'
  > = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
    .addColumn('provider', 'varchar', (col) => col.notNull())
    .addColumn('subjectId', 'varchar', (col) => col.notNull())
    .addColumn('userId', 'integer', (col) =>
      col.references(`${TABLE_NAMES.USER}.id`).notNull().onDelete('cascade')
    );
}
