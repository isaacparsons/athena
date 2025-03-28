import { z } from 'zod';
import { geoPositionInput } from './common';

export const country = z.object({
  name: z.string(),
  geoPosition: geoPositionInput,
});

export type Country = z.infer<typeof country>;
