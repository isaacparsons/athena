import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { UserNewsletter } from '../types/db';
import { DBConnection, Table, TABLE_NAMES } from './types';

export interface UserNewsletterTable {
  name: TABLE_NAMES.USER_NEWSLETTER;
  columns: UserNewsletter;
}

export type SelectUserNewsletter = Selectable<UserNewsletter>;
export type InsertUserNewsletter = Insertable<UserNewsletter>;
export type UpdateUserNewsletter = Updateable<UserNewsletter>;

export class UserNewsletterTableClient extends Table<
  'user_newsletter',
  'userId' | 'newsletterId'
> {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<'user_newsletter', 'userId' | 'newsletterId'> =
    this.tableBuilder
      .addColumn('userId', 'integer', (col) =>
        col.references('user.id').onDelete('cascade').notNull()
      )
      .addColumn('newsletterId', 'integer', (col) =>
        col.references('newsletter.id').onDelete('cascade').notNull()
      )
      .addColumn('role', 'text', (cb) => cb.notNull());
}
