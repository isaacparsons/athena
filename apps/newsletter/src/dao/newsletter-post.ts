import _ from 'lodash';
import 'reflect-metadata';
import {
  DBConnection,
  Transaction,
  INewsletterPostDAO,
  NewsletterPostRow,
  IGCSManager,
} from '@backend/types';
import { LocationDAO, NewsletterPostDetailsDAO } from '@backend/dao';
import {
  NewsletterPost,
  DeleteMany,
  CreateNewsletterPost,
  UpdateManyNewsletterPosts,
  CreateManyNewsletterPosts,
  getChildPosts,
  ReadNewsletterPost,
  fromItemsWithTempPosition,
  UpdateLocation,
  CreateLocation,
  NodePositionInput,
} from '@athena/common';
import {
  location,
  newsletterPostDetailsMedia,
  newsletterPostDetailsText,
  selectEntityColumns,
} from '@backend/db';
import { inject, injectable, injectFromBase } from 'inversify';
import { TYPES, INewsletterPostDetailsDAO, ILocationDAO } from '@backend/types';
import {
  mapLocation,
  mapMeta,
  mapNewsletterPostDetails,
  mapPosition,
} from './mapping';
import { EntityDAO } from './entity';

import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import * as T from 'fp-ts/Task';
import * as A from 'fp-ts/Array';
import * as TE from 'fp-ts/TaskEither';

@injectable()
@injectFromBase()
export class NewsletterPostDAO
  extends EntityDAO<'newsletter_post', NewsletterPostRow, NewsletterPost>
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
      date: _.isNull(row.date) ? null : row.date,
      title: row.title,
      details: mapNewsletterPostDetails(row.mediaDetails, row.textDetails),
    };
  }

  toEntity(row: NewsletterPostRow) {
    return {
      ...this.mapItem(row),
      children: row.children.map(this.mapItem),
    };
  }

  private async getNeighbours<
    T extends { newsletterId: number; position: NodePositionInput }
  >(db: DBConnection, node: T) {
    const { nextId, parentId } = node.position;
    const prev = await db
      .selectFrom('newsletter_post')
      .where(({ eb, and }) =>
        and([
          eb('nextId', nextId === null ? 'is' : '=', nextId),
          eb('parentId', parentId === null ? 'is' : '=', parentId),
          eb('newsletterId', '=', node.newsletterId),
        ])
      )
      .select(['id'])
      .executeTakeFirst();

    return { prevId: prev === undefined ? null : prev.id, nextId };
  }

  private async createChildNodes(
    db: DBConnection,
    userId: number,
    parent: CreateManyNewsletterPosts['posts'][number] & { id: number },
    nodes: CreateManyNewsletterPosts['posts']
  ) {
    const children = getChildPosts(parent.tempPosition.id, nodes);

    const items = await Promise.all(
      children.map(async (n) => {
        const id = await this.create(db, userId, n);
        return { ...n, id };
      })
    );

    const resolvedChildren = fromItemsWithTempPosition([
      {
        ...parent,
        tempPosition: { ...parent.tempPosition, nextId: null, prevId: null },
      },
      ...items,
    ]).filter((p) => p.id !== parent.id);

    await Promise.all(
      resolvedChildren.map(async (n) =>
        this.updateEntity(db, userId, {
          id: n.id,
          ...n.position,
        }).executeTakeFirstOrThrow()
      )
    );
  }

  async create(db: DBConnection, userId: number, input: CreateNewsletterPost) {
    const { location, title, date, details, newsletterId, position } = input;
    const locationId = location ? await new LocationDAO(db).create(location) : null;
    const nextId = _.isUndefined(position?.nextId) ? null : position.nextId;
    const prevId = _.isUndefined(position?.prevId) ? null : position.prevId;
    const parentId = _.isUndefined(position?.parentId) ? null : position.parentId;

    const { id } = await this.postEntities(db, userId, [
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
      await this.updateEntity(db, userId, {
        id: nextId,
        prevId: id,
      }).executeTakeFirstOrThrow();
    if (prevId !== null)
      await this.updateEntity(db, userId, {
        id: prevId,
        nextId: id,
      }).executeTakeFirstOrThrow();

    await new NewsletterPostDetailsDAO(db).create(id, details);

    return id;
  }

  private async createParentNode(
    db: DBConnection,
    userId: number,
    input: CreateNewsletterPost
  ) {
    const position = input.position ?? {
      parentId: null,
      nextId: null,
      prevId: null,
    };
    const { prevId, nextId } = await this.getNeighbours(db, { ...input, position });

    return this.create(db, userId, {
      ...input,
      position: { ...position, nextId, prevId },
    });
  }

  async createMany(userId: number, input: CreateManyNewsletterPosts) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      const { posts } = input;
      const parents = posts.filter((p) => p.tempPosition.parentId === null);
      const ids = [];
      for await (const parent of parents) {
        const id = await this.createParentNode(trx, userId, parent);
        await this.createChildNodes(trx, userId, { ...parent, id }, posts);
        ids.push(id);
      }

      return ids;
    });
  }

  async read(id: number): Promise<ReadNewsletterPost> {
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

  async readByNewsletterId(id: number): Promise<ReadNewsletterPost[]> {
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

  async updateMany(userId: number, input: UpdateManyNewsletterPosts) {
    return this.db.transaction().execute(async (trx: Transaction) => {
      // TODO: should probably verify theyre structure is correct

      const updatePostLocation = (
        post: UpdateManyNewsletterPosts[number]
      ): O.Option<T.Task<number>> =>
        pipe(
          O.fromNullable(post.location),
          O.map((loc) => () => {
            if (_.get(loc, 'id') !== undefined) {
              return new LocationDAO(trx).create(loc as CreateLocation);
            } else {
              return new LocationDAO(trx).update(loc as UpdateLocation);
            }
          })
        );

      const updatePostDetail = (
        post: UpdateManyNewsletterPosts[number]
      ): O.Option<T.Task<number>> =>
        pipe(
          O.fromNullable(post.details),
          O.map(
            (details) => () =>
              new NewsletterPostDetailsDAO(trx).update(post.id, details)
          )
        );

      const updatePost = (
        post: UpdateManyNewsletterPosts[number]
      ): TE.TaskEither<Error, number> =>
        pipe(
          TE.tryCatch(
            () =>
              this.updateEntity(trx, userId, {
                id: post.id,
                title: post.title,
                date: post.date,
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

  async deleteMany(userId: number, input: DeleteMany) {
    const { ids } = input;

    for (const id of ids) {
      await this.db.transaction().execute(async (trx: Transaction) => {
        const { nextId, prevId, parentId, newsletterId } = await trx
          .deleteFrom('newsletter_post')
          .where('id', '=', id)
          .returning(['id', 'nextId', 'prevId', 'parentId', 'newsletterId'])
          .executeTakeFirstOrThrow();

        await trx
          .updateTable('newsletter_post')
          .set({ nextId })
          .where(({ and, eb }) =>
            and([
              eb('nextId', '=', id),
              eb('parentId', parentId === null ? 'is' : '=', parentId),
              eb('newsletterId', '=', newsletterId),
            ])
          )
          .execute();

        await trx
          .updateTable('newsletter_post')
          .set({ prevId })
          .where(({ and, eb }) =>
            and([
              eb('prevId', '=', id),
              eb('parentId', parentId === null ? 'is' : '=', parentId),
              eb('newsletterId', '=', newsletterId),
            ])
          )
          .execute();
      });
    }
  }
}
