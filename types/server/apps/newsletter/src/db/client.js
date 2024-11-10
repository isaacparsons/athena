"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManagerClient = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_config_1 = require("../inversify.config");
const db_1 = require("@athena/db");
const types_1 = require("../types/types");
const nanoid_1 = require("nanoid");
const common_1 = require("@athena/common");
const newsletterDAO = inversify_config_1.container.get(types_1.TYPES.INewsletterDAO);
const newsletterItemsDAO = inversify_config_1.container.get(types_1.TYPES.INewsletterItemDAO);
const dbClient = inversify_config_1.container.get(types_1.TYPES.DBClient);
class DBManagerClient {
    constructor() {
        this.tables = [
            new db_1.LocationTableClient(dbClient, db_1.TABLE_NAMES.LOCATION),
            new db_1.CountryTableClient(dbClient, db_1.TABLE_NAMES.COUNTRY),
            new db_1.UserTableClient(dbClient, db_1.TABLE_NAMES.USER),
            new db_1.FederatedCredentialTableClient(dbClient, db_1.TABLE_NAMES.FEDEREATED_CREDENTIAL),
            new db_1.NewsletterTableClient(dbClient, db_1.TABLE_NAMES.NEWSLETTER),
            new db_1.UserNewsletterTableClient(dbClient, db_1.TABLE_NAMES.USER_NEWSLETTER),
            new db_1.NewsletterItemTableClient(dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM),
            new db_1.NewsletterItemMediaTableClient(dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_MEDIA),
            new db_1.NewsletterItemTextTableClient(dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEXT),
            new db_1.NewsletterItemContainerTableClient(dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_CONTAINER),
            new db_1.NewsletterItemTemplateTableClient(dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE),
            new db_1.NewsletterItemTemplateDataTableClient(dbClient, db_1.TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE_DATA),
            new db_1.UserTemplateTableClient(dbClient, db_1.TABLE_NAMES.USER_TEMPLATE),
        ];
    }
    createTables() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.tables.length; i++) {
                yield this.tables[i].createTable();
            }
        });
    }
    dropTables() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.tables.length; i++) {
                yield this.tables[i].deleteTable();
            }
        });
    }
    seed() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('seeding...');
            const user = yield dbClient
                .insertInto('user')
                .values({
                firstName: 'SUPER',
                lastName: 'USER',
                email: 'isaac.2962@gmail.com',
            })
                .returningAll()
                .executeTakeFirstOrThrow();
            console.log('user created!');
            console.log(user);
            const newsletterId = yield newsletterDAO.post(user.id, {
                name: 'Monthly Newsletter',
                startDate: new Date(2024, 1, 1).toISOString(),
                endDate: new Date(2024, 1, 30).toISOString(),
            });
            console.log('newsletter created!');
            console.log(newsletterId);
            const movieReviewId = (0, nanoid_1.nanoid)();
            const movieReviewRatingId = (0, nanoid_1.nanoid)();
            const movieReviewThoughtsId = (0, nanoid_1.nanoid)();
            const movieReview = {
                title: 'Movie Review',
                newsletterId,
                temp: {
                    id: movieReviewId,
                    parentId: null,
                    nextId: null,
                    prevId: null,
                },
                details: {
                    type: common_1.NewsletterItemTypeName.Container,
                    name: 'Movie Review',
                },
            };
            const movieReviewThoughts = {
                title: 'Thoughts',
                newsletterId,
                temp: {
                    id: movieReviewThoughtsId,
                    parentId: movieReviewId,
                    nextId: movieReviewRatingId,
                    prevId: null,
                },
                details: {
                    type: common_1.NewsletterItemTypeName.Text,
                    name: 'It was pretty good',
                },
            };
            const movieReviewRating = {
                title: 'Rating',
                newsletterId,
                temp: {
                    id: movieReviewRatingId,
                    parentId: movieReviewId,
                    nextId: null,
                    prevId: movieReviewThoughtsId,
                },
                details: {
                    type: common_1.NewsletterItemTypeName.Text,
                    name: '7/10',
                },
            };
            const inputBatch = {
                newsletterId,
                parentId: null,
                nextItemId: null,
                previousItemId: null,
                batch: [movieReview, movieReviewThoughts, movieReviewRating],
            };
            const ids = yield newsletterItemsDAO.postBatch(user.id, inputBatch);
        });
    }
}
exports.DBManagerClient = DBManagerClient;
// Monthly newsletter
// kitty of the month
//  - photo
//  - winner
//  - summary of why they won
// movie review
//  - link to the movie
//  - rating
//  - thoughts
//
//# sourceMappingURL=client.js.map