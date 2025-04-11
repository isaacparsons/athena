import _ from 'lodash';
import { EntityDAO } from './entity';
import {
  CreateManyTemplateNodes,
  CreateTemplateNode,
  fromItemsWithTempPosition,
  NodePositionInput,
  TemplateNode,
  UpdateTemplateNode,
} from '@athena/common';
import { inject, injectable, injectFromBase } from 'inversify';
import {
  TYPES,
  DBConnection,
  ITemplateNodeDAO,
  TemplateNodeRow,
} from '@backend/types';
import { mapMeta } from './mapping';

import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as TE from 'fp-ts/TaskEither';

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

  async readByTemplateId(id: number): Promise<TemplateNode[]> {
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

  async createMany(userId: number, input: CreateManyTemplateNodes) {
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
    const items = await Promise.all(
      nodes.map(async (n) => {
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

        return { ...n, id };
      })
    );

    await Promise.all(
      fromItemsWithTempPosition(items).map(async (n) => {
        await this.updateEntity(db, userId, {
          id: n.id,
          ...n.position,
        }).executeTakeFirstOrThrow();
      })
    );

    return items.map((n) => n.id);
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
