"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationTableClient = void 0;
const db_1 = require("@athena/db");
class LocationTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
            .addColumn('countryCode', 'varchar')
            .addColumn('name', 'varchar')
            .addColumn('longitude', 'double precision')
            .addColumn('latitude', 'double precision');
    }
}
exports.LocationTableClient = LocationTableClient;
//# sourceMappingURL=location.js.map