"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryTableClient = void 0;
const db_1 = require("@athena/db");
class CountryTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
            .addColumn('code', 'varchar', (col) => col.notNull())
            .addColumn('name', 'varchar', (col) => col.notNull())
            .addColumn('longitude', 'double precision', (col) => col.notNull())
            .addColumn('latitude', 'double precision', (col) => col.notNull());
    }
}
exports.CountryTableClient = CountryTableClient;
//# sourceMappingURL=country.js.map