"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectEntityColumns = exports.owner = exports.modifier = exports.creator = exports.location = exports.newsletterItemDetailsText = exports.newsletterItemDetailsContainer = exports.newsletterItemDetailsMedia = void 0;
const db_1 = require("@athena/db");
const newsletterItemDetailsMedia = (db, id) => (0, db_1.jsonObjectFrom)(db
    .selectFrom('newsletter_item_media')
    .selectAll()
    .whereRef(`newsletter_item_media.newsletterItemId`, '=', id)).as('mediaDetails');
exports.newsletterItemDetailsMedia = newsletterItemDetailsMedia;
const newsletterItemDetailsContainer = (db, id) => (0, db_1.jsonObjectFrom)(db
    .selectFrom('newsletter_item_container')
    .selectAll()
    .whereRef(`newsletter_item_container.newsletterItemId`, '=', id)).as('containerDetails');
exports.newsletterItemDetailsContainer = newsletterItemDetailsContainer;
const newsletterItemDetailsText = (db, id) => (0, db_1.jsonObjectFrom)(db
    .selectFrom('newsletter_item_text')
    .selectAll()
    .whereRef('newsletter_item_text.newsletterItemId', '=', id)).as('textDetails');
exports.newsletterItemDetailsText = newsletterItemDetailsText;
const location = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('location').selectAll().whereRef(`location.id`, '=', id)).as('location');
exports.location = location;
const creator = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().whereRef('user.id', '=', id)).$notNull();
exports.creator = creator;
const modifier = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().whereRef('user.id', '=', id));
exports.modifier = modifier;
const owner = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().whereRef(`user.id`, '=', id)).$notNull();
exports.owner = owner;
const selectEntityColumns = (db, tableName) => db.selectFrom(tableName).select([
    `id`,
    `created`,
    `modified`,
    (0, db_1.jsonObjectFrom)(db
        .selectFrom('user')
        .selectAll()
        .whereRef('user.id', '=', db.dynamic.ref(`${tableName}.creatorId`)))
        .$notNull()
        .as('creator'),
    (0, db_1.jsonObjectFrom)(db
        .selectFrom('user')
        .selectAll()
        .whereRef('user.id', '=', db.dynamic.ref(`${tableName}.modifierId`))).as('modifier'),
]);
exports.selectEntityColumns = selectEntityColumns;
//# sourceMappingURL=db.js.map