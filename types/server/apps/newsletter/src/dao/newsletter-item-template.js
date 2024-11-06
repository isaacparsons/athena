"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemTemplateDAO = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
require("reflect-metadata");
const db_1 = require("../db");
const util_1 = require("../util");
const inversify_1 = require("inversify");
const types_1 = require("../types/types");
let NewsletterItemTemplateDAO = class NewsletterItemTemplateDAO {
    constructor(db) {
        this.db = db;
    }
    post(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const template = yield trx
                    .insertInto('newsletter_item_template')
                    .values({
                    name: input.name,
                    created: new Date().toISOString(),
                    creatorId: userId,
                })
                    .returning('id')
                    .executeTakeFirstOrThrow();
                yield trx
                    .insertInto(db_1.TABLE_NAMES.USER_TEMPLATE)
                    .values({ newsletterItemTemplateId: template.id, userId })
                    .executeTakeFirstOrThrow();
                const rootNode = yield trx
                    .insertInto('newsletter_item_template_data')
                    .values({
                    data: null,
                    parentId: null,
                    nextId: null,
                    prevId: null,
                    templateId: template.id,
                })
                    .returning('id')
                    .executeTakeFirstOrThrow();
                const tuples = yield Promise.all(input.data.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const res = yield trx
                        .insertInto('newsletter_item_template_data')
                        .values({
                        data: (_a = item.data) !== null && _a !== void 0 ? _a : null,
                        parentId: null,
                        nextId: null,
                        prevId: null,
                        templateId: (_b = item.templateId) !== null && _b !== void 0 ? _b : null,
                    })
                        .returning('id')
                        .executeTakeFirstOrThrow();
                    return [item.temp.id, res.id];
                })));
                const tempIdRealIdMap = new Map(tuples);
                const getRealId = (id) => {
                    var _a;
                    if (!id)
                        return null;
                    return (_a = tempIdRealIdMap.get(id)) !== null && _a !== void 0 ? _a : null;
                };
                yield Promise.all(input.data.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var _a;
                    return trx
                        .updateTable('newsletter_item_template_data')
                        .set({
                        parentId: (_a = getRealId(item.temp.parentId)) !== null && _a !== void 0 ? _a : rootNode.id,
                        nextId: getRealId(item.temp.nextId),
                        prevId: getRealId(item.temp.prevId),
                    })
                        .returning('id')
                        .where('newsletter_item_template_data.id', '=', getRealId(item.temp.id))
                        .executeTakeFirstOrThrow();
                })));
                return template.id;
            }));
        });
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const template = yield this.getTemplate(id);
            const templates = yield Promise.all(template.items
                .filter((i) => i.templateId !== id && i.templateId !== null)
                .map((i) => tslib_1.__awaiter(this, void 0, void 0, function* () { return this.getTemplate(i.templateId); })));
            return Object.assign(Object.assign({}, template), { templates });
        });
    }
    getTemplate(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const template = yield this.db
                .selectFrom('newsletter_item_template as nit')
                .where('nit.id', '=', id)
                .select((eb) => [
                'nit.id',
                'nit.name',
                'nit.created',
                'nit.modified',
                (0, util_1.creator)(this.db, eb.ref('nit.creatorId')),
                (0, util_1.modifier)(this.db, eb.ref('nit.modifierId')),
            ])
                .executeTakeFirstOrThrow();
            const items = yield this.db
                .withRecursive('template_tree', (db) => db
                .selectFrom('newsletter_item_template_data')
                .select(['data', 'id', 'parentId', 'nextId', 'prevId', 'templateId'])
                .where((eb) => eb('templateId', '=', id).and('parentId', 'is', null))
                .unionAll(db
                .selectFrom('newsletter_item_template_data as nitd')
                .select([
                'nitd.data',
                'nitd.id',
                'nitd.parentId',
                'nitd.nextId',
                'nitd.prevId',
                'nitd.templateId',
            ])
                .innerJoin('template_tree', 'nitd.parentId', 'template_tree.id')))
                .selectFrom('template_tree')
                .selectAll()
                .execute();
            return {
                id: template.id,
                name: template.name,
                meta: {
                    created: template.created,
                    modified: template.modified,
                    creator: template.creator,
                    modifier: template.modifier,
                },
                items: items.map((i) => (Object.assign(Object.assign({}, i), { data: lodash_1.default.get(i, ['data']) }))),
            };
        });
    }
};
exports.NewsletterItemTemplateDAO = NewsletterItemTemplateDAO;
exports.NewsletterItemTemplateDAO = NewsletterItemTemplateDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.DBClient)),
    tslib_1.__metadata("design:paramtypes", [Object])
], NewsletterItemTemplateDAO);
//# sourceMappingURL=newsletter-item-template.js.map