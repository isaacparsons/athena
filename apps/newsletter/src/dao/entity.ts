import { Entity } from '@athena/common';
import {
  DB,
  DBConnection,
  EntityTableName,
  jsonObjectFrom,
  Transaction,
} from '@backend/types';
import { injectable } from 'inversify';
import { expressionBuilder, UpdateObject } from 'kysely';
import {
  InsertExpression,
  InsertObject,
} from 'kysely/dist/cjs/parser/insert-values-parser';
import { ExtractTableAlias } from 'kysely/dist/cjs/parser/table-parser';
import { UpdateObjectExpression } from 'kysely/dist/cjs/parser/update-set-parser';

@injectable()
export abstract class EntityDAO<T extends EntityTableName, R, E extends Entity> {
  abstract tableName: T;

  selectEntity(db: DBConnection) {
    const eb = expressionBuilder<DB, EntityTableName>();
    return db.selectFrom(this.tableName).select([
      `id`,
      `created`,
      `modified`,
      jsonObjectFrom(
        eb
          .selectFrom('user')
          .selectAll()
          .whereRef('user.id', '=', eb.ref(`${this.tableName}.creatorId`))
      )
        .$notNull()
        .as('creator'),
      jsonObjectFrom(
        eb
          .selectFrom('user')
          .selectAll()
          .whereRef('user.id', '=', eb.ref(`${this.tableName}.modifierId`))
      ).as('modifier'),
    ]);
  }
  postEntities(
    db: DBConnection,
    userId: number,
    values: Omit<
      InsertObject<DB, T>,
      'created' | 'creatorId' | 'modifier' | 'modified'
    >[]
  ) {
    const created = new Date().toISOString();
    return db.insertInto(this.tableName).values(
      values.map((v) => ({
        ...v,
        created,
        creatorId: userId,
      })) as InsertExpression<DB, T>
    );
  }

  updateEntity(
    db: DBConnection,
    userId: number,
    input: { id: number } & Partial<
      Omit<UpdateObject<DB, T>, 'created' | 'creatorId' | 'modifier' | 'modified'>
    >
  ) {
    const { id, ...values } = input;
    return db
      .updateTable(this.tableName)
      .set({
        ...values,
        modified: new Date().toISOString(),
        modifierId: userId,
      } as UpdateObjectExpression<DB, ExtractTableAlias<DB, T>, ExtractTableAlias<DB, T>>)
      .where('id', '=', id as any);
  }

  deleteEntity(db: DBConnection) {
    return db.deleteFrom(this.tableName);
  }

  withTransaction<T>(db: DBConnection, execute: (db: DBConnection) => Promise<T>) {
    if (db.isTransaction) return execute(db);
    return db.transaction().execute(async (trx: Transaction) => {
      return execute(trx);
    });
  }
}
