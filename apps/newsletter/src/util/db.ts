import { Connection, Expression, jsonObjectFrom } from '../db';

export const newsletterItemDetailsMedia = (db: Connection, id: Expression<number>) =>
  jsonObjectFrom(
    db
      .selectFrom('newsletter_item_media')
      .selectAll()
      .where(`newsletter_item_media.id`, '=', id)
  ).as('mediaDetails');

export const newsletterItemDetailsText = (db: Connection, id: Expression<number>) =>
  jsonObjectFrom(
    db
      .selectFrom('newsletter_item_text')
      .selectAll()
      .where(`newsletter_item_text.id`, '=', id)
  ).as('textDetails');

export const location = (db: Connection, id: Expression<number | null>) =>
  jsonObjectFrom(db.selectFrom('location').selectAll().where(`location.id`, '=', id)).as(
    'location'
  );

export const creator = (db: Connection, id: Expression<number>) =>
  jsonObjectFrom(db.selectFrom('user').selectAll().where(`user.id`, '=', id))
    .$notNull()
    .as('creator');

export const modifier = (db: Connection, id: Expression<number | null>) =>
  jsonObjectFrom(db.selectFrom('user').selectAll().where(`user.id`, '=', id)).as(
    'modifier'
  );

export const user = (db: Connection, id: Expression<number | null>, label?: string) =>
  jsonObjectFrom(db.selectFrom('user').selectAll().where(`user.id`, '=', id))
    .$notNull()
    .as(label ?? 'user');
