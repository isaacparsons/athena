import _ from 'lodash';
import {
  Connection as DBConnection,
  Transaction,
  SelectLocation,
  SelectNewsletterItem,
  SelectNewsletterItemMedia,
  SelectNewsletterItemText,
  SelectUser,
} from '../db';

import { LocationDAO, NewsletterItemDetailsDAO } from '.';
import {
  CreateNewsletterItemBatchInput,
  CreateNewsletterItemInput,
  DeleteManyNewsletterItemsInput,
  UpdateNewsletterItemInput,
  ReadNewsletterItemTreeInput,
  NewsletterItemBase,
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
  NewsletterItem,
} from '@athena/athena-common';
import {
  location,
  newsletterItemDetailsMedia,
  newsletterItemDetailsText,
  creator,
  modifier,
} from '../util';

type MappedItem = Omit<
  SelectNewsletterItem,
  'locationId' | 'creatorId' | 'modifierId'
> & {
  location: SelectLocation | null;
  mediaDetails: SelectNewsletterItemMedia | null;
  textDetails: SelectNewsletterItemText | null;
  creator: SelectUser;
  modifier: SelectUser | null;
};

export const mapNewsletterItem = (item: MappedItem) => ({
  id: item.id,
  newsletterId: item.newsletterId,
  meta: {
    created: item.created,
    modified: item.modified,
    creator: item.creator,
    modifier: item.modifier,
  },
  location: mapLocation(item.location),
  date: item.date,
  title: item.title,
  parentId: item.parentId,
  nextItemId: item.nextItemId,
  previousItemId: item.previousItemId,
  details: mapNewsletterItemDetails(item.mediaDetails, item.textDetails),
});

const mapLocation = (location: SelectLocation | null) =>
  location
    ? {
        id: location.id,
        name: location.name,
        country: location.countryCode,
        position:
          location.lattitude && location.longitude
            ? {
                lattitude: location.lattitude,
                longitude: location.longitude,
              }
            : null,
      }
    : null;

const mapNewsletterItemDetails = (
  media: NewsletterItemDetailsMedia | null,
  text: NewsletterItemDetailsText | null
) => {
  if (media)
    return {
      id: media.id,
      name: media.name,
      type: media.type,
      fileName: media.fileName,
      caption: media.caption,
    };
  if (text)
    return {
      id: text.id,
      name: text.name,
      type: text.type,
      description: text.description,
      link: text.link,
    };
};

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
        await new NewsletterItemDetailsDAO(trx).post(createdNewsletterItem.id, details);
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
          return [item.temp.id, res.id] as [string, number];
        })
      );

      const parentBatchItems = Array.from(
        input.batch.filter((i) => i.temp.parentId === null)
      );

      const tempIdRealIdMap = new Map<string, number>(tuples);
      const firstItemTemp = parentBatchItems.find((i) => i.temp.prevId === null);
      const lastItemTemp = parentBatchItems.find((i) => i.temp.nextId === null);

      if (!firstItemTemp || !lastItemTemp)
        throw new Error('there must be a first item and a last item');

      const getRealId = (id: string | null) => {
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
                item.temp.nextId == lastItemTemp.temp.id
                  ? input.nextItemId
                  : getRealId(item.temp.nextId),
              previousItemId:
                item.temp.prevId == firstItemTemp.temp.id
                  ? input.previousItemId
                  : getRealId(item.temp.prevId),
            })
            .returning('id')
            .where('newsletter_item.id', '=', getRealId(item.temp.id))
            .executeTakeFirstOrThrow()
        )
      );
    });
  }

  async get(id: number): Promise<NewsletterItem> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const parentItem = await trx
        .selectFrom('newsletter_item')
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
          newsletterItemDetailsMedia(this.db, eb.ref('newsletter_item.id')),
          newsletterItemDetailsText(this.db, eb.ref('newsletter_item.id')),
          location(this.db, eb.ref('newsletter_item.locationId')),
          creator(this.db, eb.ref('newsletter_item.creatorId')),
          modifier(this.db, eb.ref('newsletter_item.modifierId')),
        ])
        .where(({ or, eb }) =>
          or([eb('newsletter_item.id', '=', id), eb('newsletter_item.parentId', '=', id)])
        )
        .executeTakeFirstOrThrow();

      const children = await trx
        .selectFrom('newsletter_item')
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
          newsletterItemDetailsMedia(this.db, eb.ref('newsletter_item.id')),
          newsletterItemDetailsText(this.db, eb.ref('newsletter_item.id')),
          location(this.db, eb.ref('newsletter_item.locationId')),
          creator(this.db, eb.ref('newsletter_item.creatorId')),
          modifier(this.db, eb.ref('newsletter_item.modifierId')),
        ])
        .where('newsletter_item.parentId', '=', parentItem.id)
        .execute();

      return {
        ...mapNewsletterItem(parentItem),
        children: children.map(mapNewsletterItem),
      };
    });
  }

  // async getTree(input: ReadNewsletterItemTreeInput): Promise<NewsletterItemBase[]> {
  //   const result: MappedItem[] = await this.db
  //     .withRecursive('newsletter_items_tree', (db) =>
  //       db
  //         .selectFrom('newsletter_item as ni1')
  //         .select((eb) => [
  //           'id',
  //           'newsletterId',
  //           'title',
  //           'date',
  //           'parentId',
  //           'nextItemId',
  //           'previousItemId',
  //           'created',
  //           'modified',
  //           newsletterItemDetailsMedia(this.db, eb.ref('ni1.id')),
  //           newsletterItemDetailsText(this.db, eb.ref('ni1.id')),
  //           location(this.db, eb.ref('ni1.locationId')),
  //           creator(this.db, eb.ref('ni1.creatorId')),
  //           modifier(this.db, eb.ref('ni1.modifierId')),
  //         ])
  //         .where('ni1.parentId', input.parentId ? '=' : 'is', input.parentId)
  //         .unionAll(
  //           db
  //             .selectFrom('newsletter_item as ni2')
  //             .select((eb) => [
  //               'id',
  //               'newsletterId',
  //               'title',
  //               'date',
  //               'parentId',
  //               'nextItemId',
  //               'previousItemId',
  //               'created',
  //               'modified',
  //               newsletterItemDetailsMedia(this.db, eb.ref('ni2.id')),
  //               newsletterItemDetailsText(this.db, eb.ref('ni2.id')),
  //               location(this.db, eb.ref('ni2.locationId')),
  //               creator(this.db, eb.ref('ni2.creatorId')),
  //               modifier(this.db, eb.ref('ni2.modifierId')),
  //             ])
  //             .innerJoin(
  //               'newsletter_items_tree',
  //               'ni2.id',
  //               'newsletter_items_tree.parentId'
  //             )
  //         )
  //     )
  //     .selectFrom('newsletter_items_tree')
  //     .selectAll()
  //     .execute();

  //   return result.map(mapNewsletterItem);
  // }

  async update(userId: number, input: UpdateNewsletterItemInput) {
    const newsletterItemUpdate = _.omit(input, ['location', 'newsletterItemId']);
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
