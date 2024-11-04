import { Insertable, Selectable, Updateable } from 'kysely';
import {
  DBConnection,
  Table,
  ITable,
  UniqueId,
  ImmutableString,
  ImmutableNumber,
  TABLE_NAMES,
} from '../db';

export interface UserTableColumns {
  id: UniqueId;
  firstName: string | null;
  lastName: string | null;
  email: ImmutableString;
}

export interface UserTable {
  name: TABLE_NAMES.USER;
  columns: UserTableColumns;
}

export type SelectUser = Selectable<UserTableColumns>;
export type InsertUser = Insertable<UserTableColumns>;
export type UpdateUser = Updateable<UserTableColumns>;

export class UserTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
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

export interface UserNewsletterTableColumns {
  userId: ImmutableNumber;
  newsletterId: ImmutableNumber;
}

export interface UserNewsletterTable {
  name: TABLE_NAMES.USER_NEWSLETTER;
  columns: UserNewsletterTableColumns;
}

export type SelectUserNewsletter = Selectable<UserNewsletterTableColumns>;
export type InsertUserNewsletter = Insertable<UserNewsletterTableColumns>;
export type UpdateUserNewsletter = Updateable<UserNewsletterTableColumns>;

export class UserNewsletterTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('userId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade').notNull()
      )
      .addColumn('newsletterId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.NEWSLETTER}.id`).onDelete('cascade').notNull()
      )
      .execute();
    return;
  }
}

export interface UserTemplateTableColumns {
  userId: ImmutableNumber;
  newsletterItemTemplateId: ImmutableNumber;
}

export interface UserTemplateTable {
  name: TABLE_NAMES.USER_TEMPLATE;
  columns: UserTemplateTableColumns;
}

export type SelectUserTemplate = Selectable<UserTemplateTableColumns>;
export type InsertUserTemplate = Insertable<UserTemplateTableColumns>;
export type UpdateUserTemplate = Updateable<UserTemplateTableColumns>;

export class UserTemplateTableClient extends Table implements ITable {
  constructor(db: DBConnection, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('userId', 'integer', (col) =>
        col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade').notNull()
      )
      .addColumn('newsletterItemTemplateId', 'integer', (col) =>
        col
          .references(`${TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE}.id`)
          .onDelete('cascade')
          .notNull()
      )
      .execute();
    return;
  }
}
