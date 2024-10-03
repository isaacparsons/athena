import _ from 'lodash';
import { GCSManager } from '../services/gcs';
import {
  Connection as DBConnection,
  jsonArrayFrom,
  Transaction,
} from '../types/db';

import {
  isPhotoItem,
  isTextItem,
  isVideoItem,
  ItemDetailsInput,
  PhotoDetailsInput,
  TextDetailsInput,
  VideoDetailsInput,
} from '../types/server';

import { LocationDAO } from './location';
import fs from 'node:fs';
import { location, photoItems, textItems, user, videoItems } from '../util/db';
import { CreateNewsletterItemInput } from '../types/api';

// TODO: fix this so its not using my local path
const filePath = '/Users/isaacparsons/Documents/projects/athena/';

export class NewsletterItemDAO {
  constructor(
    readonly db: DBConnection,
    readonly locationDAO: LocationDAO,
    readonly storage: GCSManager
  ) {}

  async delete(id: number) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const item = await trx
        .selectFrom('newsletterItem')
        .where('id', '=', id)
        .select(['id', 'nextItemId'])
        .executeTakeFirstOrThrow();

      console.log('existingItem', item);

      await trx
        .updateTable('newsletterItem as prevItem')
        .set({
          nextItemId: item.nextItemId,
        })
        .where('prevItem.nextItemId', '=', id)
        .execute();

