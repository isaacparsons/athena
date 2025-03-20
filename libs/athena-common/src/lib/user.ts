import { z } from 'zod';
/**
 * User
 */

export const userBase = z.object({
  id: z.coerce.number(),
  email: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UserBase = z.infer<typeof userBase>;

export interface UserSession {
  email: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
}

/**
 * Meta data
 */

export const meta = z.object({
  creator: userBase,
  modifier: userBase.optional(),
  created: z.string(),
  modified: z.string().optional(),
});
export type Meta = z.infer<typeof meta>;

export function withMetaSchema<T extends z.AnyZodObject>(schema: T) {
  return z.object({ meta: meta }).merge(schema);
}
