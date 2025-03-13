"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemDAO = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
require("reflect-metadata");
const dao_1 = require("@athena/dao");
const util_1 = require("../util");
const inversify_1 = require("inversify");
const types_1 = require("../types/types");
const mapping_1 = require("./mapping");
const newsletter_item_1 = require("../util/newsletter-item");
let NewsletterItemDAO = class NewsletterItemDAO {
    constructor(db, locationDAO, gcs, newsletterItemDetailsDAO) {
        this.db = db;
        this.locationDAO = locationDAO;
        this.gcs = gcs;
        this.newsletterItemDetailsDAO = newsletterItemDetailsDAO;
    }
    deleteMany(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { ids } = input;
            yield this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield Promise.all(ids.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const item = yield trx
                        .selectFrom('newsletter_item')
                        .where('id', '=', id)
                        .select(['id', 'nextId', 'prevId'])
                        .executeTakeFirstOrThrow();
                    // update item that has nextId = id to have nextId = item's nextId
                    yield trx
                        .updateTable('newsletter_item')
                        .set({ nextId: item.nextId })
                        .where('nextId', '=', id)
                        .execute();
                    // update item that has previousId = id to have previousId = item's previousId
                    yield trx
                        .updateTable('newsletter_item')
                        .set({ prevId: item.prevId })
                        .where('prevId', '=', id)
                        .execute();
                    yield trx
                        .deleteFrom('newsletter_item')
                        .where('id', '=', id)
                        .executeTakeFirstOrThrow();
                })));
            }));
        });
    }
    post(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const locationId = input.location
                    ? yield new dao_1.LocationDAO(trx).post(input.location)
                    : null;
                const details = input.details;
                const createdNewsletterItem = yield trx
                    .insertInto('newsletter_item')
                    .values(Object.assign(Object.assign({}, lodash_1.default.omit(input, ['location', 'details'])), { locationId: locationId, created: new Date().toISOString(), creatorId: userId }))
                    .returningAll()
                    .executeTakeFirstOrThrow();
                if (details) {
                    yield new dao_1.NewsletterItemDetailsDAO(trx).post(createdNewsletterItem.id, details);
                }
                yield trx
                    .updateTable('newsletter_item as ni')
                    .set({
                    nextId: createdNewsletterItem.id,
                })
                    .where(({ eb, not, and }) => and([
                    eb('ni.nextId', createdNewsletterItem.nextId ? '=' : 'is', createdNewsletterItem.nextId),
                    not(eb('ni.id', '=', createdNewsletterItem.id)),
                ]))
                    .executeTakeFirstOrThrow();
                yield trx
                    .updateTable('newsletter_item as ni')
                    .set({
                    prevId: createdNewsletterItem.id,
                })
                    .where(({ eb, not, and }) => and([
                    eb('ni.prevId', createdNewsletterItem.prevId ? '=' : 'is', createdNewsletterItem.prevId),
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
                    const res = yield trx
                        .insertInto('newsletter_item')
                        .values(Object.assign(Object.assign({}, lodash_1.default.omit(item, ['temp', 'location', 'details'])), { parentId: null, nextId: null, prevId: null, created: new Date().toISOString(), creatorId: userId, newsletterId: input.newsletterId }))
                        .returning('id')
                        .executeTakeFirstOrThrow();
                    if (item.details) {
                        yield new dao_1.NewsletterItemDetailsDAO(trx).post(res.id, item.details);
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
                const res = yield Promise.all(input.batch.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return trx
                        .updateTable('newsletter_item')
                        .set({
                        parentId: item.temp.parentId == null
                            ? input.position.parentId
                            : getRealId(item.temp.parentId),
                        nextId: item.temp.nextId == lastItemTemp.temp.id
                            ? input.position.nextId
                            : getRealId(item.temp.nextId),
                        prevId: item.temp.prevId == firstItemTemp.temp.id
                            ? input.position.prevId
                            : getRealId(item.temp.prevId),
                    })
                        .returning('id')
                        .where('newsletter_item.id', '=', getRealId(item.temp.id))
                        .executeTakeFirstOrThrow();
                })));
                return res.map((r) => r.id);
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
                    'nextId',
                    'prevId',
                    'created',
                    'modified',
                    (0, util_1.newsletterItemDetailsMedia)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.newsletterItemDetailsText)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.newsletterItemDetailsContainer)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.location)(trx, eb.ref('newsletter_item.locationId')),
                    (0, util_1.creator)(trx, eb.ref('newsletter_item.creatorId')).as('creator'),
                    (0, util_1.modifier)(trx, eb.ref('newsletter_item.modifierId')).as('modifier'),
                ])
                    .where('newsletter_item.id', '=', id)
                    .executeTakeFirstOrThrow();
                const mappedParentItem = (0, mapping_1.mapNewsletterItem)(parentItem);
                const parentItemWithSignedUrl = yield (0, newsletter_item_1.signMediaItemUrl)(this.gcs)(mappedParentItem);
                const children = yield trx
                    .selectFrom('newsletter_item')
                    .select((eb) => [
                    'id',
                    'newsletterId',
                    'title',
                    'date',
                    'parentId',
                    'nextId',
                    'prevId',
                    'created',
                    'modified',
                    (0, util_1.newsletterItemDetailsMedia)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.newsletterItemDetailsText)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.newsletterItemDetailsContainer)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.location)(trx, eb.ref('newsletter_item.locationId')),
                    (0, util_1.creator)(trx, eb.ref('newsletter_item.creatorId')).as('creator'),
                    (0, util_1.modifier)(trx, eb.ref('newsletter_item.modifierId')).as('modifier'),
                ])
                    .where('newsletter_item.parentId', '=', parentItem.id)
                    .execute();
                const mappedChildItems = children.map(mapping_1.mapNewsletterItem);
                const childItemsWithSignedUrls = yield (0, newsletter_item_1.signMediaItemUrls)(this.gcs)(mappedChildItems);
                return Object.assign(Object.assign({}, parentItemWithSignedUrl), { children: childItemsWithSignedUrls });
            }));
        });
    }
    update(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, date, location, childPositions, details } = input;
            if (!date && !location && !childPositions && !details)
                throw new Error('no update specified');
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (details)
                    yield new dao_1.NewsletterItemDetailsDAO(trx).update(details);
                if (location)
                    yield new dao_1.LocationDAO(trx).update(location);
                const result = yield trx
                    .updateTable('newsletter_item')
                    .set(Object.assign({ modified: new Date().toISOString(), modifierId: userId }, (date ? { date } : {})))
                    .where('id', '=', id)
                    .returning('id')
                    .executeTakeFirstOrThrow();
                yield Promise.all((childPositions !== null && childPositions !== void 0 ? childPositions : []).map((childPosition) => trx
                    .updateTable('newsletter_item')
                    .set({
                    modified: new Date().toISOString(),
                    modifierId: userId,
                    nextId: childPosition.nextId,
                    prevId: childPosition.prevId,
                    parentId: childPosition.parentId,
                })
                    .where('id', '=', childPosition.id)
                    .returning('id')
                    .executeTakeFirstOrThrow()));
                return result.id;
            }));
        });
    }
};
exports.NewsletterItemDAO = NewsletterItemDAO;
exports.NewsletterItemDAO = NewsletterItemDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.DBClient)),
    tslib_1.__param(1, (0, inversify_1.inject)(types_1.TYPES.ILocationDAO)),
    tslib_1.__param(2, (0, inversify_1.inject)(types_1.TYPES.IGCSManager)),
    tslib_1.__param(3, (0, inversify_1.inject)(types_1.TYPES.INewsletterItemDetailsDAO)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object])
], NewsletterItemDAO);
//# sourceMappingURL=newsletter-item.js.map