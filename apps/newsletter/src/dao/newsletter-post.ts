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
  UpdateNewsletterPosts,
  NodePosition,
  TempNodePosition,
} from '@athena/common';
import {
  location,
  newsletterPostDetailsMedia,
  newsletterPostDetailsText,
  newsletterPostDetailsContainer,
  selectEntityColumns,
} from '../db/helpers';
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
import { Selectable } from 'kysely';

import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import * as T from 'fp-ts/Task';
import * as A from 'fp-ts/Array';
import * as TE from 'fp-ts/TaskEither';

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
  deleteMany(userId: number, input: DeleteBatchInput): Promise<void>;
  create(userId: number, input: CreateNewsletterPost): Promise<number>;
  // createBatch(userId: number, input: CreateNewsletterPostsBatch): Promise<number[]>;
  get(id: number): Promise<NewsletterPostEntity>;
  getByNewsletterId(id: number): Promise<Omit<NewsletterPostEntity, 'children'>[]>;
  update(userId: number, input: UpdateNewsletterPosts): Promise<number[]>;
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

  // toRow<E extends NewsletterPostEntity>(entity: E){
  //   return {

  //   }
  // }

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
        await this.updateEntity(db, userId, realPos).executeTakeFirstOrThrow();
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
        await this.updateEntity(trx, userId, {
          id: nextId,
          prevId: id,
        }).executeTakeFirstOrThrow();
      if (prevId !== null)
        await this.updateEntity(trx, userId, {
          id: prevId,
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

  async update(userId: number, input: UpdateNewsletterPosts) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      // TODO: should probably verify theyre structure is correct

      const updatePostLocation = (
        post: UpdateNewsletterPosts[number]
      ): O.Option<T.Task<number>> =>
        pipe(
          O.fromNullable(post.location),
          O.map((loc) => () => new LocationDAO(trx).update(loc))
        );

      const updatePostDetail = (
        post: UpdateNewsletterPosts[number]
      ): O.Option<T.Task<number>> =>
        pipe(
          O.fromNullable(post.details),
          O.map((details) => () => new NewsletterPostDetailsDAO(trx).update(details))
        );

      const updatePost = (
        post: UpdateNewsletterPosts[number]
      ): TE.TaskEither<Error, number> =>
        pipe(
          TE.tryCatch(
            () =>
              this.updateEntity(trx, userId, {
                id: post.id,
                title: post.title,
                parentId: post.position?.parentId ?? null,
                nextId: post.position?.nextId ?? null,
                prevId: post.position?.prevId ?? null,
              })
                .returning('id')
                .executeTakeFirstOrThrow(),
            (reason) => new Error(String(reason))
          ),
          TE.map((p) => p.id)
        );

      // update locations
      await pipe(input, A.map(updatePostLocation), A.compact, A.sequence(T.task))();

      // update details
      await pipe(input, A.map(updatePostDetail), A.compact, A.sequence(T.task))();

      const result = await pipe(input, A.traverse(TE.ApplicativePar)(updatePost))();
      if (result._tag === 'Left') {
        throw new Error(`Failed to update some posts: ${result.left.message}`);
      } else {
        return result.right;
      }
    });
  }

  async deleteMany(userId: number, input: DeleteBatchInput) {
    const { ids } = input;
    await this.db.transaction().execute(async (trx: Transaction) => {
      const deletedPosts = await trx
        .deleteFrom('newsletter_post')
        .where('id', 'in', ids)
        .returning(['id', 'nextId', 'prevId', 'parentId', 'newsletterId'])
        .execute();

      // update post with nextId = post.id to have nextId = post.nextId
      // update post with prevId = post.id to have prevId = post.prevId
      await Promise.all(
        deletedPosts.map(async (p) => {
          await trx
            .updateTable('newsletter_post')
            .set({ nextId: p.nextId })
            .where(({ and, eb }) =>
              and([
                eb('nextId', '=', p.id),
                eb('parentId', '=', p.parentId),
                eb('newsletterId', '=', p.newsletterId),
              ])
            )
            .execute();

          await trx
            .updateTable('newsletter_post')
            .set({ prevId: p.prevId })
            .where(({ and, eb }) =>
              and([
                eb('prevId', '=', p.id),
                eb('parentId', '=', p.parentId),
                eb('newsletterId', '=', p.newsletterId),
              ])
            )
            .execute();
        })
      );
    });
  }
}
