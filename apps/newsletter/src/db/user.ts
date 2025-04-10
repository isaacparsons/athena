import { CreateTableBuilder } from 'kysely';
import { DBConnection, Table } from '@backend/types';

export class UserTableClient extends Table<
  'user',
  'id' | 'firstName' | 'lastName' | 'email'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<
    'user',
    'id' | 'firstName' | 'lastName' | 'email'
  > = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('firstName', 'varchar')
    .addColumn('lastName', 'varchar')
    .addColumn('email', 'varchar', (cb) => cb.notNull().unique());
}
