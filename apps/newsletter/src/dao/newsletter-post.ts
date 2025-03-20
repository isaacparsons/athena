import _ from 'lodash';
import 'reflect-metadata';
import {
  Database,
  DBConnection,
  jsonObjectFrom,
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
  // CreateNewsletterPostsBatch,
  UpdateNewsletterPost,
  NodePosition,
  NodePositionInput,
  isNumberOrNull,
  TempNodePosition,
  areDefinedOrNull,
} from '@athena/common';
import {
  location,
  newsletterPostDetailsMedia,
  newsletterPostDetailsText,
  newsletterPostDetailsContainer,
  selectEntityColumns,
} from '../util';
import { inject, injectable, injectFromBase } from 'inversify';
import { TYPES } from '../types/types';
import { NewsletterPost } from '../types/db';
import {
  mapLocation,
  mapMeta,
  mapNewsletterPostDetails,
  mapPosition,
} from './mapping';
import { IGCSManager } from '@athena/services';
import { EntityDAO, EntityMetaRow, IEntityDAO } from './entity';
import { Expression, expressionBuilder, Selectable } from 'kysely';

export type NewsletterPostRow = EntityMetaRow &
  Omit<Selectable<NewsletterPost>, 'modifierId' | 'creatorId' | 'locationId'> & {
    mediaDetails: SelectNewsletterPostMedia | null;
    textDetails: SelectNewsletterPostText | null;
    containerDetails: SelectNewsletterPostContainer | null;
    location: SelectLocation | null;
    children: Omit<NewsletterPostRow, 'children'>[];
  };

export type INewsletterPostDAO = IEntityDAO<
  NewsletterPostRow,
  NewsletterPostEntity
> & {
  deleteMany(input: DeleteBatchInput): Promise<void>;
  create(userId: number, input: CreateNewsletterPost): Promise<number>;
  // createBatch(userId: number, input: CreateNewsletterPostsBatch): Promise<number[]>;
  get(id: number): Promise<NewsletterPostEntity>;
  getByNewsletterId(id: number): Promise<Omit<NewsletterPostEntity, 'children'>[]>;
  update(userId: number, input: UpdateNewsletterPost): Promise<number>;
};

