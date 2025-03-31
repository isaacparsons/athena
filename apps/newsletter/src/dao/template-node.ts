import _ from 'lodash';
import { DBConnection, SelectTemplateNode } from '@athena/db';
import { EntityDAO, EntityMetaRow, IEntityDAO } from './entity';
import {
  CreateTemplateNode,
  CreateTemplateNodes,
  NodePosition,
  NodePositionInput,
  TemplateNode,
  TempNodePosition,
  UpdateTemplateNode,
} from '@athena/common';
import { inject, injectable, injectFromBase } from 'inversify';
import { TYPES } from '../types/types';
import { mapMeta } from './mapping';

import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import * as T from 'fp-ts/Task';
import * as A from 'fp-ts/Array';
import * as TE from 'fp-ts/TaskEither';

type TemplateNodeRow = EntityMetaRow &
  Omit<SelectTemplateNode, 'modifierId' | 'creatorId' | 'locationId' | 'ownerId'>;

export type ITemplateNodeDAO = IEntityDAO<TemplateNodeRow, TemplateNode> & {
  getByTemplateId(id: number): Promise<TemplateNode[]>;
  createMany(userId: number, input: CreateTemplateNodes): Promise<number[]>;
  updateMany(userId: number, input: UpdateTemplateNode[]): Promise<number[]>;
};

@injectable()
@injectFromBase()
export class TemplateNodeDAO
  extends EntityDAO<'template_node', TemplateNodeRow, TemplateNode>
  implements ITemplateNodeDAO
{
  tableName = 'template_node' as any;

  constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {
    super();
  }

  toEntity(row: TemplateNodeRow) {
    return {
      id: row.id,
      templateId: row.templateId,
      meta: mapMeta(row),
      data: row.data as Record<string, string>,
      position: {
        nextId: row.nextId,
        prevId: row.prevId,
        parentId: row.parentId,
      },
    };
  }

  async getByTemplateId(id: number): Promise<TemplateNode[]> {
    const nodes = await this.selectEntity(this.db)
      .select(['data', 'nextId', 'prevId', 'parentId', 'templateId'])
      .where('templateId', '=', id)
      .execute();

    return nodes.map((node) => this.toEntity(node));
  }

  private async getNeighbours(
    db: DBConnection,
    templateId: number,
    position: NodePositionInput
  ) {
    const { nextId, parentId } = position;
    const prev = await db
      .selectFrom('template_node')
      .where(({ eb, and }) =>
        and([
          eb('nextId', nextId === null ? 'is' : '=', nextId),
          eb('parentId', parentId === null ? 'is' : '=', parentId),
          eb('templateId', '=', templateId),
        ])
      )
      .select(['id'])
      .executeTakeFirst();

    return { prevId: prev === undefined ? null : prev.id, nextId };
  }

  async createMany(userId: number, input: CreateTemplateNodes) {
    const { position, nodes, templateId } = input;
    if (nodes.length === 0) return [];
    const [parents, children] = _.partition(
      nodes,
      (n) => n.tempPosition.parentId === null
    );
    if (parents.length === 0) throw new Error('no parent specified');
    const parent = parents[0];

    return this.withTransaction(this.db, async (db) => {
      const { prevId, nextId } = await this.getNeighbours(db, templateId, position);

      const { id } = await this.postEntities(db, userId, [
        {
          templateId,
          data: parent.data,
          nextId,
          prevId,
          parentId: position.parentId,
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

      const ids = await this.createChildNodes(db, userId, id, templateId, children);
      return [id, ...ids];
    });
  }
  private async createChildNodes(
    db: DBConnection,
    userId: number,
    parentNodeId: number,
    templateId: number,
    nodes: CreateTemplateNode[]
  ) {
    const map = await Promise.all(
      nodes.map<Promise<[string, number]>>(async (n) => {
        const { id } = await this.postEntities(db, userId, [
          {
            ..._.omit(n, ['tempPosition']),
            nextId: null,
            prevId: null,
            parentId: null,
            templateId,
          },
        ])
          .returning('id')
          .executeTakeFirstOrThrow();

        return [n.tempPosition.id, id];
      })
    );
    const idMap = new Map(map);

    const getRealPosition = (
      pos: TempNodePosition
    ): NodePosition & { id: number } => {
      const id = idMap.get(pos.id);
      const parent = pos.parentId !== null ? idMap.get(pos.parentId) : null;
      const parentId = parent === undefined ? parentNodeId : parent;
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
    return map.map((n) => n[1]);
  }

  async updateMany(userId: number, input: UpdateTemplateNode[]) {
    return this.withTransaction(this.db, async (db) => {
      const updateTemplateNode = (
        node: UpdateTemplateNode
      ): TE.TaskEither<Error, number> =>
        pipe(
          TE.tryCatch(
            () =>
              this.updateEntity(db, userId, {
                id: node.id,
                data: node.data,
                parentId: node.position?.parentId ?? null,
                nextId: node.position?.nextId ?? null,
                prevId: node.position?.prevId ?? null,
              })
                .returning('id')
                .executeTakeFirstOrThrow(),
            (reason) => new Error(String(reason))
          ),
          TE.map((p) => p.id)
        );

      const result = await pipe(
        input,
        A.traverse(TE.ApplicativePar)(updateTemplateNode)
      )();
      if (result._tag === 'Left') {
        throw new Error(
          `Failed to update some template nodes: ${result.left.message}`
        );
      } else {
        return result.right;
      }
    });
  }
}
