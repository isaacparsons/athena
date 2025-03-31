import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { UserTemplate } from '../types/db';
import { DBConnection, Table } from './types';

export type SelectUserTemplate = Selectable<UserTemplate>;
export type InsertUserTemplate = Insertable<UserTemplate>;
export type UpdateUserTemplate = Updateable<UserTemplate>;

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
