import { CreateTableBuilder } from 'kysely';
import { DBConnection, Table } from '@backend/types';

export class UserTemplateTableClient extends Table<
  'user_template',
  'userId' | 'templateId'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<'user_template', 'userId' | 'templateId'> =
    this.tableBuilder
      .addColumn('userId', 'integer', (col) =>
        col.references('user.id').onDelete('cascade').notNull()
      )
      .addColumn('templateId', 'integer', (col) =>
        col.references('template.id').onDelete('cascade').notNull()
      )
      .addColumn('role', 'text', (cb) => cb.notNull());
}
