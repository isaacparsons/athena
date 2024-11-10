import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { LocationInput } from '@athena/common';
import { TYPES } from '../types/types';

export interface ILocationDAO {
  post(input: LocationInput): Promise<number>;
}

@injectable()
export class LocationDAO implements ILocationDAO {
  constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {}

  async post(input: LocationInput) {
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
}
