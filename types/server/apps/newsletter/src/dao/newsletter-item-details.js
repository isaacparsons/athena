"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemDetailsDAO = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
require("reflect-metadata");
const common_1 = require("@athena/common");
const types_1 = require("../types/types");
let NewsletterItemDetailsDAO = class NewsletterItemDetailsDAO {
    constructor(db) {
        this.db = db;
    }
    get(newsletterItemId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const details = yield this.db
                .selectFrom([
                'newsletter_item_media as nim',
                'newsletter_item_text as nit',
                'newsletter_item_container as nic',
            ])
                .selectAll()
                .where(({ or, eb }) => or([
                eb('nim.newsletterItemId', '=', newsletterItemId),
                eb('nit.newsletterItemId', '=', newsletterItemId),
                eb('nic.newsletterItemId', '=', newsletterItemId),
            ]))
                .executeTakeFirst();
            if (!details)
                throw new Error('no details specified');
            if (details.type === common_1.NewsletterItemTypeName.Container) {
                return {
                    id: details.id,
                    type: common_1.NewsletterItemTypeName.Container,
                    name: details.name,
                };
            }
            if (details.type === common_1.NewsletterItemTypeName.Text) {
                return {
                    id: details.id,
                    type: common_1.NewsletterItemTypeName.Text,
                    name: details.name,
                    description: details.description,
                    link: details.link,
                };
            }
            if (details.type === common_1.NewsletterItemTypeName.Media) {
                return {
                    id: details.id,
                    type: common_1.NewsletterItemTypeName.Media,
                    fileName: details.fileName,
                    name: details.name,
                    caption: details.caption,
                };
            }
            throw new Error('unrecognized type');
        });
    }
    post(newsletterItemId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!input)
                return;
            if (input.type === common_1.NewsletterItemTypeName.Text) {
                yield this.db
                    .insertInto('newsletter_item_text')
                    .values(Object.assign(Object.assign({}, input), { newsletterItemId }))
                    .executeTakeFirstOrThrow();
                return;
            }
            if (input.type === common_1.NewsletterItemTypeName.Media) {
                yield this.db
                    .insertInto('newsletter_item_media')
                    .values(Object.assign(Object.assign({}, input), { newsletterItemId }))
                    .executeTakeFirstOrThrow();
                return;
            }
            if (input.type === common_1.NewsletterItemTypeName.Container) {
                yield this.db
                    .insertInto('newsletter_item_container')
                    .values(Object.assign(Object.assign({}, input), { newsletterItemId }))
                    .executeTakeFirstOrThrow();
                return;
            }
            throw new Error('unrecognized item type');
        });
    }
    update(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = input.type === common_1.NewsletterItemTypeName.Text
                ? 'newsletter_item_text'
                : input.type === common_1.NewsletterItemTypeName.Container
                    ? 'newsletter_item_container'
                    : input.type === common_1.NewsletterItemTypeName.Media
                        ? 'newsletter_item_media'
                        : null;
            if (!table)
                throw new Error('unrecognized item type');
            const result = yield this.db
                .updateTable(table)
                .set(input)
                .returning('id')
                .where('id', '=', input.id)
                .executeTakeFirstOrThrow();
            return result.id;
        });
    }
};
exports.NewsletterItemDetailsDAO = NewsletterItemDetailsDAO;
exports.NewsletterItemDetailsDAO = NewsletterItemDetailsDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.TYPES.DBClient)),
    tslib_1.__metadata("design:paramtypes", [Object])
], NewsletterItemDetailsDAO);
//# sourceMappingURL=newsletter-item-details.js.map