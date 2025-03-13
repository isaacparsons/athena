"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederatedCredentialTableClient = void 0;
const db_1 = require("@athena/db");
class FederatedCredentialTableClient extends db_1.Table {
    constructor(db, name) {
        super(db, name);
        this.tableBuilder = this.tableBuilder
            .addColumn('id', 'serial', (cb) => cb.notNull().primaryKey())
            .addColumn('provider', 'varchar', (col) => col.notNull())
            .addColumn('subjectId', 'varchar', (col) => col.notNull())
            .addColumn('userId', 'integer', (col) => col.references(`${db_1.TABLE_NAMES.USER}.id`).notNull().onDelete('cascade'));
    }
}
exports.FederatedCredentialTableClient = FederatedCredentialTableClient;
//# sourceMappingURL=federated-credential.js.map