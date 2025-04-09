import { z } from 'zod';
import { geoPositionSchema } from './common';

export const countrySchema = z.object({
  name: z.string(),
  geoPosition: geoPositionSchema,
});
