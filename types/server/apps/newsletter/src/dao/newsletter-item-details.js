"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterItemDetailsDAO = void 0;
const tslib_1 = require("tslib");
class NewsletterItemDetailsDAO {
    constructor(db) {
        this.db = db;
    }
    get(newsletterItemId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const details = yield this.db
                .selectFrom(['newsletter_item_media as nim', 'newsletter_item_text as nit'])
                .selectAll()
                .where(({ or, eb }) => or([
                eb('nim.newsletterItemId', '=', newsletterItemId),
                eb('nit.newsletterItemId', '=', newsletterItemId),
            ]))
                .executeTakeFirst();
            if (!details)
                return;
            if (details.type === 'text') {
                return {
                    id: details.id,
                    type: 'text',
                    name: details.name,
                    description: details.description,
                    link: details.link,
                };
            }
            if (details.type === 'media') {
                return {
                    id: details.id,
                    type: 'media',
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
            if (!input) {
                return;
            }
            else if (input.type === 'text') {
                return this.db
                    .insertInto('newsletter_item_text')
                    .values(Object.assign(Object.assign({}, input), { newsletterItemId }))
                    .executeTakeFirstOrThrow();
            }
            else if (input.type === 'media') {
                return this.db
                    .insertInto('newsletter_item_media')
                    .values(Object.assign(Object.assign({}, input), { newsletterItemId }))
                    .executeTakeFirstOrThrow();
            }
            else {
                throw new Error('unrecognized item type');
            }
        });
    }
}
exports.NewsletterItemDetailsDAO = NewsletterItemDetailsDAO;
//# sourceMappingURL=newsletter-item-details.js.map