"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemDetails = exports.location = exports.modifier = exports.creator = exports.user = void 0;
const db_1 = require("../types/db");
const user = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().whereRef('user.id', '=', id)).$notNull();
exports.user = user;
const creator = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().whereRef('user.id', '=', id))
    .$notNull()
    .as('creator');
exports.creator = creator;
const modifier = (db, id) => (0, db_1.jsonObjectFrom)(db.selectFrom('user').selectAll().whereRef('user.id', '=', id)).as('modifier');
exports.modifier = modifier;
const location = (db, id) => {
    return (0, db_1.jsonObjectFrom)(db.selectFrom('location as l').selectAll().whereRef('l.id', '=', id)).as('location');
};
exports.location = location;
const itemDetails = (db, id) => {
    // jsonObjectFrom(
    //   db
    //     .selectFrom(['newsletterItemMedia', 'newsletterItemText'])
    //     .select((eb) => [])
    //     .whereRef()
    //     .where(({ eb, or }) =>
    //       or([
    //         eb('newsletterItemMedia.newsletterItemId', '=', id),
    //         eb('newsletterItemText.newsletterItemId', '=', id),
    //       ])
    //     )
    // ).as('details');
    // .select([
    //   'new_person.id as person_id',
    //   'new_pet.id as pet_id'
    // ])
};
exports.itemDetails = itemDetails;
// export const photoItems = (
//   db: DBConnection,
//   newsletterItemDetailsId: Expression<number>
// ) => {
//   return jsonObjectFrom(
//     db
//       .selectFrom('newsletterItemPhoto as nip')
//       .selectAll()
//       .whereRef('nip.id', '=', newsletterItemDetailsId)
//   );
// };
// export const videoItems = (
//   db: DBConnection,
//   newsletterItemDetailsId: Expression<number>
// ) => {
//   return jsonObjectFrom(
//     db
//       .selectFrom('newsletterItemVideo as niv')
//       .selectAll()
//       .whereRef('niv.id', '=', newsletterItemDetailsId)
//   );
// };
// export const textItems = (
//   db: DBConnection,
//   newsletterItemDetailsId: Expression<number>
// ) => {
//   return jsonObjectFrom(
//     db
//       .selectFrom('newsletterItemText as nit')
//       .selectAll()
//       .whereRef('nit.id', '=', newsletterItemDetailsId)
//   );
// };
//# sourceMappingURL=db.js.map