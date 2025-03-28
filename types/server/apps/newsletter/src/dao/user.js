"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAO = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("../types/types");
const mapping_1 = require("./mapping");
let UserDAO = class UserDAO {
    constructor(db, newsletterDAO) {
        this.db = db;
        this.newsletterDAO = newsletterDAO;
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.db
                .selectFrom('user')
                .where('user.id', '=', id)
                .selectAll()
                .executeTakeFirstOrThrow();
            const newsletters = yield this.newsletters(user.id);
            // const newsletterItemTemplates = await this.newsletterItemTemplates(user.id);
            return Object.assign(Object.assign({}, (0, mapping_1.mapUser)(user)), { newsletters });
        });
    }
    newsletters(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.newsletterDAO.getByUserId(userId);
        });
    }
};
exports.UserDAO = UserDAO;
exports.UserDAO = UserDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.DBClient)),
    tslib_1.__param(1, (0, inversify_1.inject)(types_1.TYPES.INewsletterDAO)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], UserDAO);
//# sourceMappingURL=user.js.map