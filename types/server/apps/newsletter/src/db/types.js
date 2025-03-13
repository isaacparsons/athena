"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTable = exports.Table = exports.TABLE_NAMES = exports.MetaColumns = exports.DB = exports.PostgresDialect = exports.sql = exports.Pool = exports.jsonArrayFrom = exports.jsonObjectFrom = void 0;
const tslib_1 = require("tslib");
const kysely_1 = require("kysely");
var postgres_1 = require("kysely/helpers/postgres");
Object.defineProperty(exports, "jsonObjectFrom", { enumerable: true, get: function () { return postgres_1.jsonObjectFrom; } });
Object.defineProperty(exports, "jsonArrayFrom", { enumerable: true, get: function () { return postgres_1.jsonArrayFrom; } });
var pg_1 = require("pg");
Object.defineProperty(exports, "Pool", { enumerable: true, get: function () { return pg_1.Pool; } });
var kysely_2 = require("kysely");
Object.defineProperty(exports, "sql", { enumerable: true, get: function () { return kysely_2.sql; } });
Object.defineProperty(exports, "PostgresDialect", { enumerable: true, get: function () { return kysely_2.PostgresDialect; } });
Object.defineProperty(exports, "DB", { enumerable: true, get: function () { return kysely_2.Kysely; } });
exports.MetaColumns = [
    'created',
    'modified',
    'creatorId',
    'modifierId',
];
var TABLE_NAMES;
(function (TABLE_NAMES) {
    TABLE_NAMES["LOCATION"] = "location";
    TABLE_NAMES["COUNTRY"] = "country";
    TABLE_NAMES["USER"] = "user";
    TABLE_NAMES["FEDEREATED_CREDENTIAL"] = "federated_credential";
    TABLE_NAMES["NEWSLETTER"] = "newsletter";
    TABLE_NAMES["USER_NEWSLETTER"] = "user_newsletter";
    TABLE_NAMES["USER_TEMPLATE"] = "user_template";
    TABLE_NAMES["NEWSLETTER_ITEM"] = "newsletter_item";
    TABLE_NAMES["NEWSLETTER_ITEM_MEDIA"] = "newsletter_item_media";
    TABLE_NAMES["NEWSLETTER_ITEM_TEXT"] = "newsletter_item_text";
    TABLE_NAMES["NEWSLETTER_ITEM_CONTAINER"] = "newsletter_item_container";
    TABLE_NAMES["NEWSLETTER_ITEM_TEMPLATE"] = "newsletter_item_template";
    TABLE_NAMES["NEWSLETTER_ITEM_TEMPLATE_DATA"] = "newsletter_item_template_data";
    TABLE_NAMES["NEWSLETTER_ITEM_TEMPLATE_MAPPING"] = "newsletter_item_template_mapping";
})(TABLE_NAMES || (exports.TABLE_NAMES = TABLE_NAMES = {}));
class Table {
    constructor(db, name) {
        this.db = db;
        this.name = name;
        this.tableBuilder = this.db.schema
            .createTable(this.name)
            .ifNotExists();
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.tableBuilder.execute();
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
class EntityTable extends Table {
    constructor(db, name) {
        super(db, name);
        this.db = db;
        this.name = name;
        this.tableBuilder = this.tableBuilder
            .addColumn('id', 'serial', (cb) => cb.primaryKey().notNull())
            .addColumn('created', 'timestamp', (cb) => cb.notNull().defaultTo((0, kysely_1.sql) `now()`))
            .addColumn('creatorId', 'integer', (col) => col.notNull().references('user.id').onDelete('cascade'))
            .addColumn('modified', 'timestamp')
            .addColumn('modifierId', 'integer', (col) => col.references('user.id').onDelete('cascade'));
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.tableBuilder.execute();
        });
    }
    deleteTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.db.schema.dropTable(this.name).ifExists().cascade().execute();
            return;
        });
    }
}
exports.EntityTable = EntityTable;
//# sourceMappingURL=types.js.map