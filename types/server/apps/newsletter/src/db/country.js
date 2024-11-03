"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryTableClient = exports.CountryTable = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../db");
exports.CountryTable = {
    tableName: db_1.TABLE_NAMES.COUNTRY,
    columns: ['id', 'code', 'name', 'longitude', 'lattitude'],
    id: `${db_1.TABLE_NAMES.COUNTRY}.id`,
    code: `${db_1.TABLE_NAMES.COUNTRY}.code`,
    name: `${db_1.TABLE_NAMES.COUNTRY}.name`,
    longtitude: `${db_1.TABLE_NAMES.COUNTRY}.longtitude`,
    lattitude: `${db_1.TABLE_NAMES.COUNTRY}.lattitude`,
};
class CountryTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
                .addColumn('code', 'varchar', (col) => col.notNull())
                .addColumn('name', 'varchar', (col) => col.notNull())
                .addColumn('longitude', 'double precision', (col) => col.notNull())
                .addColumn('lattitude', 'double precision', (col) => col.notNull())
                .execute();
            return;
        });
    }
}
exports.CountryTableClient = CountryTableClient;
//# sourceMappingURL=country.js.map