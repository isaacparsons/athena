import {
  Kysely,
  Transaction as KyselyTransaction,
  ColumnType,
  Selectable,
  CreateTableBuilder,
  sql,
  Insertable,
  Updateable,
} from 'kysely';
import {
  Country,
  DB,
  FederatedCredential,
  Location,
  Newsletter,
  NewsletterPost,
  NewsletterPostMedia,
  NewsletterPostText,
  NewsletterRole,
  Template,
  TemplateNode,
  User,
  UserNewsletter,
  UserTemplate,
} from './db';
import * as common from '@athena/common';
import { EmailNotification } from '../services/notifications';

export const TYPES = {
  ILocationDAO: Symbol.for('ILocationDAO'),
  IUserDAO: Symbol.for('IUserDAO'),
  INewsletterDAO: Symbol.for('INewsletterDAO'),
  INewsletterPostDAO: Symbol.for('INewsletterPostDAO'),
  INewsletterPostDetailsDAO: Symbol.for('INewsletterPostDetailsDAO'),
  ITemplateDAO: Symbol.for('ITemplateDAO'),
  ITemplateNodeDAO: Symbol.for('ITemplateNodeDAO'),
  IGCSManager: Symbol.for('IGCSManager'),
  DBClient: Symbol.for('DBClient'),
  gcsConfig: Symbol.for('gcsConfig'),
  INotificationsManager: Symbol.for('INotificationsManager'),
  systemAccountConfig: Symbol.for('systemAccountConfig'),
};

export type Config = {
  app: {
    host: string;
    port: number;
    sessionSecret: string;
    sessionCookieName: string;
    adminSecret: string;
  };
  db: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  gcs: {
    bucketName: string;
  };
  systemAccount: {
    service?: string;
    host?: string;
    port?: number;
    email: string;
    password: string;
    secure?: boolean;
  };
  client: {
    host: string;
    port: number;
  };
};

export type AppConfig = Config['app'];
export type DbConfig = Config['db'];
export type GoogleConfig = Config['google'];
export type GCSConfig = Config['gcs'];
export type ClientConfig = Config['client'];
export type SystemAccountConfig = Config['systemAccount'];

export { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres';
export { Pool } from 'pg';
export { sql, Expression, PostgresDialect } from 'kysely';

export type Created = ColumnType<string, string, never>;
export type Modified = ColumnType<string | null, never, string>;
export type Creator = ColumnType<number, number, never>;
export type Modifier = ColumnType<number | null, never, number>;

export type Meta = {
  created: Created;
  modified: Modified;
  creatorId: Creator;
  modifierId: Modifier;
};

export type SelectMeta = Selectable<Meta>;

export enum TABLE_NAMES {
  LOCATION = 'location',
  COUNTRY = 'country',
  USER = 'user',
  FEDEREATED_CREDENTIAL = 'federated_credential',
  NEWSLETTER = 'newsletter',
  USER_NEWSLETTER = 'user_newsletter',
  USER_TEMPLATE = 'user_template',
  TEMPLATE = 'template',
  TEMPLATE_NODE = 'template_node',
  NEWSLETTER_POST = 'newsletter_post',
  NEWSLETTER_POST_MEDIA = 'newsletter_post_media',
  NEWSLETTER_POST_TEXT = 'newsletter_post_text',
  NEWSLETTER_POST_CONTAINER = 'newsletter_post_container',
}

export type TableName = keyof DB;
export type EntityTableName = Extract<
  TableName,
  'newsletter' | 'newsletter_post' | 'template' | 'template_node'
>;

export type DBConnection = Kysely<DB>;
export type Transaction = KyselyTransaction<DB>;

export interface ITable<T extends TableName, C extends string = never> {
  db: DBConnection;
  name: string;
  tableBuilder: CreateTableBuilder<T, C>;
  createTable: () => Promise<void>;
  deleteTable: () => Promise<void>;
  truncateTable: () => Promise<void>;
}

export abstract class Table<T extends TableName, C extends string = never>
  implements ITable<T, C>
{
  constructor(readonly db: DBConnection, readonly name: string) {}

  tableBuilder: CreateTableBuilder<T, C> = this.db.schema
    .createTable(this.name)
    .ifNotExists();

  async createTable() {
    return this.tableBuilder.execute();
  }
  async deleteTable() {
    this.db.schema.dropTable(this.name).ifExists().cascade().execute();
    return;
  }
  async truncateTable() {
    this.db.deleteFrom(this.name as any).execute();
    return;
  }
}

export class EntityTable<T extends EntityTableName, C extends string = never>
  extends Table<T, C | 'id' | 'created' | 'creatorId' | 'modified' | 'modifierId'>
  implements
    ITable<T, C | 'id' | 'created' | 'creatorId' | 'modified' | 'modifierId'>
{
  constructor(readonly db: DBConnection, readonly name: string) {
    super(db, name);
  }

  tableBuilder: CreateTableBuilder<T, C> = this.tableBuilder
    .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
    .addColumn('created', 'text', (cb) => cb.notNull().defaultTo(sql`now()`))
    .addColumn('creatorId', 'integer', (col) =>
      col.notNull().references('user.id').onDelete('cascade')
    )
    .addColumn('modified', 'text')
    .addColumn('modifierId', 'integer', (col) =>
      col.references('user.id').onDelete('cascade')
    );

  async createTable() {
    return this.tableBuilder.execute();
  }
  async deleteTable() {
    this.db.schema.dropTable(this.name).ifExists().cascade().execute();
    return;
  }
}

export type SelectUser = Selectable<User>;
export type InsertUser = Insertable<User>;
export type UpdateUser = Updateable<User>;

export type SelectCountry = Selectable<Country>;
export type InsertCountry = Insertable<Country>;

export type SelectFederatedCredential = Selectable<FederatedCredential>;
export type InsertFederatedCredential = Insertable<FederatedCredential>;
export type UpdateFederatedCredential = Updateable<FederatedCredential>;

export type SelectLocation = Selectable<Location>;
export type InsertLocation = Insertable<Location>;
export type UpdateLocation = Updateable<Location>;

export type SelectNewsletterPostMedia = Selectable<NewsletterPostMedia>;
export type InsertNewsletterPostMedia = Insertable<NewsletterPostMedia>;
export type UpdateNewsletterPostMedia = Updateable<NewsletterPostMedia>;

export type SelectNewsletterPostText = Selectable<NewsletterPostText>;
export type InsertNewsletterPostText = Insertable<NewsletterPostText>;
export type UpdateNewsletterPostText = Updateable<NewsletterPostText>;

export type SelectNewsletterPost = Selectable<NewsletterPost>;
export type InsertNewsletterPost = Insertable<NewsletterPost>;
export type UpdateNewsletterPost = Updateable<NewsletterPost>;

export type SelectNewsletter = Selectable<Newsletter>;
export type InsertNewsletter = Insertable<Newsletter>;
export type UpdateNewsletter = Updateable<Newsletter>;

export type SelectTemplate = Selectable<Template>;
export type InsertTemplate = Insertable<Template>;
export type UpdateTemplate = Updateable<Template>;

export type SelectTemplateNode = Selectable<TemplateNode>;
export type InsertTemplateNode = Insertable<TemplateNode>;
export type UpdateTemplateNode = Updateable<TemplateNode>;

export type SelectUserNewsletter = Selectable<UserNewsletter>;
export type InsertUserNewsletter = Insertable<UserNewsletter>;
export type UpdateUserNewsletter = Updateable<UserNewsletter>;

export type SelectUserTemplate = Selectable<UserTemplate>;
export type InsertUserTemplate = Insertable<UserTemplate>;
export type UpdateUserTemplate = Updateable<UserTemplate>;

// dao

export type EntityMetaRow = {
  creator: SelectUser;
  modifier: SelectUser | null;
  created: string;
  modified: string | null;
};

export type EntityRow<R> = R & {
  creator: SelectUser;
  modifier: SelectUser | null;
  created: string;
  modified: string | null;
};

export interface IEntityDAO<R, E extends common.Entity> {
  toEntity: (row: R) => E;
}

/**
 * Location
 */

export interface ILocationDAO {
  create(input: common.CreateLocation): Promise<number>;
  update(input: common.UpdateLocation): Promise<number>;
}

/**
 * Newsletter Post
 */
export interface INewsletterPostDetailsDAO {
  read(newsletterItemId: number): Promise<common.NewsletterPostDetails>;
  create(
    newsletterItemId: number,
    input: common.CreateNewsletterPost['details']
  ): Promise<void>;
  update(newsletterPostId: number, input: common.UpdatePostDetails): Promise<number>;
}

export type NewsletterPostRow = EntityMetaRow &
  Omit<Selectable<NewsletterPost>, 'modifierId' | 'creatorId' | 'locationId'> & {
    mediaDetails: SelectNewsletterPostMedia | null;
    textDetails: SelectNewsletterPostText | null;
    location: SelectLocation | null;
    children: Omit<NewsletterPostRow, 'children'>[];
  };

export type INewsletterPostDAO = {
  deleteMany(userId: number, input: common.DeleteMany): Promise<void>;
  createMany(
    userId: number,
    input: common.CreateManyNewsletterPosts
  ): Promise<number[]>;
  read(id: number): Promise<common.ReadNewsletterPost>;
  readByNewsletterId(id: number): Promise<common.ReadNewsletterPost[]>;
  updateMany(
    userId: number,
    input: common.UpdateManyNewsletterPosts
  ): Promise<number[]>;
};

/**
 * Newsletter
 */

export type NewsletterRow = EntityMetaRow &
  Omit<SelectNewsletter, 'modifierId' | 'creatorId' | 'locationId' | 'ownerId'> & {
    posts: Omit<common.ReadNewsletterPost, 'children'>[];
    owner: common.NewsletterMember;
    members: common.NewsletterMember[];
  };

export type INewsletterDAO = IEntityDAO<NewsletterRow, common.Newsletter> & {
  read(id: number): Promise<common.ReadNewsletter>;
  readByUserId(id: number): Promise<common.Newsletter[]>;
  create(userId: number, input: common.CreateNewsletter): Promise<number>;
  update(userId: number, input: common.UpdateNewsletter): Promise<number>;
  delete(userId: number, id: number): Promise<number>;
  inviteUsers(userId: number, input: common.InviteNewsletterUsers): Promise<void>;
  readMember(userId: number, newsletterId: number): Promise<UserNewsletter>;
  removeMember(input: common.RemoveNewsletterMember): Promise<void>;
  updateMember(input: common.UpdateNewsletterMember): Promise<void>;
};

/**
 * Template
 */
export type TemplateNodeRow = EntityMetaRow &
  Omit<SelectTemplateNode, 'modifierId' | 'creatorId' | 'locationId' | 'ownerId'>;

export type ITemplateNodeDAO = IEntityDAO<TemplateNodeRow, common.TemplateNode> & {
  readByTemplateId(id: number): Promise<common.TemplateNode[]>;
  createMany(
    userId: number,
    input: common.CreateManyTemplateNodes
  ): Promise<number[]>;
  updateMany(userId: number, input: common.UpdateTemplateNode[]): Promise<number[]>;
};

export type TemplateRow = EntityMetaRow &
  Omit<SelectTemplate, 'modifierId' | 'creatorId' | 'locationId' | 'ownerId'> & {
    nodes: common.TemplateNode[];
    members: SelectUser[];
  };

export type ITemplateDAO = IEntityDAO<TemplateRow, common.Template> & {
  read(id: number): Promise<common.ReadTemplate>;
  readByUserId(id: number): Promise<common.Template[]>;
  create(userId: number, input: common.CreateTemplate): Promise<number>;
  update(userId: number, input: common.UpdateTemplate): Promise<number>;
  delete(userId: number, id: number): Promise<number>;
  readMember(userId: number, templateId: number): Promise<UserTemplate>;
};

/**
 * User
 */
export interface IUserDAO {
  read(id: number): Promise<common.ReadUser>;
  newsletters: (userId: number) => Promise<common.Newsletter[]>;
  templates: (userId: number) => Promise<common.Template[]>;
  upsert(
    input: common.CreateUser,
    federatedCredential?: Omit<common.CreateFederatedCredential, 'userId'>
  ): Promise<common.User>;
}

export type DAO = {
  user: IUserDAO;
  newsletter: INewsletterDAO;
  location: ILocationDAO;
  newsletterPost: INewsletterPostDAO;
  template: ITemplateDAO;
};

export interface IGCSManager {
  getSignedUrl(
    fileName: string,
    action: 'read' | 'write' | 'delete' | 'resumable'
  ): Promise<string>;
}

export interface INotificationsManager {
  sendMail: <T>(notification: EmailNotification) => Promise<T>;
}
