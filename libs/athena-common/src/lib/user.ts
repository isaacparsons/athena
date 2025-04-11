import { z } from 'zod';

export const userSchema = z.object({
  id: z.coerce.number(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
});

export const createUserSchema = userSchema.omit({ id: true });

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}
