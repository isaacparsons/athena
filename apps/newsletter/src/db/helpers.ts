import {
  DB,
  DBConnection,
  EntityTableName,
  Expression,
  jsonObjectFrom,
} from '@backend/types';
import { expressionBuilder, RawBuilder } from 'kysely';
import { NewsletterMember } from '@athena/common';

export const newsletterMember = (
  newsletterId: Expression<number>,
  userId: Expression<number>
) => {
  const eb = expressionBuilder<DB, 'user_newsletter' | 'user'>();
  return jsonObjectFrom(
    eb
      .selectFrom('user_newsletter as un')
      .where(({ and, eb }) =>
        and([eb('un.newsletterId', '=', newsletterId), eb('un.userId', '=', userId)])
      )
      .innerJoin('user', 'user.id', 'un.userId')
      .select([
        'un.role',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
      ])
  ).$notNull() as RawBuilder<NewsletterMember>;
};

export const newsletterPostDetailsMedia = (
  db: DBConnection,
  id: Expression<number>
) =>
  jsonObjectFrom(
    db
      .selectFrom('newsletter_post_media')
      .selectAll()
      .whereRef(`newsletter_post_media.newsletterPostId`, '=', id)
  ).as('mediaDetails');

export const newsletterPostDetailsText = (
  db: DBConnection,
  id: Expression<number>
) =>
  jsonObjectFrom(
    db
      .selectFrom('newsletter_post_text')
      .selectAll()
      .whereRef('newsletter_post_text.newsletterPostId', '=', id)
  ).as('textDetails');

export const location = (db: DBConnection, id: Expression<number | null>) =>
  jsonObjectFrom(
    db.selectFrom('location').selectAll().whereRef(`location.id`, '=', id)
  ).as('location');

export const creator = (db: DBConnection, id: Expression<number>) =>
  jsonObjectFrom(
    db.selectFrom('user').selectAll().whereRef('user.id', '=', id)
  ).$notNull();

export const modifier = (db: DBConnection, id: Expression<number | null>) =>
  jsonObjectFrom(db.selectFrom('user').selectAll().whereRef('user.id', '=', id));

export const owner = (db: DBConnection, id: Expression<number>) =>
  jsonObjectFrom(
    db.selectFrom('user').selectAll().whereRef(`user.id`, '=', id)
  ).$notNull();

export const selectEntityColumns = <T extends EntityTableName>(
  db: DBConnection,
  tableName: T
) =>
  db.selectFrom(tableName).select([
    `id`,
    `created`,
    `modified`,
    jsonObjectFrom(
      db
        .selectFrom('user')
        .selectAll()
        .whereRef('user.id', '=', db.dynamic.ref(`${tableName}.creatorId`))
    )
      .$notNull()
      .as('creator'),
    jsonObjectFrom(
      db
        .selectFrom('user')
        .selectAll()
        .whereRef('user.id', '=', db.dynamic.ref(`${tableName}.modifierId`))
    ).as('modifier'),
  ]);

// export const withEntityColumns = <T extends TableN>(
//   ExpressionBuilder
// ) => {
//   const eb = expressionBuilder<Database, T>();

//   db.selectFrom(tableName).select([
//     `id`,
//     `created`,
//     `modified`,
//     jsonObjectFrom(
//       db
//         .selectFrom('user')
//         .selectAll()
//         .whereRef('user.id', '=', db.dynamic.ref(`${tableName}.creatorId`))
//     )
//       .$notNull()
//       .as('creator'),
//     jsonObjectFrom(
//       db
//         .selectFrom('user')
//         .selectAll()
//         .whereRef('user.id', '=', db.dynamic.ref(`${tableName}.modifierId`))
//     ).as('modifier'),
//   ]);
// }
