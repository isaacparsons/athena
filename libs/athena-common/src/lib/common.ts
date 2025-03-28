import { z } from 'zod';

export type Nullable<T> = T | null;

export const id = z.coerce.number();
export type Id = z.infer<typeof id>;

export const geoPositionInput = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type GeoPosition = z.infer<typeof geoPositionInput>;

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

export function updateRequestSchema<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) {
  return schema.merge(z.object({ id: z.coerce.number() })) as z.ZodObject<
    T & { id: z.ZodNumber }
  >;
}

export function createRequestSchema<T extends z.AnyZodObject>(schema: T) {
  return schema.omit({ id: true, meta: true }) as z.ZodObject<
    Omit<T['shape'], 'id' | 'meta'>
  >;
}

export const readRequestSchema = z.object({ id: z.coerce.number() });
export const deleteRequestSchema = z.object({ id: z.coerce.number() });
export const deleteManyRequestSchema = z.array(z.coerce.number());

// /**
//  * Date
//  */

export const dateInput = z.string().min(8);

export const dateRangeInput = z.object({
  start: dateInput.nullable(),
  end: dateInput.nullable(),
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
