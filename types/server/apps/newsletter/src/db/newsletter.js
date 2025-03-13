"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterTableClient = void 0;
const db_1 = require("@athena/db");
class NewsletterTableClient extends db_1.EntityTable {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('name', 'varchar', (cb) => cb.notNull())
            .addColumn('ownerId', 'integer', (col) => col.notNull().references('user.id').notNull().onDelete('restrict'))
            .addColumn('startDate', 'date')
            .addColumn('endDate', 'date');
    }
}
exports.NewsletterTableClient = NewsletterTableClient;
//# sourceMappingURL=newsletter.js.map