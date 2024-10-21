import _ from 'lodash';
import {
  Connection as DBConnection,
  jsonObjectFrom,
  Transaction,
} from '../types/db';

import { LocationDAO } from './location';
import {
  CreateNewsletterItemBatchInput,
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
          .selectFrom('newsletter_item')
          .where('id', '=', id)
          .select(['id', 'nextItemId', 'previousItemId'])
          .executeTakeFirstOrThrow();

        // update item that has nextId = id to have nextId = item's nextId
        await trx
          .updateTable('newsletter_item')
          .set({
            nextItemId: item.nextItemId,
          })
          .where('nextItemId', '=', id)
          .executeTakeFirstOrThrow();

        // update item that has previousId = id to have previousId = item's previousId
        await trx
          .updateTable('newsletter_item')
          .set({
            previousItemId: item.previousItemId,
          })
          .where('previousItemId', '=', id)
          .executeTakeFirstOrThrow();

        await trx
          .deleteFrom('newsletter_item')
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
        .insertInto('newsletter_item')
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
        .updateTable('newsletter_item as ni')
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
        .updateTable('newsletter_item as ni')
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
  async postBatch(userId: number, input: CreateNewsletterItemBatchInput) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const tuples = await Promise.all(
        input.batch.map(async (item) => {
          const res = await this.db
            .insertInto('newsletter_item')
            .values({
              ..._.omit(item, ['temp', 'location', 'details']),
              parentId: null,
              nextItemId: null,
              previousItemId: null,
              created: new Date().toISOString(),
              creatorId: userId,
              newsletterId: input.newsletterId,
            })
            .returning('id')
            .executeTakeFirstOrThrow();

          if (item.details) {
            await new NewsletterItemDetailsDAO(trx).post(res.id, item.details);
          }
          return [item.temp.id, res.id] as [number, number];
        })
      );

      const parentBatchItems = Array.from(
        input.batch
          .filter((i) => i.temp.parentId === null)
          .map((i) => i.temp.id)
      );

      const tempIdRealIdMap = new Map<number, number>(tuples);
      const firstItemTempId = Math.min(...parentBatchItems);
      const lastItemTempId = Math.min(...parentBatchItems);

      const getRealId = (id: number | null) => {
        if (!id) return null;
        return tempIdRealIdMap.get(id) ?? null;
      };

      return Promise.all(
        input.batch.map(async (item) =>
          this.db
            .updateTable('newsletter_item')
            .set({
              parentId:
                item.temp.parentId == null
                  ? input.parentId
                  : getRealId(item.temp.parentId),
              nextItemId:
                item.temp.nextItemId == lastItemTempId
                  ? input.nextItemId
                  : getRealId(item.temp.nextItemId),
              previousItemId:
                item.temp.previousItemId == firstItemTempId
                  ? input.previousItemId
                  : getRealId(item.temp.previousItemId),
            })
            .returning('id')
            .where('newsletter_item.id', '=', getRealId(item.temp.id))
            .executeTakeFirstOrThrow()
        )
      );
    });
  }

  async get(id: number) {
    const result = await this.db
      .selectFrom('newsletter_item as ni')
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
            .selectFrom('newsletter_item_media as media-details')
            .selectAll('media-details')
            .whereRef('media-details.newsletterItemId', '=', 'ni.id')
        ).as('mediaDetails'),
        jsonObjectFrom(
          eb
            .selectFrom('newsletter_item_text as text-details')
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
          .selectFrom('newsletter_item as ni')
          .selectAll()
          .where('ni.id', '=', input.newsletterItemId)
          .executeTakeFirstOrThrow();

        await trx
          .updateTable('newsletter_item as ni')
          .set({
            nextItemId: existingItem.nextItemId,
          })
          .where('ni.nextItemId', '=', existingItem.id)
          .executeTakeFirst();

        await trx
          .updateTable('newsletter_item as ni')
          .set({
            previousItemId: existingItem.previousItemId,
          })
          .where('ni.previousItemId', '=', existingItem.id)
          .executeTakeFirst();
      }
      await trx
        .updateTable('newsletter_item as ni')
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
