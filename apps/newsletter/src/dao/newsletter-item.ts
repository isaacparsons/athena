import _ from 'lodash';
import 'reflect-metadata';
import {
  DBConnection,
  Transaction,
  SelectLocation,
  SelectNewsletterItem,
  SelectNewsletterItemMedia,
  SelectNewsletterItemText,
  SelectUser,
} from '../db';

import {
  ILocationDAO,
  INewsletterItemDetailsDAO,
  LocationDAO,
  NewsletterItemDetailsDAO,
} from '.';
import {
  CreateNewsletterItemBatchInput,
  CreateNewsletterItemInput,
  DeleteManyNewsletterItemsInput,
  UpdateNewsletterItemInput,
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
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';

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
      format: media.format,
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

export interface INewsletterItemDAO {
  deleteMany(input: DeleteManyNewsletterItemsInput): Promise<void>;
  post(userId: number, input: CreateNewsletterItemInput): Promise<number>;
  postBatch(
    userId: number,
    input: CreateNewsletterItemBatchInput
  ): Promise<number[]>;
  get(id: number): Promise<NewsletterItem>;
  update(userId: number, input: UpdateNewsletterItemInput): Promise<void>;
}

@injectable()
export class NewsletterItemDAO implements INewsletterItemDAO {
  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.ILocationDAO) readonly locationDAO: ILocationDAO,
    @inject(TYPES.INewsletterItemDetailsDAO)
    readonly newsletterItemDetailsDAO: INewsletterItemDetailsDAO
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
      const locationId = await new LocationDAO(trx).post(input.location);
      const details = input.details;

      const createdNewsletterItem = await trx
        .insertInto('newsletter_item')
        .values({
          ..._.omit(input, ['location', 'details']),
          locationId: locationId,
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

      const res = await Promise.all(
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
      return res.map((r) => r.id);
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
          or([
            eb('newsletter_item.id', '=', id),
            eb('newsletter_item.parentId', '=', id),
          ])
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
