"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewsletter = createNewsletter;
exports.createNewsletterItemText = createNewsletterItemText;
exports.createNewsletterItemNode = createNewsletterItemNode;
const tslib_1 = require("tslib");
const db_1 = require("../../db");
function createNewsletter(userId, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return db_1.dbClient.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const newsletter = yield trx
                    .insertInto(db_1.TABLE_NAMES.NEWSLETTER)
                    .values({
                    name: name,
                    created: new Date().toISOString(),
                    creatorId: userId,
                    ownerId: userId,
                    startDate: new Date().toISOString(),
                    endDate: new Date().toISOString(),
                })
                    .returningAll()
                    .executeTakeFirstOrThrow();
                yield trx
                    .insertInto(db_1.TABLE_NAMES.USER_NEWSLETTER)
                    .values({
                    userId: userId,
                    newsletterId: newsletter.id,
                })
                    .returningAll()
                    .executeTakeFirstOrThrow();
                return newsletter;
            }));
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function createNewsletterItemText(itemInput, detailsInput) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return db_1.dbClient.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const item = yield trx
                    .insertInto(db_1.TABLE_NAMES.NEWSLETTER_ITEM)
                    .values(Object.assign({}, itemInput))
                    .returningAll()
                    .executeTakeFirstOrThrow();
                const details = yield trx
                    .insertInto(db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEXT)
                    .values(Object.assign(Object.assign({}, detailsInput), { newsletterItemId: item.id }))
                    .returningAll()
                    .executeTakeFirstOrThrow();
                return item;
            }));
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function createNewsletterItemNode(itemInput) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return db_1.dbClient.transaction().execute((trx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const item = yield trx
                    .insertInto(db_1.TABLE_NAMES.NEWSLETTER_ITEM)
                    .values(itemInput)
                    .returningAll()
                    .executeTakeFirstOrThrow();
                return item;
            }));
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
//# sourceMappingURL=newsletters.js.map