import { z } from 'zod';
import { geoPositionInput } from './common';

export const countrySchema = z.object({
  name: z.string(),
  geoPosition: geoPositionInput,
});
