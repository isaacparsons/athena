import { z } from 'zod';

export const userBase = z.object({
  id: z.coerce.number(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
});

export type UserBase = z.infer<typeof userBase>;

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}
