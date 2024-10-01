import _ from 'lodash';
import { GCSManager } from '../services/gcs';
import { Connection as DBConnection } from '../types/db';

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
import { location, photoItems, textItems, videoItems } from '../util/db';

// TODO: fix this so its not using my local path
const filePath = '/Users/isaacparsons/Documents/projects/athena/';

export class NewsletterItemDAO {
  storage: GCSManager;
  locationDAO: LocationDAO;

  constructor(
    readonly db: DBConnection,
    storage?: GCSManager,
    locationDAO?: LocationDAO
  ) {
    this.locationDAO = locationDAO ?? new LocationDAO(db);
    this.storage = storage ?? new GCSManager();
  }

  //TODO: fix this, shoudl check if user is part of newsletter
  // async delete(newsletterId: number, newsletterItemId: number) {
  //   await this.db
  //     .selectFrom('userNewsletter as un')
  //     .innerJoin('user as u', 'u.id', 'un.userId')
  //     .where('un.newsletterId', '=', newsletterId)
  //     .selectAll()
  //     .executeTakeFirstOrThrow(
  //       () => new Error(`must be a member of the newsletter to delete an item`)
  //     );

  //   await this.db
  //     .deleteFrom('newsletterItem')
  //     .where('id', '=', newsletterItemId)
  //     .execute();
  // }

  // async post(
  //   userId: number,
  //   locationInput: NewLocation,
  //   newsletterItemInput: CreateNewsletterItemBaseInput & {
  //     newsletterId: number;
  //   },
  //   detailsInput: ItemDetailsInput
  // ) {
  //   return this.db.transaction().execute(async (trx: DBTransaction) => {
  //     const location = await new LocationDAO(trx).post(locationInput);
  //     const details = await this.handleCreateItemDetails(trx, detailsInput);
  //     return trx
  //       .insertInto('newsletterItem')
  //       .values({
  //         created: new Date().toISOString(),
  //         creatorId: userId,
  //         newsletterItemDetailsId: details.id,
  //         locationId: location.id,
  //         ...newsletterItemInput,
  //       })
  //       .returningAll()
  //       .executeTakeFirstOrThrow();
  //   });
  // }

  // async get(newsletterId: number) {
  //   const photoItems = await this.handleReadPhotoItems(newsletterId);
  //   const videoItems = await this.handleReadVideoItems(newsletterId);
  //   const textItems = await this.handleReadTextItems(newsletterId);

  //   return [...photoItems, ...videoItems, ...textItems];
  // }

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
