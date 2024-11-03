"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterDAO = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const _1 = require(".");
const db_1 = require("../db");
const util_1 = require("../util");
class NewsletterDAO {
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
                    .selectFrom('location')
                    .selectAll('location')
                    .whereRef('location.id', '=', 'ni.locationId')).as('location'),
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('user as creator')
                    .selectAll('creator')
                    .whereRef('creator.id', '=', 'ni.creatorId'))
                    .$notNull()
                    .as('creator'),
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('user as modifier')
                    .selectAll('modifier')
                    .whereRef('modifier.id', '=', 'ni.modifierId')).as('modifier'),
            ])
                .where('ni.parentId', 'is', null)).as('items'))
                .executeTakeFirstOrThrow(() => new Error(`newsletter with id: ${id} does not exist`));
            const mappedItems = newsletter.items.map((item) => (0, _1.mapNewsletterItem)(item));
            const itemsWithSignedUrl = yield Promise.all(mappedItems.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a;
                if (((_a = item.details) === null || _a === void 0 ? void 0 : _a.type) === 'media') {
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
            return this.db
                .updateTable('newsletter')
                .set(Object.assign(Object.assign({}, inputWithoutId), { modifierId: userId, modified: new Date().toISOString() }))
                .where('id', '=', input.id)
                .executeTakeFirstOrThrow();
        });
    }
    delete(userId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db
                .deleteFrom('newsletter')
                .where('id', '=', id)
                .where('ownerId', '=', userId)
                .execute();
        });
    }
}
exports.NewsletterDAO = NewsletterDAO;
//# sourceMappingURL=newsletter.js.map