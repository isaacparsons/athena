"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryTableClient = exports.CountryTable = void 0;
const db_1 = require("@athena/db");
exports.CountryTable = {
    tableName: db_1.TABLE_NAMES.COUNTRY,
    columns: ['id', 'code', 'name', 'longitude', 'latitude'],
    id: `${db_1.TABLE_NAMES.COUNTRY}.id`,
    code: `${db_1.TABLE_NAMES.COUNTRY}.code`,
    name: `${db_1.TABLE_NAMES.COUNTRY}.name`,
    longtitude: `${db_1.TABLE_NAMES.COUNTRY}.longtitude`,
    latitude: `${db_1.TABLE_NAMES.COUNTRY}.latitude`,
};
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