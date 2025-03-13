import { CreateTableBuilder, Insertable, Selectable, Updateable } from 'kysely';
import { DBConnection, Table, TABLE_NAMES } from '@athena/db';
import { User, UserNewsletter, UserTemplate } from '../types/db';

export interface UserTable {
  name: TABLE_NAMES.USER;
  columns: User;
}

export type SelectUser = Selectable<User>;
export type InsertUser = Insertable<User>;
export type UpdateUser = Updateable<User>;

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
      );
}

// export interface UserTemplateTable {
//   name: TABLE_NAMES.USER_TEMPLATE;
//   columns: UserTemplate;
// }
// export type SelectUserTemplate = Selectable<UserTemplate>;
// export type InsertUserTemplate = Insertable<UserTemplate>;
// export type UpdateUserTemplate = Updateable<UserTemplate>;

// export class UserTemplateTableClient extends Table<
//   'user_template',
//   'userId' | 'newsletterItemTemplateId'
// > {
//   constructor(db: DBConnection, name: string) {
//     super(db, name);
//   }

//   tableBuilder: CreateTableBuilder<
//     'user_template',
//     'userId' | 'newsletterItemTemplateId'
//   > = this.tableBuilder
//     .addColumn('userId', 'integer', (col) =>
//       col.references(`${TABLE_NAMES.USER}.id`).onDelete('cascade').notNull()
//     )
//     .addColumn('newsletterItemTemplateId', 'integer', (col) =>
//       col
//         .references(`${TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE}.id`)
//         .onDelete('cascade')
//         .notNull()
//     );
// }
