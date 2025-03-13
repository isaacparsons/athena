import {
  DBConnection,
  EntityTableName,
  Expression,
  jsonObjectFrom,
} from '@athena/db';

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

export const newsletterPostDetailsContainer = (
  db: DBConnection,
  id: Expression<number>
) =>
  jsonObjectFrom(
    db
      .selectFrom('newsletter_post_container')
      .selectAll()
      .whereRef(`newsletter_post_container.newsletterPostId`, '=', id)
  ).as('containerDetails');

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
