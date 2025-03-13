"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemTemplateDataTableClient = exports.NewsletterItemTemplateTableClient = void 0;
const db_1 = require("@athena/db");
class NewsletterItemTemplateTableClient extends db_1.EntityTable {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder.addColumn('name', 'varchar', (cb) => cb.notNull());
    }
}
exports.NewsletterItemTemplateTableClient = NewsletterItemTemplateTableClient;
class NewsletterItemTemplateDataTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
            .addColumn('parentId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
            .addColumn('nextId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
            .addColumn('prevId', 'integer', (col) => col.references('newsletter_item_template_data.id').onDelete('cascade'))
            .addColumn('templateId', 'integer', (col) => col.references('newsletter_item_template.id').onDelete('cascade'))
            .addColumn('data', 'jsonb');
    }
}
exports.NewsletterItemTemplateDataTableClient = NewsletterItemTemplateDataTableClient;
//# sourceMappingURL=newsletter-item-template.js.map