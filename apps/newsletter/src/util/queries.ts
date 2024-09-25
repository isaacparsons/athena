import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { DBConnection } from '../db/db';
import { Expression } from 'kysely';

export const location = (db: DBConnection, id: Expression<number | null>) => {
  return jsonObjectFrom(
    db
      .selectFrom('location as l')
      .select(['l.id', 'l.name', 'l.countryCode', 'l.longitude', 'l.lattitude'])
      .whereRef('l.id', '=', id)
  );
};

export const photoItems = (
  db: DBConnection,
  newsletterItemId: Expression<number>
) => {
  return jsonObjectFrom(
    db
      .selectFrom('newsletterItemPhoto as nip')
      .select(({ ref }) => [
        'nip.id',
        'nip.link',
        'nip.name',
        'nip.name',
        'nip.caption',
        'nip.format',
        'nip.size',
        location(db, ref('nip.locationId')).as('location'),
      ])
      .whereRef('nip.newsletterItemId', '=', newsletterItemId)
  );
};
