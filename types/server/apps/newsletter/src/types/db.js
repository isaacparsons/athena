"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.DB = exports.PostgresDialect = exports.sql = exports.Pool = exports.jsonArrayFrom = exports.jsonObjectFrom = void 0;
const tslib_1 = require("tslib");
var postgres_1 = require("kysely/helpers/postgres");
Object.defineProperty(exports, "jsonObjectFrom", { enumerable: true, get: function () { return postgres_1.jsonObjectFrom; } });
Object.defineProperty(exports, "jsonArrayFrom", { enumerable: true, get: function () { return postgres_1.jsonArrayFrom; } });
var pg_1 = require("pg");
Object.defineProperty(exports, "Pool", { enumerable: true, get: function () { return pg_1.Pool; } });
var kysely_1 = require("kysely");
Object.defineProperty(exports, "sql", { enumerable: true, get: function () { return kysely_1.sql; } });
Object.defineProperty(exports, "PostgresDialect", { enumerable: true, get: function () { return kysely_1.PostgresDialect; } });
Object.defineProperty(exports, "DB", { enumerable: true, get: function () { return kysely_1.Kysely; } });
class Table {
    constructor(db, name) {
        this.name = name;
        this.db = db;
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
    deleteTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.db.schema.dropTable(this.name).ifExists().cascade().execute();
            return;
        });
    }
}
exports.Table = Table;
//# sourceMappingURL=db.js.map