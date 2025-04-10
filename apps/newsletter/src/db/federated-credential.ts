import { CreateTableBuilder } from 'kysely';
import { DBConnection, Table, TABLE_NAMES } from '@backend/types';

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
