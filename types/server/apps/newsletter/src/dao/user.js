"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAO = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../types/db");
class UserDAO {
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
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('user as creator')
                    .selectAll('creator')
                    .whereRef('n.creatorId', '=', 'creator.id'))
                    .$notNull()
                    .as('creator'),
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('user as modifier')
                    .selectAll('modifier')
                    .whereRef('n.modifierId', '=', 'modifier.id')).as('modifier'),
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('user as owner')
                    .selectAll('owner')
                    .whereRef('n.ownerId', '=', 'owner.id'))
                    .$notNull()
                    .as('owner'),
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
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('user as creator')
                    .selectAll('creator')
                    .whereRef('creator.id', '=', 'nit.creatorId'))
                    .$notNull()
                    .as('creator'),
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('user as modifier')
                    .selectAll('modifier')
                    .whereRef('modifier.id', '=', 'nit.modifierId')).as('modifier'),
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
}
exports.UserDAO = UserDAO;
//# sourceMappingURL=user.js.map