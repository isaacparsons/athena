import { z } from 'zod';
import { geoPositionSchema, makeEntitySchemas } from './common';

export const locationSchema = makeEntitySchemas({
  id: z.coerce.number(),
  name: z.string().nullable(),
  country: z.string().nullable(),
  geoPosition: geoPositionSchema.nullable(),
});

export const createLocationSchema = locationSchema.create;
export const updateLocationSchema = locationSchema.update;
