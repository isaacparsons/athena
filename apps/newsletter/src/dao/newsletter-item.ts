import _ from 'lodash';
import {
  Connection as DBConnection,
  jsonObjectFrom,
  Transaction,
} from '../types/db';

import { LocationDAO } from './location';
import {
  CreateNewsletterItemInput,
  DeleteManyNewsletterItemsInput,
  UpdateNewsletterItemInput,
} from '@athena/athena-common';
import { NewsletterItemDetailsDAO } from './newsletter-item-details';
import { mapItems } from './mapping/newsletter-item-mapper';

export class NewsletterItemDAO {
  constructor(
    readonly db: DBConnection,
    readonly locationDAO: LocationDAO,
    readonly newsletterItemDetailsDAO: NewsletterItemDetailsDAO
  ) {}

  async deleteMany(input: DeleteManyNewsletterItemsInput) {
    const { newsletterItemIds } = input;
    return this.db.transaction().execute(async (trx: Transaction) => {
      await newsletterItemIds.reduce(async (deletedItemId, id) => {
        await deletedItemId;

        const item = await trx
          .selectFrom('newsletterItem')
          .where('id', '=', id)
          .select(['id', 'nextItemId', 'previousItemId'])
          .executeTakeFirstOrThrow();

        // update item that has nextId = id to have nextId = item's nextId
        await trx
          .updateTable('newsletterItem')
          .set({
            nextItemId: item.nextItemId,
          })
          .where('nextItemId', '=', id)
          .executeTakeFirstOrThrow();

        // update item that has previousId = id to have previousId = item's previousId
        await trx
          .updateTable('newsletterItem')
          .set({
            previousItemId: item.previousItemId,
          })
          .where('previousItemId', '=', id)
          .executeTakeFirstOrThrow();

        await trx
          .deleteFrom('newsletterItem')
          .where('id', '=', id)
          .executeTakeFirstOrThrow();
        return;
      }, Promise.resolve());
    });
  }

  async post(userId: number, input: CreateNewsletterItemInput) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const location = await new LocationDAO(trx).post(input.location);
      const details = input.details;

      const createdNewsletterItem = await trx
        .insertInto('newsletterItem')
        .values({
          ..._.omit(input, ['location', 'details']),
          locationId: location.id,
          created: new Date().toISOString(),
          creatorId: userId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      if (details) {
        await new NewsletterItemDetailsDAO(trx).post(
          createdNewsletterItem.id,
          details
        );
      }

      await trx
        .updateTable('newsletterItem as ni')
        .set({
          nextItemId: createdNewsletterItem.id,
        })
        .where(({ eb, not, and }) =>
          and([
            eb(
              'ni.nextItemId',
              createdNewsletterItem.nextItemId ? '=' : 'is',
              createdNewsletterItem.nextItemId
            ),
            not(eb('ni.id', '=', createdNewsletterItem.id)),
          ])
        )
        .executeTakeFirstOrThrow();

      await trx
        .updateTable('newsletterItem as ni')
        .set({
          previousItemId: createdNewsletterItem.id,
        })
        .where(({ eb, not, and }) =>
          and([
            eb(
              'ni.previousItemId',
              createdNewsletterItem.previousItemId ? '=' : 'is',
              createdNewsletterItem.previousItemId
            ),
            not(eb('ni.id', '=', createdNewsletterItem.id)),
          ])
        )
        .executeTakeFirstOrThrow();
      return createdNewsletterItem.id;
    });
  }

  async get(id: number) {
    const result = await this.db
      .selectFrom('newsletterItem as ni')
      .select((eb) => [
        'id',
        'newsletterId',
        'title',
        'date',
        'parentId',
        'nextItemId',
        'previousItemId',
        'created',
        'modified',
        jsonObjectFrom(
          eb
            .selectFrom('newsletterItemMedia as media-details')
            .selectAll('media-details')
            .whereRef('media-details.newsletterItemId', '=', 'ni.id')
        ).as('mediaDetails'),
        jsonObjectFrom(
          eb
            .selectFrom('newsletterItemText as text-details')
            .selectAll('text-details')
            .whereRef('text-details.newsletterItemId', '=', 'ni.id')
        ).as('textDetails'),
        jsonObjectFrom(
          eb
            .selectFrom('location')
            .selectAll('location')
            .whereRef('location.id', '=', 'ni.locationId')
        ).as('location'),
        jsonObjectFrom(
          eb
            .selectFrom('user as creator')
            .selectAll('creator')
            .whereRef('creator.id', '=', 'ni.creatorId')
        )
          .$notNull()
          .as('creator'),
        jsonObjectFrom(
          eb
            .selectFrom('user as modifier')
            .selectAll('modifier')
            .whereRef('modifier.id', '=', 'ni.modifierId')
        ).as('modifier'),
      ])
      .where(({ or, eb }) =>
        or([eb('ni.id', '=', id), eb('ni.parentId', '=', id)])
      )
      .execute();

    return mapItems(id, result);
  }

  async update(userId: number, input: UpdateNewsletterItemInput) {
    const newsletterItemUpdate = _.omit(input, [
      'location',
      'newsletterItemId',
    ]);
    return this.db.transaction().execute(async (trx: Transaction) => {
      if (input.nextItemId) {
        const nextItemId = input.nextItemId;
        const existingItem = await trx
          .selectFrom('newsletterItem as ni')
          .selectAll()
          .where('ni.id', '=', input.newsletterItemId)
          .executeTakeFirstOrThrow();

        await trx
          .updateTable('newsletterItem as ni')
          .set({
            nextItemId: existingItem.nextItemId,
          })
          .where('ni.nextItemId', '=', existingItem.id)
          .executeTakeFirst();

        await trx
          .updateTable('newsletterItem as ni')
          .set({
            previousItemId: existingItem.previousItemId,
          })
          .where('ni.previousItemId', '=', existingItem.id)
          .executeTakeFirst();
      }
      await trx
        .updateTable('newsletterItem as ni')
        .set({
          ..._.omitBy(newsletterItemUpdate, _.isUndefined),
          modified: new Date().toISOString(),
          modifierId: userId,
        })
        .where('ni.id', '=', input.newsletterItemId)
        .executeTakeFirstOrThrow();
    });
  }
}
