"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAO = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const util_1 = require("../util");
const inversify_1 = require("inversify");
const types_1 = require("../types/types");
let UserDAO = class UserDAO {
    constructor(db) {
        this.db = db;
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.db
                .selectFrom('user')
                .where(`user.id`, '=', id)
                .selectAll()
                .executeTakeFirstOrThrow();
            const newsletters = yield this.newsletters(user.id);
            const newsletterItemTemplates = yield this.newsletterItemTemplates(user.id);
            return Object.assign(Object.assign({}, user), { newsletters,
                newsletterItemTemplates });
        });
    }
    newsletters(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newsletters = yield this.db
                .selectFrom('user_newsletter as un')
                .innerJoin('newsletter as n', 'n.id', 'un.newsletterId')
                .where('un.userId', '=', userId)
                .select((eb) => [
                'n.id',
                'n.created',
                'n.modified',
                'n.name',
                'n.startDate',
                'n.endDate',
                (0, util_1.creator)(this.db, eb.ref('n.creatorId')),
                (0, util_1.modifier)(this.db, eb.ref('n.modifierId')),
                (0, util_1.user)(this.db, eb.ref('n.ownerId'), 'owner'),
            ])
                .execute();
            return newsletters.map((newsletter) => ({
                id: newsletter.id,
                meta: {
                    created: newsletter.created,
                    modified: newsletter.modified,
                    creator: newsletter.creator,
                    modifier: newsletter.modifier,
                },
                properties: {
                    name: newsletter.name,
                    dateRange: {
                        start: newsletter.startDate,
                        end: newsletter.endDate,
                    },
                },
                owner: newsletter.owner,
            }));
        });
    }
    newsletterItemTemplates(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const templates = yield this.db
                .selectFrom('user_template as ut')
                .innerJoin('newsletter_item_template as nit', 'nit.id', 'ut.newsletterItemTemplateId')
                .select((eb) => [
                'nit.id',
                'nit.name',
                'nit.created',
                'nit.modified',
                (0, util_1.creator)(this.db, eb.ref('nit.creatorId')),
                (0, util_1.modifier)(this.db, eb.ref('nit.modifierId')),
            ])
                .where('ut.userId', '=', userId)
                .execute();
            return templates.map((t) => ({
                id: t.id,
                name: t.name,
                meta: {
                    created: t.created,
                    modified: t.modified,
                    creator: t.creator,
                    modifier: t.modifier,
                },
            }));
        });
    }
};
exports.UserDAO = UserDAO;
exports.UserDAO = UserDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.DBClient)),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserDAO);
//# sourceMappingURL=user.js.map