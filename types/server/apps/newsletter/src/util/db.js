"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.modifier = exports.creator = exports.location = exports.newsletterItemDetailsText = exports.newsletterItemDetailsMedia = void 0;
const db_1 = require("../db");
const newsletterItemDetailsMedia = (db, id) => (0, db_1.jsonObjectFrom)(db
    .selectFrom('newsletter_item_media')
    .selectAll()
    .where(`newsletter_item_media.id`, '=', id)).as('mediaDetails');
exports.newsletterItemDetailsMedia = newsletterItemDetailsMedia;
const newsletterItemDetailsText = (db, id) => (0, db_1.jsonObjectFrom)(db
    .selectFrom('newsletter_item_text')
    .selectAll()
    .where(`newsletter_item_text.id`, '=', id)).as('textDetails');
exports.newsletterItemDetailsText = newsletterItemDetailsText;
const location = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('location').selectAll().where(`location.id`, '=', id)).as('location');
exports.location = location;
const creator = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().where(`user.id`, '=', id))
    .$notNull()
    .as('creator');
exports.creator = creator;
const modifier = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().where(`user.id`, '=', id)).as('modifier');
exports.modifier = modifier;
const user = (db, id, label) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().where(`user.id`, '=', id))
    .$notNull()
    .as(label !== null && label !== void 0 ? label : 'user');
exports.user = user;
//# sourceMappingURL=db.js.map