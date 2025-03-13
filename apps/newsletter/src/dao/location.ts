import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DBConnection } from '@athena/db';
import { CreateLocation, LocationInput, UpdateLocation } from '@athena/common';
import { TYPES } from '../types/types';

export interface ILocationDAO {
  post(input: LocationInput): Promise<number>;
  update(input: UpdateLocation): Promise<number>;
}

@injectable()
export class LocationDAO implements ILocationDAO {
  constructor(@inject(TYPES.DBClient) readonly db: DBConnection) {}

  async post(input: CreateLocation) {
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
      .set({
        ...(input.name ? { name: input.name } : {}),
        ...(input.country ? { countryCode: input.country } : {}),
        ...(input.position ? { position: input.position } : {}),
      })
      .returning('id')
      .where('id', '=', input.id)
      .executeTakeFirstOrThrow();
    return result.id;
  }
}
