import { Insertable, Selectable, Updateable, Kysely } from 'kysely';
import { IDbTable, DbTable } from './db-table';
import { Database } from '../db';
import { ImmutableNumber } from '.';

export interface UserNewsletterTable {
  userId: ImmutableNumber;
  newsletterId: ImmutableNumber;
}

export type UserNewsletter = Selectable<UserNewsletterTable>;
export type NewUserNewsletter = Insertable<UserNewsletterTable>;
export type UserNewsletterUpdate = Updateable<UserNewsletterTable>;

export class DbUserNewsletter extends DbTable implements IDbTable {
  constructor(db: Kysely<Database>, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('userId', 'integer', (col) =>
        col.references('user.id').onDelete('cascade').notNull()
      )
      .addColumn('newsletterId', 'integer', (col) =>
        col.references('newsletter.id').onDelete('cascade').notNull()
      )
      .execute();
    return;
  }
}
