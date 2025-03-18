import { Entity } from '@athena/common';
import {
  Database,
  DBConnection,
  EntityTableName,
  jsonObjectFrom,
  SelectUser,
  TableName,
} from '@athena/db';
import { injectable } from 'inversify';
import {
  Expression,
  ExpressionBuilder,
  expressionBuilder,
  SelectQueryBuilder,
  UpdateObject,
} from 'kysely';
import {
  InsertExpression,
  InsertObject,
} from 'kysely/dist/cjs/parser/insert-values-parser';
import { ExtractTableAlias } from 'kysely/dist/cjs/parser/table-parser';
import { UpdateObjectExpression } from 'kysely/dist/cjs/parser/update-set-parser';

export type EntityMetaRow = {
  creator: SelectUser;
  modifier: SelectUser | null;
};

export type EntityRow<R> = R & {
  creator: SelectUser;
  modifier: SelectUser | null;
};

export interface IEntityDAO<R, E extends Entity> {
  toEntity: (row: R) => E;
}

@injectable()
export abstract class EntityDAO<T extends EntityTableName, R, E extends Entity> {
  abstract tableName: T;
  // query =  expressionBuilder<Database, T>().selectFrom(this.tableName)
  //   SelectQueryBuilder<Database, T, any>
  //q: SelectQueryBuilder<Database, T, any>
  selectEntity(db: DBConnection) {
    const eb = expressionBuilder<Database, EntityTableName>();
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
  postEntity(
    db: DBConnection,
    userId: number,
    values: Omit<
      InsertObject<Database, T>,
      'created' | 'creatorId' | 'modifier' | 'modified'
    >
  ) {
    return db.insertInto(this.tableName).values({
      ...values,
      created: new Date().toISOString(),
      creatorId: userId,
    } as InsertExpression<Database, T>);
  }

  updateEntity(
    db: DBConnection,
    userId: number,
    id: number,
    values: Partial<
      Omit<
        UpdateObject<Database, T>,
        'created' | 'creatorId' | 'modifier' | 'modified'
      >
    >
  ) {
    return db.updateTable(this.tableName).set({
      ...values,
      modified: new Date().toISOString(),
      modifierId: userId,
    } as UpdateObjectExpression<Database, ExtractTableAlias<Database, T>, ExtractTableAlias<Database, T>>);
  }

  deleteEntity(db: DBConnection) {
    return db.deleteFrom(this.tableName);
  }

  //   toEntity: (row: R) => E;
}
