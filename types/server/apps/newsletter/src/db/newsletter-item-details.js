"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemContainerTableClient = exports.NewsletterItemTextTableClient = exports.NewsletterItemMediaTableClient = void 0;
const tslib_1 = require("tslib");
const db_1 = require("@athena/db");
class NewsletterItemMediaTableClient extends db_1.Table {
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
                .addColumn('format', 'varchar', (col) => col.notNull())
                .addColumn('type', 'varchar', (col) => col.notNull())
                .addColumn('newsletterItemId', 'integer', (col) => col
                .references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`)
                .notNull()
                .onDelete('cascade'))
                .execute();
            return;
        });
    }
}
exports.NewsletterItemMediaTableClient = NewsletterItemMediaTableClient;
class NewsletterItemTextTableClient extends db_1.Table {
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
                .addColumn('newsletterItemId', 'integer', (col) => col
                .references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`)
                .notNull()
                .onDelete('cascade'))
                .execute();
            return;
        });
    }
}
exports.NewsletterItemTextTableClient = NewsletterItemTextTableClient;
class NewsletterItemContainerTableClient extends db_1.Table {
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
                .addColumn('type', 'varchar', (col) => col.notNull())
                .addColumn('newsletterItemId', 'integer', (col) => col
                .references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`)
                .notNull()
                .onDelete('cascade'))
                .execute();
            return;
        });
    }
}
exports.NewsletterItemContainerTableClient = NewsletterItemContainerTableClient;
//# sourceMappingURL=newsletter-item-details.js.map