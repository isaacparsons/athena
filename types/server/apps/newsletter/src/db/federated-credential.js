"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederatedCredentialTableClient = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../types/db");
class FederatedCredentialTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
    }
    createTable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.db.schema
                .createTable(this.name)
                .ifNotExists()
                .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
                .addColumn('provider', 'varchar', (col) => col.notNull())
                .addColumn('subjectId', 'varchar', (col) => col.notNull())
                .addColumn('userId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).notNull().onDelete('cascade'))
                .execute();
            return;
        });
    }
}
exports.FederatedCredentialTableClient = FederatedCredentialTableClient;
//# sourceMappingURL=federated-credential.js.map