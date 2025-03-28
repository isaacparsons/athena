"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManagerClient = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const inversify_config_1 = require("../inversify.config");
const db_1 = require("@athena/db");
const types_1 = require("../types/types");
// import { nanoid } from 'nanoid';
// import {
//   NewsletterPostPostName,
//   CreateNewsletterPostBatchItem,
// } from '@athena/common';
class DBManagerClient {
    constructor() {
        this.client = inversify_config_1.container.get(types_1.TYPES.DBClient);
        this.newsletterDAO = inversify_config_1.container.get(types_1.TYPES.INewsletterDAO);
        this.newsletterItemsDAO = inversify_config_1.container.get(types_1.TYPES.INewsletterPostDAO);
        this.tables = [
            new db_1.LocationTableClient(this.client, db_1.TABLE_NAMES.LOCATION),
            new db_1.CountryTableClient(this.client, db_1.TABLE_NAMES.COUNTRY),
            new db_1.UserTableClient(this.client, db_1.TABLE_NAMES.USER),
            new db_1.FederatedCredentialTableClient(this.client, db_1.TABLE_NAMES.FEDEREATED_CREDENTIAL),
            new db_1.NewsletterTableClient(this.client, db_1.TABLE_NAMES.NEWSLETTER),
            new db_1.UserNewsletterTableClient(this.client, db_1.TABLE_NAMES.USER_NEWSLETTER),
            new db_1.NewsletterPostTableClient(this.client, db_1.TABLE_NAMES.NEWSLETTER_POST),
            new db_1.NewsletterPostMediaTableClient(this.client, db_1.TABLE_NAMES.NEWSLETTER_POST_MEDIA),
            new db_1.NewsletterPostTextTableClient(this.client, db_1.TABLE_NAMES.NEWSLETTER_POST_TEXT),
            new db_1.NewsletterPostContainerTableClient(this.client, db_1.TABLE_NAMES.NEWSLETTER_POST_CONTAINER),
            // new NewsletterPostTemplateTableClient(
            //   this.client,
            //   TABLE_NAMES.NEWSLETTER_POST_TEMPLATE
            // ),
            // new NewsletterPostTemplateDataTableClient(
            //   this.client,
            //   TABLE_NAMES.NEWSLETTER_POST_TEMPLATE_DATA
            // ),
            // new UserTemplateTableClient(this.client, TABLE_NAMES.USER_TEMPLATE),
        ];
    }
    createTables() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.tables.length; i++) {
                yield this.tables[i].createTable();
            }
            yield this.addCustom();
        });
    }
    dropTables() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.tables.length; i++) {
                yield this.tables[i].deleteTable();
            }
        });
    }
    truncateTables(ignore) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.tables.length; i++) {
                if (!ignore || !ignore.includes(this.tables[i].name))
                    yield this.tables[i].truncateTable();
            }
        });
    }
    addCustom() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.sql) `
      ALTER TABLE newsletter_post
      ADD CONSTRAINT newsletter_post_nextId_fkey
      FOREIGN KEY (${db_1.sql.ref('nextId')}) 
      REFERENCES newsletter_post(id)
      DEFERRABLE INITIALLY DEFERRED
    `.execute(this.client);
            yield (0, db_1.sql) `
      ALTER TABLE newsletter_post
      ADD CONSTRAINT newsletter_post_prevId_fkey
      FOREIGN KEY (${db_1.sql.ref('prevId')}) 
      REFERENCES newsletter_post(id)
      DEFERRABLE INITIALLY DEFERRED
      `.execute(this.client);
        });
    }
    seed() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('seeding...');
            const user = yield this.client
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
            // const newsletterId = await this.newsletterDAO.post(user.id, {
            //   properties: {
            //     name: 'Monthly Newsletter',
            //     dateRange: {
            //       start: new Date(2024, 1, 1).toISOString(),
            //       end: new Date(2024, 1, 30).toISOString(),
            //     },
            //   },
            // });
            // console.log('newsletter created!');
            // console.log(newsletterId);
            // const movieReviewId = nanoid();
            // const movieReviewRatingId = nanoid();
            // const movieReviewThoughtsId = nanoid();
            // const movieReview: CreateNewsletterPostBatchItem<NewsletterPostPostName.Container> =
            // {
            //   title: 'Movie Review',
            //   newsletterId,
            //   temp: {
            //     id: movieReviewId,
            //     parentId: null,
            //     nextId: null,
            //     prevId: null,
            //   },
            //   details: {
            //     type: NewsletterPostPostName.Container,
            //     name: 'Movie Review',
            //   },
            // };
            // const movieReviewThoughts: CreateNewsletterPostBatchItem<NewsletterPostPostName.Text> =
            // {
            //   title: 'Thoughts',
            //   newsletterId,
            //   temp: {
            //     id: movieReviewThoughtsId,
            //     parentId: movieReviewId,
            //     nextId: movieReviewRatingId,
            //     prevId: null,
            //   },
            //   details: {
            //     type: NewsletterPostPostName.Text,
            //     name: 'It was pretty good',
            //   },
            // };
            // const movieReviewRating: CreateNewsletterPostBatchItem<NewsletterPostPostName.Text> =
            // {
            //   title: 'Rating',
            //   newsletterId,
            //   temp: {
            //     id: movieReviewRatingId,
            //     parentId: movieReviewId,
            //     nextId: null,
            //     prevId: movieReviewThoughtsId,
            //   },
            //   details: {
            //     type: NewsletterPostPostName.Text,
            //     name: '7/10',
            //   },
            // };
            // const inputBatch = {
            //   newsletterId,
            //   position: {
            //     parentId: null,
            //     nextId: null,
            //     prevId: null,
            //   },
            //   batch: [movieReview, movieReviewThoughts, movieReviewRating],
            // };
            // const ids = await this.newsletterItemsDAO.postBatch(user.id, inputBatch);
        });
    }
}
exports.DBManagerClient = DBManagerClient;
//# sourceMappingURL=client.js.map