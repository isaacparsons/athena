import { NodePosition, SaveNodeBatch } from '@athena/common';
import { NodeEntityTableName } from '@backend/types';
import _ from 'lodash';

export class NodeEntity<N extends NodeEntityTableName, C, U> {
  constructor(readonly table: N) {}

  async save(
    nodes: SaveNodeBatch<C, U>,
    create: (node: C) => Promise<{ id: number; position: NodePosition }>,
    update: (id: number, node: U) => Promise<{ id: number; position: NodePosition }>,
    remove: (id: number) => Promise<void>
  ) {
    const { createNodes, updateNodes, deleteNodes } = nodes;

    const createdNodes = await Promise.all(
      createNodes.map(async (n) => {
        const created = await create({
          ...n.data,
          parentId: null,
          nextId: null,
          prevId: null,
        });
        return { ...created, tempPosition: n.tempPosition };
      })
    );

    const updatedNodes = await Promise.all(
      updateNodes.map(async (n) => {
        const updated = await update(n.id, n.data);
        return {
          ...updated,
          tempPosition: n.tempPosition,
        };
      })
    );

    const nodesAfter = [...createdNodes, ...updatedNodes];

    const tempIdRealIdMap = new Map(
      nodesAfter.map((n) => [n.tempPosition.id, n.id])
    );

    await Promise.all(
      nodesAfter.map(async (n) => {
        await update(n.id, {
          parentId: this.getIdFromIdMap(
            tempIdRealIdMap,
            n.tempPosition.parentId,
            n.position.parentId
          ),
          nextId: this.getIdFromIdMap(
            tempIdRealIdMap,
            n.tempPosition.nextId,
            n.position.nextId
          ),
          prevId: this.getIdFromIdMap(
            tempIdRealIdMap,
            n.tempPosition.prevId,
            n.position.prevId
          ),
        } as U);
      })
    );
    await Promise.all(deleteNodes.map(async (id) => remove(id)));
  }

  private getIdFromIdMap(
    idMap: Map<string, number>,
    id: string | null,
    existingId: number | null
  ) {
    if (id === null) return null;
    const realId = idMap.get(id);
    return _.isUndefined(realId) ? existingId : realId;
  }
}
