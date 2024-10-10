"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNewsletterTable = exports.NewsletterTable = exports.NewsletterItemTextTable = exports.NewsletterItemMediaTable = exports.NewsletterItemTable = exports.FederatedCredentialTable = exports.UserTable = exports.CountryTable = exports.LocationTable = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../types/db");
class LocationTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
                .addColumn('countryCode', 'varchar')
                .addColumn('name', 'varchar')
                .addColumn('longitude', 'double precision')
                .addColumn('lattitude', 'double precision')
                .execute();
            return;
        });
    }
}
exports.LocationTable = LocationTable;
class CountryTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.CountryTable = CountryTable;
class UserTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey())
                .addColumn('firstName', 'varchar')
                .addColumn('lastName', 'varchar')
                .addColumn('email', 'varchar', (cb) => cb.notNull().unique())
                .execute();
            return;
        });
    }
}
exports.UserTable = UserTable;
class FederatedCredentialTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
                .addColumn('provider', 'varchar', (col) => col.notNull())
                .addColumn('subjectId', 'varchar', (col) => col.notNull())
                .addColumn('userId', 'integer', (col) => col.references('user.id').notNull().onDelete('cascade'))
                .execute();
            return;
        });
    }
}
exports.FederatedCredentialTable = FederatedCredentialTable;
class NewsletterItemTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
                .addColumn('title', 'varchar', (cb) => cb.notNull())
                .addColumn('newsletterId', 'integer', (col) => col.references('newsletter.id').notNull().onDelete('cascade'))
                .addColumn('date', 'timestamp')
                .addColumn('locationId', 'integer', (col) => col.references('location.id').onDelete('set null'))
                .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo((0, db_1.sql) `now()`))
                .addColumn('creatorId', 'integer', (cb) => cb.references('user.id').notNull())
                .addColumn('modified', 'timestamp')
                .addColumn('modifierId', 'integer', (cb) => cb.references('user.id'))
                .addColumn('parentId', 'integer', (col) => col.references('newsletterItem.id').onDelete('cascade'))
                .addColumn('nextItemId', 'integer', (col) => col.references('newsletterItem.id').onDelete('set null'))
                .addColumn('previousItemId', 'integer', (col) => col.references('newsletterItem.id').onDelete('set null'))
                .execute();
            return;
        });
    }
}
exports.NewsletterItemTable = NewsletterItemTable;
//TODO: add below check to item type
// (col) =>
//   col.check(
//     sql`(detailsType='text') OR (detailsType='video') OR (detailsType='photo')`
//   )
class NewsletterItemMediaTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey())
                .addColumn('name', 'varchar', (col) => col.notNull())
                .addColumn('caption', 'varchar')
                .addColumn('fileName', 'varchar', (col) => col.notNull())
                .addColumn('type', 'varchar', (col) => col.notNull())
                .addColumn('newsletterItemId', 'integer', (col) => col.references('newsletterItem.id').notNull().onDelete('cascade'))
                .execute();
            return;
        });
    }
}
exports.NewsletterItemMediaTable = NewsletterItemMediaTable;
class NewsletterItemTextTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey())
                .addColumn('name', 'varchar', (col) => col.notNull())
                .addColumn('link', 'varchar')
                .addColumn('type', 'varchar', (col) => col.notNull())
                .addColumn('description', 'varchar')
                .addColumn('newsletterItemId', 'integer', (col) => col.references('newsletterItem.id').notNull().onDelete('cascade'))
                .execute();
            return;
        });
    }
}
exports.NewsletterItemTextTable = NewsletterItemTextTable;
class NewsletterTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
                .addColumn('name', 'varchar', (cb) => cb.notNull())
                .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo((0, db_1.sql) `now()`))
                .addColumn('creatorId', 'integer', (col) => col.references('user.id').onDelete('cascade'))
                .addColumn('modified', 'timestamp')
                .addColumn('modifierId', 'integer', (col) => col.references('user.id').onDelete('cascade'))
                .addColumn('ownerId', 'integer', (col) => col.references('user.id').notNull().onDelete('restrict'))
                .addColumn('startDate', 'date')
                .addColumn('endDate', 'date')
                .execute();
            return;
        });
    }
}
exports.NewsletterTable = NewsletterTable;
class UserNewsletterTable extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('userId', 'integer', (col) => col.references('user.id').onDelete('cascade').notNull())
                .addColumn('newsletterId', 'integer', (col) => col.references('newsletter.id').onDelete('cascade').notNull())
                .execute();
            return;
        });
    }
}
exports.UserNewsletterTable = UserNewsletterTable;
//# sourceMappingURL=tables.js.map