"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTemplateTableClient = exports.UserNewsletterTableClient = exports.UserTableClient = void 0;
const tslib_1 = require("tslib");
const db_1 = require("@athena/db");
class UserTableClient extends db_1.Table {
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
exports.UserTableClient = UserTableClient;
class UserNewsletterTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('userId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).onDelete('cascade').notNull())
                .addColumn('newsletterId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER}.id`).onDelete('cascade').notNull())
                .execute();
            return;
        });
    }
}
exports.UserNewsletterTableClient = UserNewsletterTableClient;
class UserTemplateTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('userId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).onDelete('cascade').notNull())
                .addColumn('newsletterItemTemplateId', 'integer', (col) => col
                .references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE}.id`)
                .onDelete('cascade')
                .notNull())
                .execute();
            return;
        });
    }
}
exports.UserTemplateTableClient = UserTemplateTableClient;
//# sourceMappingURL=user.js.map