"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTemplateTableClient = exports.UserNewsletterTableClient = exports.UserTableClient = void 0;
const db_1 = require("@athena/db");
class UserTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('id', 'serial', (cb) => cb.primaryKey())
            .addColumn('firstName', 'varchar')
            .addColumn('lastName', 'varchar')
            .addColumn('email', 'varchar', (cb) => cb.notNull().unique());
    }
}
exports.UserTableClient = UserTableClient;
class UserNewsletterTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('userId', 'integer', (col) => col.references('user.id').onDelete('cascade').notNull())
            .addColumn('newsletterId', 'integer', (col) => col.references('newsletter.id').onDelete('cascade').notNull());
    }
}
exports.UserNewsletterTableClient = UserNewsletterTableClient;
class UserTemplateTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('userId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).onDelete('cascade').notNull())
            .addColumn('newsletterItemTemplateId', 'integer', (col) => col
            .references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE}.id`)
            .onDelete('cascade')
            .notNull());
    }
}
exports.UserTemplateTableClient = UserTemplateTableClient;
//# sourceMappingURL=user.js.map