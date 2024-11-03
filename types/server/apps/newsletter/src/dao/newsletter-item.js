"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemDAO = exports.mapNewsletterItem = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const _1 = require(".");
const util_1 = require("../util");
const mapNewsletterItem = (item) => ({
    id: item.id,
    newsletterId: item.newsletterId,
    meta: {
        created: item.created,
        modified: item.modified,
        creator: item.creator,
        modifier: item.modifier,
    },
    location: mapLocation(item.location),
    date: item.date,
    title: item.title,
    parentId: item.parentId,
    nextItemId: item.nextItemId,
    previousItemId: item.previousItemId,
    details: mapNewsletterItemDetails(item.mediaDetails, item.textDetails),
});
exports.mapNewsletterItem = mapNewsletterItem;
const mapLocation = (location) => location
    ? {
        id: location.id,
        name: location.name,
        country: location.countryCode,
        position: location.lattitude && location.longitude
            ? {
                lattitude: location.lattitude,
                longitude: location.longitude,
            }
            : null,
    }
    : null;
const mapNewsletterItemDetails = (media, text) => {
    if (media)
        return {
            id: media.id,
            name: media.name,
            type: media.type,
            fileName: media.fileName,
            caption: media.caption,
        };
    if (text)
        return {
            id: text.id,
            name: text.name,
            type: text.type,
            description: text.description,
            link: text.link,
        };
};
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
                        .selectFrom('newsletter_item')
                        .where('id', '=', id)
                        .select(['id', 'nextItemId', 'previousItemId'])
                        .executeTakeFirstOrThrow();
                    // update item that has nextId = id to have nextId = item's nextId
                    yield trx
                        .updateTable('newsletter_item')
                        .set({
                        nextItemId: item.nextItemId,
                    })
                        .where('nextItemId', '=', id)
                        .executeTakeFirstOrThrow();
                    // update item that has previousId = id to have previousId = item's previousId
                    yield trx
                        .updateTable('newsletter_item')
                        .set({
                        previousItemId: item.previousItemId,
                    })
                        .where('previousItemId', '=', id)
                        .executeTakeFirstOrThrow();
                    yield trx
                        .deleteFrom('newsletter_item')
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
                const location = yield new _1.LocationDAO(trx).post(input.location);
                const details = input.details;
                const createdNewsletterItem = yield trx
                    .insertInto('newsletter_item')
                    .values(Object.assign(Object.assign({}, lodash_1.default.omit(input, ['location', 'details'])), { locationId: location.id, created: new Date().toISOString(), creatorId: userId }))
                    .returningAll()
                    .executeTakeFirstOrThrow();
                if (details) {
                    yield new _1.NewsletterItemDetailsDAO(trx).post(createdNewsletterItem.id, details);
                }
                yield trx
                    .updateTable('newsletter_item as ni')
                    .set({
                    nextItemId: createdNewsletterItem.id,
                })
                    .where(({ eb, not, and }) => and([
                    eb('ni.nextItemId', createdNewsletterItem.nextItemId ? '=' : 'is', createdNewsletterItem.nextItemId),
                    not(eb('ni.id', '=', createdNewsletterItem.id)),
                ]))
                    .executeTakeFirstOrThrow();
                yield trx
                    .updateTable('newsletter_item as ni')
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
    postBatch(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const tuples = yield Promise.all(input.batch.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const res = yield this.db
                        .insertInto('newsletter_item')
                        .values(Object.assign(Object.assign({}, lodash_1.default.omit(item, ['temp', 'location', 'details'])), { parentId: null, nextItemId: null, previousItemId: null, created: new Date().toISOString(), creatorId: userId, newsletterId: input.newsletterId }))
                        .returning('id')
                        .executeTakeFirstOrThrow();
                    if (item.details) {
                        yield new _1.NewsletterItemDetailsDAO(trx).post(res.id, item.details);
                    }
                    return [item.temp.id, res.id];
                })));
                const parentBatchItems = Array.from(input.batch.filter((i) => i.temp.parentId === null));
                const tempIdRealIdMap = new Map(tuples);
                const firstItemTemp = parentBatchItems.find((i) => i.temp.prevId === null);
                const lastItemTemp = parentBatchItems.find((i) => i.temp.nextId === null);
                if (!firstItemTemp || !lastItemTemp)
                    throw new Error('there must be a first item and a last item');
                const getRealId = (id) => {
                    var _a;
                    if (!id)
                        return null;
                    return (_a = tempIdRealIdMap.get(id)) !== null && _a !== void 0 ? _a : null;
                };
                return Promise.all(input.batch.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return this.db
                        .updateTable('newsletter_item')
                        .set({
                        parentId: item.temp.parentId == null
                            ? input.parentId
                            : getRealId(item.temp.parentId),
                        nextItemId: item.temp.nextId == lastItemTemp.temp.id
                            ? input.nextItemId
                            : getRealId(item.temp.nextId),
                        previousItemId: item.temp.prevId == firstItemTemp.temp.id
                            ? input.previousItemId
                            : getRealId(item.temp.prevId),
                    })
                        .returning('id')
                        .where('newsletter_item.id', '=', getRealId(item.temp.id))
                        .executeTakeFirstOrThrow();
                })));
            }));
        });
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const parentItem = yield trx
                    .selectFrom('newsletter_item')
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
                    (0, util_1.newsletterItemDetailsMedia)(this.db, eb.ref('newsletter_item.id')),
                    (0, util_1.newsletterItemDetailsText)(this.db, eb.ref('newsletter_item.id')),
                    (0, util_1.location)(this.db, eb.ref('newsletter_item.locationId')),
                    (0, util_1.creator)(this.db, eb.ref('newsletter_item.creatorId')),
                    (0, util_1.modifier)(this.db, eb.ref('newsletter_item.modifierId')),
                ])
                    .where(({ or, eb }) => or([eb('newsletter_item.id', '=', id), eb('newsletter_item.parentId', '=', id)]))
                    .executeTakeFirstOrThrow();
                const children = yield trx
                    .selectFrom('newsletter_item')
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
                    (0, util_1.newsletterItemDetailsMedia)(this.db, eb.ref('newsletter_item.id')),
                    (0, util_1.newsletterItemDetailsText)(this.db, eb.ref('newsletter_item.id')),
                    (0, util_1.location)(this.db, eb.ref('newsletter_item.locationId')),
                    (0, util_1.creator)(this.db, eb.ref('newsletter_item.creatorId')),
                    (0, util_1.modifier)(this.db, eb.ref('newsletter_item.modifierId')),
                ])
                    .where('newsletter_item.parentId', '=', parentItem.id)
                    .execute();
                return Object.assign(Object.assign({}, (0, exports.mapNewsletterItem)(parentItem)), { children: children.map(exports.mapNewsletterItem) });
            }));
        });
    }
    getTree(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.db
                .withRecursive('newsletter_items_tree', (db) => db
                .selectFrom('newsletter_item as ni1')
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
                (0, util_1.newsletterItemDetailsMedia)(this.db, eb.ref('ni1.id')),
                (0, util_1.newsletterItemDetailsText)(this.db, eb.ref('ni1.id')),
                (0, util_1.location)(this.db, eb.ref('ni1.locationId')),
                (0, util_1.creator)(this.db, eb.ref('ni1.creatorId')),
                (0, util_1.modifier)(this.db, eb.ref('ni1.modifierId')),
            ])
                .where('ni1.parentId', input.parentId ? '=' : 'is', input.parentId)
                .unionAll(db
                .selectFrom('newsletter_item as ni2')
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
                (0, util_1.newsletterItemDetailsMedia)(this.db, eb.ref('ni2.id')),
                (0, util_1.newsletterItemDetailsText)(this.db, eb.ref('ni2.id')),
                (0, util_1.location)(this.db, eb.ref('ni2.locationId')),
                (0, util_1.creator)(this.db, eb.ref('ni2.creatorId')),
                (0, util_1.modifier)(this.db, eb.ref('ni2.modifierId')),
            ])
                .innerJoin('newsletter_items_tree', 'ni2.id', 'newsletter_items_tree.parentId')))
                .selectFrom('newsletter_items_tree')
                .selectAll()
                .execute();
            return result.map(exports.mapNewsletterItem);
        });
    }
    update(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newsletterItemUpdate = lodash_1.default.omit(input, ['location', 'newsletterItemId']);
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (input.nextItemId) {
                    const nextItemId = input.nextItemId;
                    const existingItem = yield trx
                        .selectFrom('newsletter_item as ni')
                        .selectAll()
                        .where('ni.id', '=', input.newsletterItemId)
                        .executeTakeFirstOrThrow();
                    yield trx
                        .updateTable('newsletter_item as ni')
                        .set({
                        nextItemId: existingItem.nextItemId,
                    })
                        .where('ni.nextItemId', '=', existingItem.id)
                        .executeTakeFirst();
                    yield trx
                        .updateTable('newsletter_item as ni')
                        .set({
                        previousItemId: existingItem.previousItemId,
                    })
                        .where('ni.previousItemId', '=', existingItem.id)
                        .executeTakeFirst();
                }
                yield trx
                    .updateTable('newsletter_item as ni')
                    .set(Object.assign(Object.assign({}, lodash_1.default.omitBy(newsletterItemUpdate, lodash_1.default.isUndefined)), { modified: new Date().toISOString(), modifierId: userId }))
                    .where('ni.id', '=', input.newsletterItemId)
                    .executeTakeFirstOrThrow();
            }));
        });
    }
}
exports.NewsletterItemDAO = NewsletterItemDAO;
//# sourceMappingURL=newsletter-item.js.map