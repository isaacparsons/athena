import { CreateTableBuilder, sql } from 'kysely';
import { DBConnection, Table } from '@backend/types';

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
      .addColumn('role', sql`newsletter_role`, (cb) => cb.notNull());
}
