"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const tslib_1 = require("tslib");
const client_1 = require("../../db/client");
function createUser() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const testUserEmail = 'test@test.com';
        const existingUser = yield client_1.dbClient
            .selectFrom('user')
            .selectAll()
            .where('user.email', '=', testUserEmail)
            .executeTakeFirst();
        if (existingUser) {
            return existingUser;
        }
        return client_1.dbClient
            .insertInto('user')
            .values({
            firstName: 'test',
            lastName: 'user',
            email: testUserEmail,
        })
            .returningAll()
            .executeTakeFirstOrThrow();
    });
}
//# sourceMappingURL=users.js.map