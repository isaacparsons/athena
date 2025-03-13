import _ from 'lodash';
import 'reflect-metadata';
import {
  DBConnection,
  SelectLocation,
  SelectNewsletterPostContainer,
  SelectNewsletterPostMedia,
  SelectNewsletterPostText,
  Transaction,
} from '@athena/db';

import {
  ILocationDAO,
  INewsletterPostDetailsDAO,
  LocationDAO,
  NewsletterPostDetailsDAO,
} from '@athena/dao';
import {
  NewsletterPost as NewsletterPostEntity,
  DeleteBatchInput,
  CreateNewsletterPost,
  CreateNewsletterPostsBatch,
  UpdateNewsletterPost,
} from '@athena/common';
import {
  location,
  newsletterPostDetailsMedia,
  newsletterPostDetailsText,
  newsletterPostDetailsContainer,
  selectEntityColumns,
} from '../util';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { NewsletterPost } from '../types/db';
import {
  mapLocation,
  mapMeta,
  mapNewsletterPostDetails,
  mapPosition,
} from './mapping';
import { IGCSManager } from '@athena/services';
import { EntityDAO, EntityMetaRow } from './entity';
import { Selectable } from 'kysely';

export type NewsletterPostRow = EntityMetaRow &
  Omit<Selectable<NewsletterPost>, 'modifierId' | 'creatorId' | 'locationId'> & {
    mediaDetails: SelectNewsletterPostMedia | null;
    textDetails: SelectNewsletterPostText | null;
    containerDetails: SelectNewsletterPostContainer | null;
    location: SelectLocation | null;
    children: Omit<NewsletterPostRow, 'children'>[];
  };

export type INewsletterPostDAO = EntityDAO<
  NewsletterPostRow,
  NewsletterPostEntity
> & {
  deleteMany(input: DeleteBatchInput): Promise<void>;
  post(userId: number, input: CreateNewsletterPost): Promise<number>;
  postBatch(userId: number, input: CreateNewsletterPostsBatch): Promise<number[]>;
  get(id: number): Promise<NewsletterPostEntity>;
  getByNewsletterId(id: number): Promise<Omit<NewsletterPostEntity, 'children'>[]>;
  update(userId: number, input: UpdateNewsletterPost): Promise<number>;
};

