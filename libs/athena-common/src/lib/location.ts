import { z } from 'zod';
import { geoPositionInput, makeEntitySchemas } from './common';

export const locationSchema = makeEntitySchemas({
  id: z.coerce.number(),
  name: z.string().nullable(),
  country: z.string().nullable(),
  geoPosition: geoPositionInput.nullable(),
});

export const createLocationSchema = locationSchema.create;
export const updateLocationSchema = locationSchema.update;
