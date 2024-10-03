import { Connection, Table, ITable, sql } from '../types/db';

export class LocationTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }

  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
      .addColumn('countryCode', 'varchar')
      .addColumn('name', 'varchar')
      .addColumn('longitude', 'double precision')
      .addColumn('lattitude', 'double precision')
      .execute();
    return;
  }
}

export class CountryTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }

  async createTable() {
    this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('code', 'varchar', (col) => col.notNull())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('longitude', 'double precision', (col) => col.notNull())
      .addColumn('lattitude', 'double precision', (col) => col.notNull())
      .execute();
    return;
  }
}

export class UserTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
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

export class FederatedCredentialTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
      .addColumn('provider', 'varchar', (col) => col.notNull())
      .addColumn('subjectId', 'varchar', (col) => col.notNull())
      .addColumn('userId', 'integer', (col) =>
        col.references('user.id').notNull().onDelete('cascade')
      )
      .execute();
    return;
  }
}

export class NewsletterItemTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('title', 'varchar', (cb) => cb.notNull())
      .addColumn('newsletterId', 'integer', (col) =>
        col.references('newsletter.id').notNull().onDelete('cascade')
      )
      .addColumn('date', 'timestamp')
      .addColumn('locationId', 'integer', (col) =>
        col.references('location.id').onDelete('set null')
      )
      .addColumn('created', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .addColumn('creatorId', 'integer', (cb) =>
        cb.references('user.id').notNull()
      )
      .addColumn('modified', 'timestamp')
      .addColumn('modifierId', 'integer', (cb) => cb.references('user.id'))
      .addColumn('type', 'varchar')
      .addColumn('parentId', 'integer', (col) =>
        col.references('newsletterItem.id').onDelete('cascade')
      )
      .addColumn('nextItemId', 'integer', (col) =>
        col.references('newsletterItem.id').onDelete('set null')
      )
      .execute();
    return;
  }
}
//TODO: add below check to item type
// (col) =>
//   col.check(
//     sql`(detailsType='text') OR (detailsType='video') OR (detailsType='photo')`
//   )
export class NewsletterItemPhotoTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('caption', 'varchar')
      .addColumn('format', 'varchar')
      .addColumn('size', 'integer')
      .execute();
    return;
  }
}

export class NewsletterItemVideoTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('caption', 'varchar')
      .addColumn('format', 'varchar')
      .addColumn('size', 'integer')
      .execute();
    return;
  }
}

export class NewsletterItemTextTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('title', 'varchar', (col) => col.notNull())
      .addColumn('link', 'varchar')
      .addColumn('description', 'varchar')
      .execute();
    return;
  }
}

export class NewsletterTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
    super(db, name);
  }
  async createTable() {
    await this.db.schema
      .createTable(this.name)
      .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
      .addColumn('name', 'varchar', (cb) => cb.notNull())
      .addColumn('created', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .addColumn('creatorId', 'integer', (col) =>
        col.references('user.id').onDelete('cascade')
      )
      .addColumn('modified', 'timestamp')
      .addColumn('modifierId', 'integer', (col) =>
        col.references('user.id').onDelete('cascade')
      )
      .addColumn('ownerId', 'integer', (col) =>
        col.references('user.id').notNull().onDelete('restrict')
      )
      .addColumn('startDate', 'date')
      .addColumn('endDate', 'date')
      .execute();
    return;
  }
}

export class UserNewsletterTable extends Table implements ITable {
  constructor(db: Connection, name: string) {
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
