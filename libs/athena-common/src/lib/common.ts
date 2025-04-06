import { z, ZodRawShape } from 'zod';

export function makeEntitySchemas<TShape extends ZodRawShape>(shape: TShape) {
  const base = z.object(shape).extend({ id: z.number() });
  const create = base.omit({ id: true });
  const update = base.partial().extend({ id: z.number() });

  return {
    base,
    create,
    update,
  };
}

export type Nullable<T> = T | null;

export const id = z.coerce.number();
export type Id = z.infer<typeof id>;

export const geoPositionInput = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type GeoPosition = z.infer<typeof geoPositionInput>;

export const readInput = z.object({
  id: z.coerce.number(),
});
export type ReadInput = z.infer<typeof readInput>;

export const deleteInput = z.object({
  id: z.coerce.number(),
});
export type DeleteInput = z.infer<typeof deleteInput>;

export const deleteBatchInput = z.object({
  ids: z.array(z.coerce.number()),
});
export type DeleteBatchInput = z.infer<typeof deleteBatchInput>;

/** Date */

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

export const withTempPosition = {
  tempPosition: tempNodePosition,
};

// export function excludeFields<T extends Record<string, any>, K extends keyof T>(
//   obj: T,
//   keys: K[]
// ): Omit<T, K> {
//   const result = { ...obj };
//   for (const key of keys) {
//     delete result[key];
//   }
//   return result;
// }

// export const PaginationSchema = z.object({
//   page: z.number().min(1).default(1),
//   pageSize: z.number().min(1).max(100).default(20),
// });

// export const PaginatedResultSchema = <T extends ZodTypeAny>(itemSchema: T) =>
//   z.object({
//     items: z.array(itemSchema),
//     total: z.number(),
//     page: z.number(),
//     pageSize: z.number(),
//   });

// export const UUID = z.string().uuid();

// export const ISODateString = z.string().refine(val => !isNaN(Date.parse(val)), {
//   message: "Invalid ISO date string"
// });

// export const withUuidFields = {
//   id: UUID,
//   createdAt: ISODateString,
//   updatedAt: ISODateString,
// };

// export const withNumberIdFields = {
//   id: z.number(),
//   createdAt: ISODateString,
//   updatedAt: ISODateString,
// };

// export const withDeletedAt = {
//   deletedAt: ISODateString.nullish()
// };

// export function transformExcludeFields<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
//   const result = { ...obj };
//   for (const key of keys) delete result[key];
//   return result;
// }

// export async function transformArray<T, R>(
//   arr: T[],
//   fn: (item: T) => Promise<R>
// ): Promise<R[]> {
//   return Promise.all(arr.map(fn));
// }