@injectable()
export class NewsletterPostDAO implements INewsletterPostDAO {
  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.ILocationDAO) readonly locationDAO: ILocationDAO,
    @inject(TYPES.IGCSManager) readonly gcs: IGCSManager,
    @inject(TYPES.INewsletterPostDetailsDAO)
    readonly newsletterItemDetailsDAO: INewsletterPostDetailsDAO
  ) {}

  private mapItem(row: Omit<NewsletterPostRow, 'children'>) {
    return {
      id: row.id,
      newsletterId: row.newsletterId,
      meta: mapMeta(row),
      position: mapPosition(row),
      location: mapLocation(row),
      date: _.isNull(row.date) ? undefined : row.date,
      title: row.title,
      details: mapNewsletterPostDetails(
        row.mediaDetails,
        row.textDetails,
        row.containerDetails
      ),
    };
  }

  // private withSignedUrls(){}

  toEntity(row: NewsletterPostRow) {
    return {
      ...this.mapItem(row),
      children: row.children.map(this.mapItem),
    };
  }

  async deleteMany(input: DeleteBatchInput) {
    const { ids } = input;
    await this.db.transaction().execute(async (trx: Transaction) => {
      await Promise.all(
        ids.map(async (id) => {
          const item = await trx
            .selectFrom('newsletter_item')
            .where('id', '=', id)
            .select(['id', 'nextId', 'prevId'])
            .executeTakeFirstOrThrow();

          // update item that has nextId = id to have nextId = item's nextId
          await trx
            .updateTable('newsletter_item')
            .set({ nextId: item.nextId })
            .where('nextId', '=', id)
            .execute();

          // update item that has previousId = id to have previousId = item's previousId
          await trx
            .updateTable('newsletter_item')
            .set({ prevId: item.prevId })
            .where('prevId', '=', id)
            .execute();

          await trx
            .deleteFrom('newsletter_item')
            .where('id', '=', id)
            .executeTakeFirstOrThrow();
        })
      );
    });
  }

  async post(userId: number, input: CreateNewsletterPost) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const locationId = input.location
        ? await new LocationDAO(trx).post(input.location)
        : null;
      const details = input.details;

      const createdNewsletterPost = await trx
        .insertInto('newsletter_item')
        .values({
          title: input.title,
          date: input.date,
          locationId,
          created: new Date().toISOString(),
          creatorId: userId,
          newsletterId: input.newsletterId,
          parentId: input.position.parentId,
          nextId: input.position.nextId,
          prevId: input.position.prevId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      if (details) {
        await new NewsletterPostDetailsDAO(trx).post(
          createdNewsletterPost.id,
          details
        );
      }

      await trx
        .updateTable('newsletter_item as ni')
        .set({
          nextId: createdNewsletterPost.id,
        })
        .where(({ eb, not, and }) =>
          and([
            eb(
              'ni.nextId',
              createdNewsletterPost.nextId ? '=' : 'is',
              createdNewsletterPost.nextId
            ),
            not(eb('ni.id', '=', createdNewsletterPost.id)),
          ])
        )
        .executeTakeFirstOrThrow();

      await trx
        .updateTable('newsletter_item as ni')
        .set({
          prevId: createdNewsletterPost.id,
        })
        .where(({ eb, not, and }) =>
          and([
            eb(
              'ni.prevId',
              createdNewsletterPost.prevId ? '=' : 'is',
              createdNewsletterPost.prevId
            ),
            not(eb('ni.id', '=', createdNewsletterPost.id)),
          ])
        )
        .executeTakeFirstOrThrow();
      return createdNewsletterPost.id;
    });
  }

  async postBatch(userId: number, input: CreateNewsletterPostsBatch) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const tuples = await Promise.all(
        input.batch.map(async (item) => {
          const res = await trx
            .insertInto('newsletter_item')
            .values({
              ..._.omit(item, ['temp', 'location', 'details']),
              parentId: null,
              nextId: null,
              prevId: null,
              created: new Date().toISOString(),
              creatorId: userId,
              newsletterId: input.newsletterId,
            })
            .returning('id')
            .executeTakeFirstOrThrow();

          if (item.details) {
            await new NewsletterPostDetailsDAO(trx).post(res.id, item.details);
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
          trx
            .updateTable('newsletter_item')
            .set({
              parentId:
                item.temp.parentId == null
                  ? input.position.parentId
                  : getRealId(item.temp.parentId),
              nextId:
                item.temp.nextId == lastItemTemp.temp.id
                  ? input.position.nextId
                  : getRealId(item.temp.nextId),
              prevId:
                item.temp.prevId == firstItemTemp.temp.id
                  ? input.position.prevId
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

  async get(id: number): Promise<NewsletterPostEntity> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const parentItem = await selectEntityColumns(trx, 'newsletter_post')
        .select((eb) => [
          'id',
          'newsletterId',
          'title',
          'date',
          'parentId',
          'nextId',
          'prevId',
          newsletterPostDetailsMedia(trx, eb.ref('newsletter_post.id')),
          newsletterPostDetailsText(trx, eb.ref('newsletter_post.id')),
          newsletterPostDetailsContainer(trx, eb.ref('newsletter_post.id')),
          location(trx, eb.ref('newsletter_post.locationId')),
        ])
        .where('newsletter_post.id', '=', id)
        .executeTakeFirstOrThrow();

      if (parentItem.mediaDetails?.fileName) {
        const signedUrl = await this.gcs.getSignedUrl(
          parentItem.mediaDetails.fileName,
          'read'
        );
        parentItem.mediaDetails.fileName = signedUrl;
      }
      const children = await selectEntityColumns(trx, 'newsletter_post')
        .select((eb) => [
          'id',
          'newsletterId',
          'title',
          'date',
          'parentId',
          'nextId',
          'prevId',
          newsletterPostDetailsMedia(trx, eb.ref('newsletter_post.id')),
          newsletterPostDetailsText(trx, eb.ref('newsletter_post.id')),
          newsletterPostDetailsContainer(trx, eb.ref('newsletter_post.id')),
          location(trx, eb.ref('newsletter_post.locationId')),
        ])
        .where('newsletter_post.parentId', '=', parentItem.id)
        .execute();

      const childrenWithSignedUrls = await Promise.all(
        children.map(async (child) => {
          if (child.mediaDetails?.fileName) {
            const signedUrl = await this.gcs.getSignedUrl(
              child.mediaDetails.fileName,
              'read'
            );
            return {
              ...child,
              mediaDetails: {
                ...child.mediaDetails,
                fileName: signedUrl,
              },
            };
          }
          return child;
        })
      );

      return this.toEntity({
        ...parentItem,
        children: childrenWithSignedUrls ?? [],
      });
    });
  }

  async getByNewsletterId(
    id: number
  ): Promise<Omit<NewsletterPostEntity, 'children'>[]> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const items = await selectEntityColumns(trx, 'newsletter_post')
        .where('newsletter_post.newsletterId', '=', id)
        .select((eb) => [
          'newsletterId',
          'title',
          'date',
          'parentId',
          'nextId',
          'prevId',
          newsletterPostDetailsMedia(trx, eb.ref('newsletter_post.id')),
          newsletterPostDetailsText(trx, eb.ref('newsletter_post.id')),
          newsletterPostDetailsContainer(trx, eb.ref('newsletter_post.id')),
          location(trx, eb.ref('newsletter_post.locationId')),
        ])
        .execute();
      const itemsWithSignedUrls = await Promise.all(
        items.map(async (child) => {
          if (child.mediaDetails?.fileName) {
            const signedUrl = await this.gcs.getSignedUrl(
              child.mediaDetails.fileName,
              'read'
            );
            return {
              ...child,
              mediaDetails: {
                ...child.mediaDetails,
                fileName: signedUrl,
              },
            };
          }
          return child;
        })
      );
      return Promise.all(
        itemsWithSignedUrls.map(async (i) => {
          const { children, ...rest } = this.toEntity({ ...i, children: [] });
          return rest;
        })
      );
    });
  }

  async update(userId: number, input: UpdateNewsletterPost) {
    const { id, date, location, childPositions, details } = input;
    if (!date && !location && !childPositions && !details)
      throw new Error('no update specified');

    return this.db.transaction().execute(async (trx: Transaction) => {
      if (details) await new NewsletterPostDetailsDAO(trx).update(details);
      if (location) await new LocationDAO(trx).update(location);

      const result = await trx
        .updateTable('newsletter_item')
        .set({
          modified: new Date().toISOString(),
          modifierId: userId,
          ...(date ? { date } : {}),
        })
        .where('id', '=', id)
        .returning('id')
        .executeTakeFirstOrThrow();

      await Promise.all(
        (childPositions ?? []).map((childPosition) =>
          trx
            .updateTable('newsletter_item')
            .set({
              modified: new Date().toISOString(),
              modifierId: userId,
              nextId: childPosition.nextId,
              prevId: childPosition.prevId,
              parentId: childPosition.parentId,
            })
            .where('id', '=', childPosition.id)
            .returning('id')
            .executeTakeFirstOrThrow()
        )
      );

      return result.id;
    });
  }
}
