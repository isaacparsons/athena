import { z } from 'zod';

export type Nullable<T> = T | null;

export const getInput = z.object({
  id: z.coerce.number(),
});
export type GetInput = z.infer<typeof getInput>;

export const deleteInput = z.object({
  id: z.coerce.number(),
});
export type DeleteInput = z.infer<typeof deleteInput>;

export const deleteBatchInput = z.object({
  ids: z.array(z.coerce.number()),
});
export type DeleteBatchInput = z.infer<typeof deleteBatchInput>;

export const updateInput = z.object({
  id: z.coerce.number(),
});

export function withUpdateInputSchema<T extends z.AnyZodObject>(schema: T) {
  return z.object({ id: z.coerce.number() }).and(schema);
}

export function withCreateInputSchema<T extends z.AnyZodObject>(schema: T) {
  return schema.omit({ id: true, meta: true }) as z.ZodObject<
    Omit<T['shape'], 'id' | 'meta'>
  >;
}

export const positionInput = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type Position = z.infer<typeof positionInput>;

/**
 * Date
 */

export const dateInput = z.string().min(8);

export const dateRangeInput = z.object({
  start: dateInput.optional(),
  end: dateInput.optional(),
});

export type DateRange = z.infer<typeof dateRangeInput>;

export const nodePosition = z.object({
  parentId: z.coerce.number().nullable(),
  nextId: z.coerce.number().nullable(),
  prevId: z.coerce.number().nullable(),
});

export type NodePosition = z.infer<typeof nodePosition>;

export const tempNodePosition = z.object({
  id: z.string(),
  parentId: z.coerce.string().nullable(),
  nextId: z.coerce.string().nullable(),
  prevId: z.coerce.string().nullable(),
});
export type TempNodePosition = z.infer<typeof tempNodePosition>;

export const nodePositionInput = nodePosition.omit({ prevId: true });

export type NodePositionInput = z.infer<typeof nodePositionInput>;

/**
 * Helpers
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
