import { z } from 'zod';
import { positionInput } from './common';

/**
 * Country
 */

export const country = z.object({
  name: z.string(),
  position: positionInput,
});

export type Country = z.infer<typeof country>;
