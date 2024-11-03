"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterTableClient = void 0;
const tslib_1 = require("tslib");
const kysely_1 = require("kysely");
const db_1 = require("../db");
class NewsletterTableClient extends db_1.Table {
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
                .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo((0, kysely_1.sql) `now()`))
                .addColumn('creatorId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).onDelete('cascade'))
                .addColumn('modified', 'timestamp')
                .addColumn('modifierId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).onDelete('cascade'))
                .addColumn('ownerId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).notNull().onDelete('restrict'))
                .addColumn('startDate', 'date')
                .addColumn('endDate', 'date')
                .execute();
            return;
        });
    }
}
exports.NewsletterTableClient = NewsletterTableClient;
//# sourceMappingURL=newsletter.js.map