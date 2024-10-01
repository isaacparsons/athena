import {
  Kysely,
  Transaction as KyselyTransaction,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
} from 'kysely';
export { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres';
export { Pool } from 'pg';
export { sql, Expression, PostgresDialect, Kysely as DB } from 'kysely';

export type UniqueId = ColumnType<number, never, never>;
export type Created = ColumnType<string, string, never>;
export type Modified = ColumnType<string | null, never, string>;
export type Creator = ColumnType<number, number, never>;
export type Modifier = ColumnType<number | null, never, number>;
export type MutableNullableDate = ColumnType<
  string | null,
  string | null,
  string | null
>;
export type MutableDate = ColumnType<string, string, string>;
export type MutableForeignKey = ColumnType<number, number, number>;
export type ForeignKey = ColumnType<number, number, never>;

export type ImmutableString = ColumnType<string, string, never>;
export type ImmutableNumber = ColumnType<number, number, never>;

export type SelectMutableNullableDate = Selectable<MutableNullableDate>;
export type InsertMutableNullableDate = Selectable<MutableNullableDate>;
export type UpdateMutableNullableDate = Selectable<MutableNullableDate>;

export type Meta = {
  created: Created;
  modified: Modified;
  creatorId: Creator;
  modifierId: Modifier;
};

export interface CountryTable {
  id: UniqueId;
  code: ImmutableString;
  name: ImmutableString;
  longitude: ImmutableNumber;
  lattitude: ImmutableNumber;
}
export type SelectCountry = Selectable<CountryTable>;
export type InsertCountry = Insertable<CountryTable>;

export interface FederatedCredentialTable {
  id: UniqueId;
  provider: ImmutableString;
  subjectId: ImmutableString;
  userId: ImmutableNumber;
}
export type SelectFederatedCredential = Selectable<FederatedCredentialTable>;
export type InsertFederatedCredential = Insertable<FederatedCredentialTable>;
export type UpdateFederatedCredential = Updateable<FederatedCredentialTable>;

export interface LocationTable {
  id: UniqueId;
  countryCode: string | null;
  name: string | null;
  longitude: number | null;
  lattitude: number | null;
}
export type SelectLocation = Selectable<LocationTable>;
export type InsertLocation = Insertable<LocationTable>;
export type UpdateLocation = Updateable<LocationTable>;

export interface NewsletterItemPhotoTable {
  id: UniqueId;
  name: string;
  caption: string | null;
  format: string | null;
  size: number | null;
}
export type SelectNewsletterItemPhoto = Selectable<NewsletterItemPhotoTable>;
export type InsertNewsletterItemPhoto = Insertable<NewsletterItemPhotoTable>;
export type UpdateNewsletterItemPhoto = Updateable<NewsletterItemPhotoTable>;

export interface NewsletterItemTextTable {
  id: UniqueId;
  link: string | null;
  title: string;
  description: string | null;
}
export type SelectNewsletterItemText = Selectable<NewsletterItemTextTable>;
export type InsertNewsletterItemText = Insertable<NewsletterItemTextTable>;
export type UpdateNewsletterItemText = Updateable<NewsletterItemTextTable>;

export interface NewsletterItemVideoTable {
  id: UniqueId;
  name: string;
  caption: string | null;
  format: string | null;
  size: number | null;
}
export type SelectNewsletterItemVideo = Selectable<NewsletterItemVideoTable>;
export type InsertNewsletterItemVideo = Insertable<NewsletterItemVideoTable>;
export type UpdateNewsletterItemVideo = Updateable<NewsletterItemVideoTable>;

export interface NewsletterItemTable extends Meta {
  id: UniqueId;
  newsletterId: ColumnType<number, number, never>;
  title: string;
  date: string | null;
  locationId: number | null;
  newsletterItemDetailsId: ColumnType<number, number, never>;
  detailsType: ColumnType<string, string, never>;
}
export type SelectNewsletterItem = Selectable<NewsletterItemTable>;
export type InsertNewsletterItem = Insertable<NewsletterItemTable>;
export type UpdateNewsletterItem = Updateable<NewsletterItemTable>;

export interface UserTable {
  id: UniqueId;
  firstName: string | null;
  lastName: string | null;
  email: ImmutableString;
}
export type SelectUser = Selectable<UserTable>;
export type InsertUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export interface UserNewsletterTable {
  userId: ImmutableNumber;
  newsletterId: ImmutableNumber;
}

export type SelectUserNewsletter = Selectable<UserNewsletterTable>;
export type InsertUserNewsletter = Insertable<UserNewsletterTable>;
export type UpdateUserNewsletter = Updateable<UserNewsletterTable>;

export interface NewsletterTable extends Meta {
  id: UniqueId;
  name: string;
  ownerId: MutableForeignKey;
  startDate: MutableNullableDate;
  endDate: MutableNullableDate;
}
export type SelectNewsletter = Selectable<NewsletterTable>;
export type InsertNewsletter = Insertable<NewsletterTable>;
export type UpdateNewsletter = Updateable<NewsletterTable>;

export interface Database {
  user: UserTable;
  newsletter: NewsletterTable;
  userNewsletter: UserNewsletterTable;
  newsletterItem: NewsletterItemTable;
  newsletterItemPhoto: NewsletterItemPhotoTable;
  newsletterItemText: NewsletterItemTextTable;
  newsletterItemVideo: NewsletterItemVideoTable;
  country: CountryTable;
  federatedCredential: FederatedCredentialTable;
  location: LocationTable;
}

export type Connection = Kysely<Database>;
export type Transaction = KyselyTransaction<Database>;

export interface ITable {
  db: Connection;
  name: string;
  createTable: () => Promise<void>;
  deleteTable: () => Promise<void>;
}

export abstract class Table implements ITable {
  db: Connection;
  name: string;
  constructor(db: Connection, name: string) {
    this.name = name;
    this.db = db;
  }
  async createTable() {
    throw new Error('not implemented');
  }
  async deleteTable() {
    this.db.schema.dropTable(this.name).ifExists().cascade().execute();
    return;
  }
}
1;
