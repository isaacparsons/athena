import { z } from 'zod';
import {
  createRequestSchema,
  geoPositionInput,
  updateRequestSchema,
} from './common';

export const location = z.object({
  id: z.coerce.number(),
  name: z.string().nullable(),
  country: z.string().nullable(),
  geoPosition: geoPositionInput.nullable(),
});

export type Location = z.infer<typeof location>;

export const createLocation = createRequestSchema(location);
export type CreateLocation = z.infer<typeof createLocation>;

export const updateLocation = updateRequestSchema(location);
export type UpdateLocation = z.infer<typeof updateLocation>;