@injectable()
@injectFromBase()
export class NewsletterPostDAO
  extends EntityDAO<'newsletter_post', NewsletterPostRow, NewsletterPostEntity>
  implements INewsletterPostDAO
{
  tableName = 'newsletter_post' as any;
  constructor(
    @inject(TYPES.DBClient) readonly db: DBConnection,
    @inject(TYPES.ILocationDAO) readonly locationDAO: ILocationDAO,
    @inject(TYPES.IGCSManager) readonly gcs: IGCSManager,
    @inject(TYPES.INewsletterPostDetailsDAO)
    readonly newsletterItemDetailsDAO: INewsletterPostDetailsDAO
  ) {
    super();
  }

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
          const post = await trx
            .selectFrom('newsletter_post')
            .where('id', '=', id)
            .select(['id', 'nextId', 'prevId'])
            .executeTakeFirstOrThrow();

          // update item that has nextId = id to have nextId = item's nextId
          await trx
            .updateTable('newsletter_post')
            .set({ nextId: post.nextId })
            .where('nextId', '=', id)
            .execute();

          // update item that has previousId = id to have previousId = item's previousId
          await trx
            .updateTable('newsletter_post')
            .set({ prevId: post.prevId })
            .where('prevId', '=', id)
            .execute();

          await trx
            .deleteFrom('newsletter_post')
            .where('id', '=', id)
            .executeTakeFirstOrThrow();
        })
      );
    });
  }

  private async updateNodePositions(
    db: DBConnection,
    id: number,
    position: NodePosition
  ) {
    const { parentId } = position;
    const nextId = _.get(position, ['nextId']);
    if (nextId !== undefined) {
      await db
        .updateTable('newsletter_post')
        .set({ nextId: id })
        .where(({ and, eb }) =>
          and([
            eb('nextId', nextId === null ? 'is' : '=', nextId),
            eb('parentId', parentId === null ? 'is' : '=', parentId),
            eb('id', '!=', id),
          ])
        )
        .executeTakeFirst();
    }
    const prevId = _.get(position, ['prevId']);
    if (prevId !== undefined) {
      await db
        .updateTable('newsletter_post')
        .set({ prevId: id })
        .where(({ and, eb }) =>
          and([
            eb('prevId', prevId === null ? 'is' : '=', prevId),
            eb('parentId', parentId === null ? 'is' : '=', parentId),
            eb('id', '!=', id),
          ])
        )
        .executeTakeFirst();
    }
  }

  private async getNeighbours(
    db: DBConnection,
    newsletterId: number,
    position: Omit<NodePosition, 'prevId'>
  ) {
    const { nextId, parentId } = position;
    const prev = await db
      .selectFrom('newsletter_post')
      .where(({ eb, and }) =>
        and([
          eb('nextId', nextId === null ? 'is' : '=', nextId),
          eb('parentId', parentId === null ? 'is' : '=', parentId),
          eb('newsletterId', '=', newsletterId),
        ])
      )
      .select(['id'])
      .executeTakeFirst();

    return { prevId: prev === undefined ? null : prev.id, nextId };
  }

  private async createChildNodes(
    db: DBConnection,
    userId: number,
    parentNodeId: number,
    nodes: Pick<CreateNewsletterPost, 'children'>['children']
  ) {
    const n1 = await Promise.all(
      nodes.map(async (n) => {
        const locationId = n.location
          ? await new LocationDAO(db).post(n.location)
          : null;
        return { ...n, locationId };
      })
    );

    const map = await Promise.all(
      n1.map<Promise<[string, number]>>(async (n) => {
        const { id } = await this.postEntities(db, userId, [
          {
            ..._.omit(n, ['details', 'tempPosition', 'location']),
            nextId: null,
            prevId: null,
            parentId: null,
          },
        ])
          .returning('id')
          .executeTakeFirstOrThrow();

        await new NewsletterPostDetailsDAO(db).post(id, n.details);

        return [n.tempPosition.id, id];
      })
    );
    const idMap = new Map(map);

    const getRealPosition = (
      pos: TempNodePosition
    ): NodePosition & { id: number } => {
      const id = idMap.get(pos.id);
      const parentId = _.isNull(pos.parentId)
        ? parentNodeId
        : idMap.get(pos.parentId);
      const nextId = _.isNull(pos.nextId) ? null : idMap.get(pos.nextId);
      const prevId = _.isNull(pos.prevId) ? null : idMap.get(pos.prevId);

      if (
        !_.isUndefined(id) &&
        !_.isUndefined(parentId) &&
        !_.isUndefined(nextId) &&
        !_.isUndefined(prevId)
      )
        return { id, parentId, nextId, prevId };

      throw new Error('error');
    };

    await Promise.all(
      nodes.map(async (n) => {
        const realPos = getRealPosition(n.tempPosition);
        await this.updateEntity(
          db,
          userId,
          realPos.id,
          _.omit(realPos, ['id'])
        ).executeTakeFirstOrThrow();
      })
    );
  }

  async create(userId: number, input: CreateNewsletterPost) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const locationId = input.location
        ? await new LocationDAO(trx).post(input.location)
        : null;
      const { details, position, newsletterId, title, date, children } = input;
      const { parentId } = position;

      const { prevId, nextId } = await this.getNeighbours(
        trx,
        newsletterId,
        position
      );

      const { id } = await this.postEntities(trx, userId, [
        {
          title,
          date,
          locationId,
          newsletterId,
          nextId,
          prevId,
          parentId,
        },
      ])
        .returning('id')
        .executeTakeFirstOrThrow();

      if (nextId !== null)
        await this.updateEntity(trx, userId, nextId, {
          prevId: id,
        }).executeTakeFirstOrThrow();
      if (prevId !== null)
        await this.updateEntity(trx, userId, prevId, {
          nextId: id,
        }).executeTakeFirstOrThrow();

      await new NewsletterPostDetailsDAO(trx).post(id, details);
      await this.createChildNodes(trx, userId, id, children);

      return id;
    });
  }

  async get(id: number): Promise<NewsletterPostEntity> {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const parentItem = await this.selectEntity(trx)
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
          location(trx, eb.ref('locationId')),
        ])
        .where('id', '=', id)
        .executeTakeFirstOrThrow();

      if (parentItem.mediaDetails?.fileName) {
        const signedUrl = await this.gcs.getSignedUrl(
          parentItem.mediaDetails.fileName,
          'read'
        );
        parentItem.mediaDetails.fileName = signedUrl;
      }
      const children = await this.selectEntity(trx)
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
          location(trx, eb.ref('locationId')),
        ])
        .where('parentId', '=', parentItem.id)
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
    const { id, date, location, position, details, newsletterId } = input;
    if (!date && !location && !position && !details)
      throw new Error('no update specified');

    return this.db.transaction().execute(async (trx: Transaction) => {
      return 1;
      // if (details) await new NewsletterPostDetailsDAO(trx).update(details);
      // if (location) await new LocationDAO(trx).update(location);

      // const result = await trx
      //   .updateTable('newsletter_post')
      //   .set({
      //     modified: new Date().toISOString(),
      //     modifierId: userId,
      //     ...(date ? { date } : {}),
      //   })
      //   .where('id', '=', id)
      //   .returningAll()
      //   .executeTakeFirstOrThrow();

      // if (position) {
      //   await trx
      //     .updateTable('newsletter_post')
      //     .set({ nextId: result.nextId })
      //     .where('nextId', '=', id)
      //     .returningAll()
      //     .executeTakeFirstOrThrow();

      //   await trx
      //     .updateTable('newsletter_post')
      //     .set({ prevId: result.prevId })
      //     .where('prevId', '=', id)
      //     .returningAll()
      //     .executeTakeFirstOrThrow();

      //   const { left, right } = await this.getAndVerifyNodes(
      //     trx,
      //     newsletterId,
      //     position
      //   );
      //   await trx
      //     .updateTable('newsletter_post as ni')
      //     .set({ prevId: position.prevId, nextId: position.nextId })
      //     .where('ni.id', '=', id)
      //     .executeTakeFirstOrThrow();

      //   if (right !== null) {
      //     await trx
      //       .updateTable('newsletter_post as ni')
      //       .set({ prevId: id })
      //       .where('ni.id', '=', right.id)
      //       .executeTakeFirstOrThrow();
      //   }

      //   if (left !== null) {
      //     await trx
      //       .updateTable('newsletter_post as ni')
      //       .set({ nextId: id })
      //       .where('ni.id', '=', left.id)
      //       .executeTakeFirstOrThrow();
      //   }
      // }
      // return result.id;
    });
  }
}
