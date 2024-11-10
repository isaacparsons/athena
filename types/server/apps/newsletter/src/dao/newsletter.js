"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterDAO = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
require("reflect-metadata");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const dao_1 = require("@athena/dao");
const db_1 = require("@athena/db");
const common_1 = require("@athena/common");
const util_1 = require("../util");
const types_1 = require("../types/types");
let NewsletterDAO = class NewsletterDAO {
    constructor(db, gcs, newsletterItemDAO) {
        this.db = db;
        this.gcs = gcs;
        this.newsletterItemDAO = newsletterItemDAO;
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newsletter = yield this.db
                .selectFrom('newsletter as n')
                .where('n.id', '=', id)
                .selectAll()
                .select(({ ref }) => (0, util_1.user)(this.db, ref('n.ownerId'), 'owner'))
                .select(({ ref }) => (0, util_1.creator)(this.db, ref('n.creatorId')))
                .select(({ ref }) => (0, util_1.modifier)(this.db, ref('n.modifierId')))
                .select((eb) => (0, db_1.jsonArrayFrom)(eb
                .selectFrom('user_newsletter as un')
                .whereRef('un.newsletterId', '=', 'n.id')
                .innerJoin('user', 'user.id', 'un.userId')
                .selectAll('user')).as('members'))
                .select((eb) => (0, db_1.jsonArrayFrom)(eb
                .selectFrom('newsletter_item as ni')
                .whereRef('ni.newsletterId', '=', 'n.id')
                .select((eb) => [
                'id',
                'newsletterId',
                'title',
                'date',
                'parentId',
                'nextItemId',
                'previousItemId',
                'created',
                'modified',
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('newsletter_item_media as media-details')
                    .selectAll('media-details')
                    .whereRef('media-details.newsletterItemId', '=', 'ni.id')).as('mediaDetails'),
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('newsletter_item_text as text-details')
                    .selectAll('text-details')
                    .whereRef('text-details.newsletterItemId', '=', 'ni.id')).as('textDetails'),
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('newsletter_item_container as container-details')
                    .selectAll('container-details')
                    .whereRef('container-details.newsletterItemId', '=', 'ni.id')).as('containerDetails'),
                (0, util_1.location)(this.db, eb.ref('ni.locationId')),
                (0, util_1.creator)(this.db, eb.ref('ni.creatorId')),
                (0, util_1.modifier)(this.db, eb.ref('ni.modifierId')),
            ])).as('items'))
                .executeTakeFirstOrThrow(() => new Error(`newsletter with id: ${id} does not exist`));
            const mappedItems = newsletter.items.map((item) => (0, dao_1.mapNewsletterItem)(item));
            const itemsWithSignedUrl = yield Promise.all(mappedItems.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a;
                if (((_a = item.details) === null || _a === void 0 ? void 0 : _a.type) === common_1.NewsletterItemTypeName.Media) {
                    const details = item.details;
                    const signedUrl = yield this.gcs.getSignedUrl(details.fileName, 'read');
                    details.fileName = signedUrl;
                    return Object.assign(Object.assign({}, item), { details });
                }
                return item;
            })));
            return {
                id: newsletter.id,
                meta: {
                    created: newsletter.created,
                    modified: newsletter.modified,
                    creator: newsletter.creator,
                    modifier: newsletter.modifier,
                },
                properties: {
                    name: newsletter.name,
                    dateRange: (0, util_1.parseDateRange)(newsletter.startDate, newsletter.endDate),
                },
                owner: newsletter.owner,
                members: newsletter.members,
                items: itemsWithSignedUrl,
            };
        });
    }
    post(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const newsletter = yield trx
                    .insertInto('newsletter')
                    .values(Object.assign(Object.assign({}, input), { ownerId: userId, created: new Date().toISOString(), creatorId: userId }))
                    .returningAll()
                    .executeTakeFirstOrThrow();
                yield trx
                    .insertInto('user_newsletter')
                    .values({
                    userId: userId,
                    newsletterId: newsletter.id,
                })
                    .executeTakeFirstOrThrow();
                return newsletter.id;
            }));
        });
    }
    update(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const inputWithoutId = lodash_1.default.omit(input, 'id');
            const res = yield this.db
                .updateTable('newsletter')
                .set(Object.assign(Object.assign({}, inputWithoutId), { modifierId: userId, modified: new Date().toISOString() }))
                .returning('id')
                .where('id', '=', input.id)
                .executeTakeFirstOrThrow();
            return res.id;
        });
    }
    delete(userId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.db
                .deleteFrom('newsletter')
                .where('id', '=', id)
                .where('ownerId', '=', userId)
                .returning('id')
                .executeTakeFirstOrThrow();
            return res.id;
        });
    }
};
exports.NewsletterDAO = NewsletterDAO;
exports.NewsletterDAO = NewsletterDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.DBClient)),
    tslib_1.__param(1, (0, inversify_1.inject)(types_1.TYPES.IGCSManager)),
    tslib_1.__param(2, (0, inversify_1.inject)(types_1.TYPES.INewsletterItemDAO)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], NewsletterDAO);
//# sourceMappingURL=newsletter.js.map