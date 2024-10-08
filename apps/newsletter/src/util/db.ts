import {
  Connection as DBConnection,
  Expression,
  jsonObjectFrom,
} from '../types/db';

export const user = (db: DBConnection, id: Expression<number>) =>
  jsonObjectFrom(
    db.selectFrom('user').selectAll().whereRef('user.id', '=', id)
  ).$notNull();

export const creator = (db: DBConnection, id: Expression<number>) =>
  jsonObjectFrom(db.selectFrom('user').selectAll().whereRef('user.id', '=', id))
    .$notNull()
    .as('creator');

export const modifier = (db: DBConnection, id: Expression<number | null>) =>
  jsonObjectFrom(
    db.selectFrom('user').selectAll().whereRef('user.id', '=', id)
  ).as('modifier');

export const location = (db: DBConnection, id: Expression<number | null>) => {
  return jsonObjectFrom(
    db.selectFrom('location as l').selectAll().whereRef('l.id', '=', id)
  ).as('location');
};

export const itemDetails = (
  db: DBConnection,
  id: Expression<number | null>
) => {
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
