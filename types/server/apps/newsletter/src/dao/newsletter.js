"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterDAO = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
require("reflect-metadata");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const db_1 = require("@athena/db");
const util_1 = require("../util");
const types_1 = require("../types/types");
const mapping_1 = require("./mapping");
const newsletter_item_1 = require("../util/newsletter-item");
let NewsletterDAO = class NewsletterDAO {
    constructor(db, gcs, newsletterItemDAO) {
        this.db = db;
        this.gcs = gcs;
        this.newsletterItemDAO = newsletterItemDAO;
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const newsletter = yield (0, util_1.selectEntityColumns)(trx, 'newsletter')
                    .where('newsletter.id', '=', id)
                    .select((eb) => [
                    'newsletter.name',
                    'newsletter.startDate',
                    'newsletter.endDate',
                    (0, util_1.owner)(trx, eb.ref('newsletter.ownerId')).as('owner'),
                    (0, db_1.jsonArrayFrom)(eb
                        .selectFrom('user_newsletter as un')
                        .where('un.newsletterId', '=', id)
                        .innerJoin('user', 'user.id', 'un.userId')
                        .selectAll('user')).as('members'),
                ])
                    .executeTakeFirstOrThrow(() => new Error(`newsletter with id: ${id} does not exist`));
                const items = yield (0, util_1.selectEntityColumns)(trx, 'newsletter_item')
                    .where('newsletter_item.newsletterId', '=', id)
                    .select((eb) => [
                    'newsletterId',
                    'title',
                    'date',
                    'parentId',
                    'nextId',
                    'prevId',
                    (0, util_1.newsletterItemDetailsMedia)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.newsletterItemDetailsText)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.newsletterItemDetailsContainer)(trx, eb.ref('newsletter_item.id')),
                    (0, util_1.location)(trx, eb.ref('newsletter_item.locationId')),
                ])
                    .execute();
                const mappedItems = items.map((item) => (0, mapping_1.mapNewsletterItem)(item));
                const itemsWithSignedUrl = yield (0, newsletter_item_1.signMediaItemUrls)(this.gcs)(mappedItems);
                return {
                    id: newsletter.id,
                    meta: (0, mapping_1.mapMeta)(newsletter),
                    properties: {
                        name: newsletter.name,
                        dateRange: (0, mapping_1.mapDateRange)(newsletter),
                    },
                    owner: (0, mapping_1.mapUser)(newsletter.owner),
                    members: (0, mapping_1.mapUsers)(newsletter.members),
                    items: itemsWithSignedUrl,
                };
            }));
        });
    }
    // async get(id: number): Promise<Newsletter> {
    //   return this.db.transaction().execute(async (trx: Transaction) => {
    //     const newsletter = await trx
    //       .selectFrom('newsletter as n')
    //       .where('n.id', '=', id)
    //       .select((eb) => [
    //         'n.id',
    //         'n.name',
    //         'n.startDate',
    //         'n.endDate',
    //         'n.created',
    //         'n.modified',
    //         creator(trx, eb.ref('n.creatorId')).as('creator'),
    //         modifier(trx, eb.ref('n.modifierId')).as('modifier'),
    //         owner(trx, eb.ref('n.ownerId')).as('owner'),
    //         jsonArrayFrom(
    //           eb
    //             .selectFrom('user_newsletter as un')
    //             .where('un.newsletterId', '=', id)
    //             .innerJoin('user', 'user.id', 'un.userId')
    //             .selectAll('user')
    //         ).as('members'),
    //       ])
    //       .executeTakeFirstOrThrow(
    //         () => new Error(`newsletter with id: ${id} does not exist`)
    //       );
    //     const items = await trx
    //       .selectFrom('newsletter_item')
    //       .where('newsletter_item.newsletterId', '=', id)
    //       .select((eb) => [
    //         'id',
    //         'newsletterId',
    //         'title',
    //         'date',
    //         'parentId',
    //         'nextId',
    //         'prevId',
    //         'created',
    //         'modified',
    //         newsletterItemDetailsMedia(trx, eb.ref('newsletter_item.id')),
    //         newsletterItemDetailsText(trx, eb.ref('newsletter_item.id')),
    //         newsletterItemDetailsContainer(trx, eb.ref('newsletter_item.id')),
    //         location(trx, eb.ref('newsletter_item.locationId')),
    //         creator(trx, eb.ref('newsletter_item.creatorId')).as('creator'),
    //         modifier(trx, eb.ref('newsletter_item.modifierId')).as('modifier'),
    //       ])
    //       .execute();
    //     const mappedItems = items.map((item) => mapNewsletterItem(item));
    //     const itemsWithSignedUrl = await signMediaItemUrls(this.gcs)(mappedItems);
    //     return {
    //       id: newsletter.id,
    //       meta: mapMeta(newsletter),
    //       properties: {
    //         name: newsletter.name,
    //         dateRange: mapDateRange(newsletter),
    //       },
    //       owner: mapUser(newsletter.owner),
    //       members: mapUsers(newsletter.members),
    //       items: itemsWithSignedUrl,
    //     };
    //   });
    // }
    post(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const newsletter = yield trx
                    .insertInto('newsletter')
                    .values({
                    name: input.properties.name,
                    startDate: (_a = input.properties.dateRange) === null || _a === void 0 ? void 0 : _a.start,
                    endDate: (_b = input.properties.dateRange) === null || _b === void 0 ? void 0 : _b.end,
                    ownerId: userId,
                    created: new Date().toISOString(),
                    creatorId: userId,
                })
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