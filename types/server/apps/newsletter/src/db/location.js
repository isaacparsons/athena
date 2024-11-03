"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationTableClient = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../db");
class LocationTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
                .addColumn('countryCode', 'varchar')
                .addColumn('name', 'varchar')
                .addColumn('longitude', 'double precision')
                .addColumn('lattitude', 'double precision')
                .execute();
            return;
        });
    }
}
exports.LocationTableClient = LocationTableClient;
//# sourceMappingURL=location.js.map