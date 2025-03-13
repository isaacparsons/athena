"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemTableClient = void 0;
const db_1 = require("@athena/db");
class NewsletterItemTableClient extends db_1.EntityTable {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('title', 'varchar', (cb) => cb.notNull())
            .addColumn('newsletterId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER}.id`).notNull().onDelete('cascade'))
            .addColumn('date', 'timestamp')
            .addColumn('locationId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.LOCATION}.id`).onDelete('set null'))
            .addColumn('parentId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('cascade'))
            .addColumn('nextId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('set null'))
            .addColumn('prevId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('set null'));
    }
}
exports.NewsletterItemTableClient = NewsletterItemTableClient;
//TODO: add below check to item type
// (col) =>
//   col.check(
//     sql`(detailsType='text') OR (detailsType='video') OR (detailsType='photo')`
//   )
//# sourceMappingURL=newsletter-item.js.map