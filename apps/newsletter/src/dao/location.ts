import _ from 'lodash';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { CreateLocation, UpdateLocation } from '@athena/common';
import { TYPES } from '../types/types';

export interface ILocationDAO {
  create(input: CreateLocation): Promise<number>;
  update(input: UpdateLocation): Promise<number>;
}

@injectable()
export class LocationDAO implements ILocationDAO {
  constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {}

  async create(input: CreateLocation) {
    const res = await this.db
      .insertInto('location')
      .values({
        ...input,
        name: input?.name ?? 'untitled',
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    return res.id;
  }

  async update(input: UpdateLocation): Promise<number> {
    const result = await this.db
      .updateTable('location')
      .set({ ..._.omit(input, 'id') })
      .returning('id')
      .where('id', '=', input.id)
      .executeTakeFirstOrThrow();
    return result.id;
  }
}
