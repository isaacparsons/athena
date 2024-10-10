"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemDAO = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const db_1 = require("../types/db");
const location_1 = require("./location");
const newsletter_item_mapper_1 = require("./mapping/newsletter-item-mapper");
class NewsletterItemDAO {
    constructor(db, locationDAO, newsletterItemDetailsDAO) {
        this.db = db;
        this.locationDAO = locationDAO;
        this.newsletterItemDetailsDAO = newsletterItemDetailsDAO;
    }
    deleteMany(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { newsletterItemIds } = input;
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield newsletterItemIds.reduce((deletedItemId, id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    yield deletedItemId;
                    const item = yield trx
                        .selectFrom('newsletterItem')
                        .where('id', '=', id)
                        .select(['id', 'nextItemId', 'previousItemId'])
                        .executeTakeFirstOrThrow();
                    // update item that has nextId = id to have nextId = item's nextId
                    yield trx
                        .updateTable('newsletterItem')
                        .set({
                        nextItemId: item.nextItemId,
                    })
                        .where('nextItemId', '=', id)
                        .executeTakeFirstOrThrow();
                    // update item that has previousId = id to have previousId = item's previousId
                    yield trx
                        .updateTable('newsletterItem')
                        .set({
                        previousItemId: item.previousItemId,
                    })
                        .where('previousItemId', '=', id)
                        .executeTakeFirstOrThrow();
                    yield trx
                        .deleteFrom('newsletterItem')
                        .where('id', '=', id)
                        .executeTakeFirstOrThrow();
                    return;
                }), Promise.resolve());
            }));
        });
    }
    post(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const location = yield new location_1.LocationDAO(trx).post(input.location);
                const createdNewsletterItem = yield trx
                    .insertInto('newsletterItem')
                    .values(Object.assign(Object.assign({}, lodash_1.default.omit(input, ['location'])), { locationId: location.id, created: new Date().toISOString(), creatorId: userId }))
                    .returningAll()
                    .executeTakeFirstOrThrow();
                yield trx
                    .updateTable('newsletterItem as ni')
                    .set({
                    nextItemId: createdNewsletterItem.id,
                })
                    .where(({ eb, not, and }) => and([
                    eb('ni.nextItemId', createdNewsletterItem.nextItemId ? '=' : 'is', createdNewsletterItem.nextItemId),
                    not(eb('ni.id', '=', createdNewsletterItem.id)),
                ]))
                    .executeTakeFirstOrThrow();
                yield trx
                    .updateTable('newsletterItem as ni')
                    .set({
                    previousItemId: createdNewsletterItem.id,
                })
                    .where(({ eb, not, and }) => and([
                    eb('ni.previousItemId', createdNewsletterItem.previousItemId ? '=' : 'is', createdNewsletterItem.previousItemId),
                    not(eb('ni.id', '=', createdNewsletterItem.id)),
                ]))
                    .executeTakeFirstOrThrow();
                return createdNewsletterItem.id;
            }));
        });
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.db
                .selectFrom('newsletterItem as ni')
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
                    .selectFrom('newsletterItemMedia as media-details')
                    .selectAll('media-details')
                    .whereRef('media-details.newsletterItemId', '=', 'ni.id')).as('mediaDetails'),
                (0, db_1.jsonObjectFrom)(eb
                    .selectFrom('newsletterItemText as text-details')
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
                .where(({ or, eb }) => or([eb('ni.id', '=', id), eb('ni.parentId', '=', id)]))
                .execute();
            return (0, newsletter_item_mapper_1.mapItems)(id, result);
        });
    }
    update(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newsletterItemUpdate = lodash_1.default.omit(input, [
                'location',
                'newsletterItemId',
            ]);
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (input.nextItemId) {
                    const nextItemId = input.nextItemId;
                    const existingItem = yield trx
                        .selectFrom('newsletterItem as ni')
                        .selectAll()
                        .where('ni.id', '=', input.newsletterItemId)
                        .executeTakeFirstOrThrow();
                    yield trx
                        .updateTable('newsletterItem as ni')
                        .set({
                        nextItemId: existingItem.nextItemId,
                    })
                        .where('ni.nextItemId', '=', existingItem.id)
                        .executeTakeFirst();
                    yield trx
                        .updateTable('newsletterItem as ni')
                        .set({
                        previousItemId: existingItem.previousItemId,
                    })
                        .where('ni.previousItemId', '=', existingItem.id)
                        .executeTakeFirst();
                }
                yield trx
                    .updateTable('newsletterItem as ni')
                    .set(Object.assign(Object.assign({}, lodash_1.default.omitBy(newsletterItemUpdate, lodash_1.default.isUndefined)), { modified: new Date().toISOString(), modifierId: userId }))
                    .where('ni.id', '=', input.newsletterItemId)
                    .executeTakeFirstOrThrow();
            }));
        });
    }
}
exports.NewsletterItemDAO = NewsletterItemDAO;
//# sourceMappingURL=newsletter-item.js.map