      return trx
        .deleteFrom('newsletterItem')
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    });
  }

  async post(userId: number, input: CreateNewsletterItemInput) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const location = await new LocationDAO(trx).post(input.location);
      const createdNewsletterItem = await trx
        .insertInto('newsletterItem')
        .values({
          ..._.omit(input, ['location']),
          locationId: location.id,
          created: new Date().toISOString(),
          creatorId: userId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      const existingItem = await trx
        .selectFrom('newsletterItem as ni')
        .where(({ and, eb }) =>
          and([
            eb(
              'ni.nextItemId',
              input.nextItemId ? '=' : 'is',
              input.nextItemId ?? null
            ),
            eb('ni.parentId', '=', createdNewsletterItem.parentId ?? null),
          ])
        )
        .select(['id', 'nextItemId'])
        .executeTakeFirst();

      if (existingItem) {
        await trx
          .updateTable('newsletterItem')
          .set({
            nextItemId: createdNewsletterItem.id,
            modified: new Date().toISOString(),
            modifierId: userId,
          })
          .where(({ eb, not, and }) =>
            and([
              eb('id', '=', existingItem.id),
              not(eb('id', '=', createdNewsletterItem.id)),
            ])
          )
          .executeTakeFirstOrThrow();
      }

      return createdNewsletterItem.id;
    });
  }

  async get(id: number) {
    return this.db
      .selectFrom('newsletterItem as ni')
      .selectAll()
      .select((eb) =>
        jsonArrayFrom(
          eb
            .selectFrom('newsletterItem as ni2')
            .selectAll('ni2')
            .whereRef('ni2.parentId', '=', 'ni.id')
        ).as('children')
      )
      .where('ni.id', '=', id)
      .executeTakeFirstOrThrow();
  }

  // private async handleReadPhotoItems(newsletterId: number) {
  //   const items = await this.db
  //     .selectFrom('newsletterItem as ni')
  //     .select(({ ref }) => [
  //       'id',
  //       'newsletterId',
  //       'title',
  //       'created',
  //       'modified',
  //       'creatorId',
  //       'modifierId',
  //       'date',
  //       location(this.db, ref('ni.locationId')).as('location'),
  //       photoItems(this.db, ref('ni.id')).as('details'),
  //     ])
  //     .where('ni.newsletterId', '=', newsletterId)
  //     .execute();

  //   const filtered = items.filter(
  //     (
  //       item
  //     ): item is NewsletterItem & {
  //       details: NewsletterItemPhoto;
  //       location: Location;
  //     } => item.details !== null && item.details !== undefined
  //   );
  //   return Promise.all(
  //     filtered.map(async (item) => {
  //       const url = await this.storage.getSignedUrl(item.id.toString());
  //       return {
  //         ...item,
  //         details: {
  //           ...item.details,
  //           url,
  //         },
  //       };
  //     })
  //   );
  // }

  // private async handleReadVideoItems(newsletterId: number) {
  //   const items = await this.db
  //     .selectFrom('newsletterItem as ni')
  //     .select(({ ref }) => [
  //       'id',
  //       'newsletterId',
  //       'title',
  //       'created',
  //       'modified',
  //       'creatorId',
  //       'modifierId',
  //       'date',
  //       location(this.db, ref('ni.locationId')).as('location'),
  //       videoItems(this.db, ref('ni.id')).as('details'),
  //     ])
  //     .where('ni.newsletterId', '=', newsletterId)
  //     .execute();

  //   const filtered = items.filter(
  //     (
  //       item
  //     ): item is NewsletterItem & {
  //       details: NewsletterItemVideo;
  //       location: Location;
  //     } => item.details !== null && item.details !== undefined
  //   );
  //   return Promise.all(
  //     filtered.map(async (item) => {
  //       const url = await this.storage.getSignedUrl(item.id.toString());
  //       return {
  //         ...item,
  //         details: {
  //           ...item.details,
  //           url,
  //         },
  //       };
  //     })
  //   );
  // }

  // private async handleReadTextItems(newsletterId: number) {
  //   const items = await this.db
  //     .selectFrom('newsletterItem as ni')
  //     .select(({ ref }) => [
  //       'id',
  //       'newsletterId',
  //       'title',
  //       'created',
  //       'modified',
  //       'creatorId',
  //       'modifierId',
  //       'date',
  //       location(this.db, ref('ni.locationId')).as('location'),
  //       textItems(this.db, ref('ni.id')).as('details'),
  //     ])
  //     .where('ni.newsletterId', '=', newsletterId)
  //     .execute();

  //   return items.filter(
  //     (
  //       item
  //     ): item is NewsletterItem & {
  //       details: NewsletterItemText;
  //       location: Location;
  //     } => item.details !== null && item.details !== undefined
  //   );
  // }

  // private async handleCreateItemDetails(
  //   db: DBConnection,
  //   input: ItemDetailsInput
  // ) {
  //   if (isPhotoItem(input)) {
  //     return this.handleCreatePhotoItem(db, input);
  //   } else if (isVideoItem(input)) {
  //     return this.handleCreateVideoItem(db, input);
  //   } else if (isTextItem(input)) {
  //     return this.handleCreateTextItem(db, input);
  //   } else {
  //     throw new Error('invalid');
  //   }
  // }

  // private async handleCreatePhotoItem(
  //   db: DBConnection,
  //   input: PhotoDetailsInput
  // ) {
  //   const details = _.omit(input, ['file', 'detailsType']);
  //   const item = await db
  //     .insertInto('newsletterItemPhoto')
  //     .values(details)
  //     .returningAll()
  //     .executeTakeFirstOrThrow();

  //   this.storage.uploadPhoto(
  //     filePath + input.file.path,
  //     `${item.id}.${input.file.mimetype.split('/')[1]}`
  //   );
  //   await fs.promises.unlink(input.file.path);
  //   return item;
  // }

  // private async handleCreateVideoItem(
  //   db: DBConnection,
  //   input: VideoDetailsInput
  // ) {
  //   const details = _.omit(input, ['file', 'detailsType']);
  //   const item = await db
  //     .insertInto('newsletterItemVideo')
  //     .values(details)
  //     .returningAll()
  //     .executeTakeFirstOrThrow();
  //   this.storage.uploadPhoto(
  //     filePath + input.file.path,
  //     `${item.id}.${input.file.mimetype.split('/')[1]}`
  //   );
  //   await fs.promises.unlink(input.file.path);
  //   return item;
  // }

  // private async handleCreateTextItem(
  //   db: DBConnection,
  //   input: TextDetailsInput
  // ) {
  //   const details = _.omit(input, ['detailsType']);
  //   return db
  //     .insertInto('newsletterItemText')
  //     .values(details)
  //     .returningAll()
  //     .executeTakeFirstOrThrow();
  // }
}
