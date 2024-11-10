"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemTemplateDataTableClient = exports.NewsletterItemTemplateTableClient = void 0;
const tslib_1 = require("tslib");
const kysely_1 = require("kysely");
const db_1 = require("@athena/db");
class NewsletterItemTemplateTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey())
                .addColumn('name', 'varchar', (cb) => cb.notNull())
                .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo((0, kysely_1.sql) `now()`))
                .addColumn('creatorId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).onDelete('cascade'))
                .addColumn('modified', 'timestamp')
                .addColumn('modifierId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).onDelete('cascade'))
                .execute();
            return;
        });
    }
}
exports.NewsletterItemTemplateTableClient = NewsletterItemTemplateTableClient;
class NewsletterItemTemplateDataTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
                .addColumn('parentId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
                .addColumn('nextId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
                .addColumn('prevId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
                .addColumn('templateId', 'integer', (col) => col.references('newsletter_item_template.id').onDelete('cascade'))
                .addColumn('data', 'jsonb')
                .execute();
            return;
        });
    }
}
exports.NewsletterItemTemplateDataTableClient = NewsletterItemTemplateDataTableClient;
//# sourceMappingURL=newsletter-item-template.js.map