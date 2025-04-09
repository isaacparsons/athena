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

export const geoPositionSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export const readSchema = z.object({
  id: z.coerce.number(),
});

export const deleteSchema = z.object({
  id: z.coerce.number(),
});

export const deleteManySchema = z.object({
  ids: z.array(z.coerce.number()),
});

/** Date */

export const dateSchema = z.string().min(8);

export const dateRangeSchema = z.object({
  start: dateSchema.nullable(),
  end: dateSchema.nullable(),
});

export const nodePositionSchema = z.object({
  parentId: z.coerce.number().nullable(),
  nextId: z.coerce.number().nullable(),
  prevId: z.coerce.number().nullable(),
});

export const tempNodePositionSchema = z.object({
  id: z.string(),
  parentId: z.coerce.string().nullable(),
  nextId: z.coerce.string().nullable(),
  prevId: z.coerce.string().nullable(),
});

export const nodePositionInputSchema = nodePositionSchema.omit({ prevId: true });

export const withTempPosition = {
  tempPosition: tempNodePositionSchema,
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
