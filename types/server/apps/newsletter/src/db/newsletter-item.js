"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemTableClient = exports.NewsletterItemTableInfo = void 0;
const tslib_1 = require("tslib");
const kysely_1 = require("kysely");
const db_1 = require("@athena/db");
exports.NewsletterItemTableInfo = {
    name: db_1.TABLE_NAMES.NEWSLETTER_ITEM,
    columns: [
        ...db_1.MetaColumns,
        'id',
        'newsletterId',
        'title',
        'date',
        'locationId',
        'parentId',
        'nextItemId',
        'previousItemId',
    ],
};
class NewsletterItemTableClient extends db_1.Table {
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
                .addColumn('newsletterId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER}.id`).notNull().onDelete('cascade'))
                .addColumn('date', 'timestamp')
                .addColumn('locationId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.LOCATION}.id`).onDelete('set null'))
                .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo((0, kysely_1.sql) `now()`))
                .addColumn('creatorId', 'integer', (cb) => cb.references(`${db_1.TABLE_NAMES.USER}.id`).notNull())
                .addColumn('modified', 'timestamp')
                .addColumn('modifierId', 'integer', (cb) => cb.references(`${db_1.TABLE_NAMES.USER}.id`))
                .addColumn('parentId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('cascade'))
                .addColumn('nextItemId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('set null'))
                .addColumn('previousItemId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.NEWSLETTER_ITEM}.id`).onDelete('set null'))
                .execute();
            return;
        });
    }
}
exports.NewsletterItemTableClient = NewsletterItemTableClient;
//TODO: add below check to item type
// (col) =>
//   col.check(
//     sql`(detailsType='text') OR (detailsType='video') OR (detailsType='photo')`
//   )
//# sourceMappingURL=newsletter-item.js.map