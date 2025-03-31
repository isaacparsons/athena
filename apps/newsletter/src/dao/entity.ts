import _ from 'lodash';
import { Entity } from '@athena/common';
import {
  Database,
  DBConnection,
  EntityTableName,
  jsonObjectFrom,
  SelectUser,
  Transaction,
} from '@athena/db';
import { injectable } from 'inversify';
import { expressionBuilder, UpdateObject } from 'kysely';
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
  postEntities(
    db: DBConnection,
    userId: number,
    values: Omit<
      InsertObject<Database, T>,
      'created' | 'creatorId' | 'modifier' | 'modified'
    >[]
  ) {
    const created = new Date().toISOString();
    return db.insertInto(this.tableName).values(
      values.map((v) => ({
        ...v,
        created,
        creatorId: userId,
      })) as InsertExpression<Database, T>
    );
  }

  updateEntity(
    db: DBConnection,
    userId: number,
    input: { id: number } & Partial<
      Omit<
        UpdateObject<Database, T>,
        'created' | 'creatorId' | 'modifier' | 'modified'
      >
    >
  ) {
    const { id, ...values } = input;
    return db
      .updateTable(this.tableName)
      .set({
        ...values,
        modified: new Date().toISOString(),
        modifierId: userId,
      } as UpdateObjectExpression<Database, ExtractTableAlias<Database, T>, ExtractTableAlias<Database, T>>)
      .where('id', '=', id as any);
  }

  deleteEntity(db: DBConnection) {
    return db.deleteFrom(this.tableName);
  }

  //   toEntity: (row: R) => E;

  withTransaction<T>(db: DBConnection, execute: (db: DBConnection) => Promise<T>) {
    if (db.isTransaction) return execute(db);
    return db.transaction().execute(async (trx: Transaction) => {
      return execute(trx);
    });
  }
}
