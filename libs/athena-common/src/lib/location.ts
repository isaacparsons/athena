import { z } from 'zod';

/**
 * Location
 */

export const locationInput = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  country: z.string().optional(),
  position: z
    .object({
      latitude: z.coerce.number(),
      longitude: z.coerce.number(),
    })
    .optional(),
});

export type LocationInput = z.infer<typeof locationInput>;
export type Location = LocationInput;

export const createLocation = locationInput.omit({ id: true });

export type CreateLocation = z.infer<typeof createLocation>;

export const updateLocation = locationInput;

export type UpdateLocation = z.infer<typeof updateLocation>;
