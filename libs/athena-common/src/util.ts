import _ from 'lodash';
import { nanoid } from 'nanoid';
import { MediaFormat, NewsletterPostTypeName } from './lib';

import {
  MediaPostDetails,
  NewsletterPost,
  TextPostDetails,
  DateRange,
  TempNodePosition,
  NodePosition,
} from './types';

import { pipe, flow } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as R from 'fp-ts/Record';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

export const logObject = (item: any, label?: string) => {
  if (label) {
    console.log(label, JSON.stringify(item, null, 4));
  } else {
    console.log(JSON.stringify(item, null, 4));
  }
};

export function range(x: number): number[] {
  return Array.from({ length: x + 1 }, (_, i) => i);
}

export function mapToArray<T = object>(obj: Record<string, T>): T[] {
  return Object.keys(obj).map((key) => obj[key]);
}

export function formatDate(date: string) {
  return new Date(date).toDateString();
}

export function formatDateRange(dateRange: DateRange) {
  if (!dateRange.start) return null;
  const start = formatDate(dateRange.start);
  const end = dateRange.end ? formatDate(dateRange.end) : null;
  return end ? `${start} - ${end}` : start;
}

export function mimeTypeToMediaFormat(mimeType: string): MediaFormat {
  const type = mimeType.split('/')[0];
  if (type === 'image') return MediaFormat.Image;
  if (type === 'video') return MediaFormat.Video;
  if (type === 'audio') return MediaFormat.Audio;

  throw new Error('Unsupported mime type');
}

export const nullToUndefined = (v: any) => (_.isNull(v) ? undefined : v);

export const isMediaPost = (
  post: NewsletterPost
): post is NewsletterPost<MediaPostDetails> => {
  return (
    (post as NewsletterPost<MediaPostDetails>).details.type ===
    NewsletterPostTypeName.Media
  );
};

export const isTextPost = (
  post: NewsletterPost
): post is NewsletterPost<TextPostDetails> => {
  return (
    (post as NewsletterPost<TextPostDetails>).details.type ===
    NewsletterPostTypeName.Text
  );
};

export const isNumberOrNull = _.overSome([_.isNumber, _.isNull]);

type NonUndefined<T> = T extends undefined ? never : T;

export function areDefinedOrNull<T>(values: T[]): values is NonUndefined<T>[] {
  return values.every(_.negate(_.isUndefined));
}

export const getChildPosts = <T extends { tempPosition: TempNodePosition }>(
  id: string,
  posts: T[]
) => {
  const filtered = posts.filter((p) => p.tempPosition.parentId === id);

  if (filtered.length === 0) return [];

  const arr = [...filtered];
  for (let i = 0; i < filtered.length; i++) {
    arr.push(...getChildPosts(filtered[i].tempPosition.id, posts));
  }

  return arr;
};

export const makeIdMap = <T, K, V>(
  items: T[],
  keyValFn: (item: T) => [K, V]
): Map<K, V> => new Map(items.map(keyValFn));

export const addPropertyToItems = <T, P extends string, V>(
  items: T[],
  transformFn: (item: T) => T & { [key in P]: V }
): (T & { [key in P]: V })[] => items.map(transformFn);

export const getId = <K, V>(map: Map<K, V>, key: K): V => {
  const val = map.get(key);
  if (val === undefined) throw new Error('Not found');
  return val;
};

export const addTempPositionToItems = <
  T extends { id: number; position: NodePosition; tempPosition?: TempNodePosition }
>(
  items: T[]
) => {
  const map = makeIdMap(items, (i) => [i.id, nanoid()]);
  return addPropertyToItems<T, 'tempPosition', TempNodePosition>(items, (i) => ({
    ...i,
    tempPosition: {
      id: getId(map, i.id),
      parentId:
        i.position.parentId === null ? null : getId(map, i.position.parentId),
      nextId: i.position.nextId === null ? null : getId(map, i.position.nextId),
      prevId: i.position.prevId === null ? null : getId(map, i.position.prevId),
    },
  }));
};

export const fromItemsWithTempPosition = <
  T extends { id: number; tempPosition: TempNodePosition }
>(
  items: T[]
): (T & { position: NodePosition })[] => {
  const map = makeIdMap(items, (i) => [i.tempPosition.id, i.id]);
  return addPropertyToItems<T, 'position', NodePosition>(items, (i) => {
    const position = {
      parentId:
        i.tempPosition.parentId === null
          ? null
          : getId(map, i.tempPosition.parentId),
      nextId:
        i.tempPosition.nextId === null ? null : getId(map, i.tempPosition.nextId),
      prevId:
        i.tempPosition.prevId === null ? null : getId(map, i.tempPosition.prevId),
    } as NodePosition;

    return {
      ...i,
      id: getId(map, i.tempPosition.id),
      position,
    };
  });
};

// type Id = string | number;

// type WithPosition<T> = T & { position: NodePosition };

// const makeIdMap = <K extends Id>(keys: K[]): Record<K, string> =>
//   pipe(
//     keys,
//     A.map((k) => [k, nanoid()] as const),
//     R.fromEntries
//   );

// const resolveRef = <K extends Id>(
//   map: Record<K, string>,
//   id: K | null
// ): E.Either<Error, string | null> =>
//   id === null
//     ? E.right(null)
//     : pipe(
//         O.fromNullable(map[id]),
//         E.fromOption(() => new Error(`Missing ID mapping for ${id}`))
//       );

// const parsePosition: <T>(input: T) => E.Either<Error, NodePosition> =
//   (input) => E.tryCatch(
//     () => nodePositionSchema.parse(input),
//     (e) => new Error(`Invalid position: ${String(e)}`)
//   );

// export const addTempPositionToItems = <
//   T extends { id: number; position: NodePosition }
// >(
//   items: T[]
// ): E.Either<Error, WithTempPosition<T>[]> => {
//   const idMap = makeIdMap(items.map((item) => item.id));

//   return pipe(
//     items,
//     A.traverse(E.Applicative)((item) =>
//       pipe(
//         E.Do,
//         E.bind('id', () => resolveRef(idMap, item.id)),
//         E.bind('parentId', () => resolveRef(idMap, item.position.parentId)),
//         E.bind('nextId', () => resolveRef(idMap, item.position.nextId)),
//         E.bind('prevId', () => resolveRef(idMap, item.position.prevId)),
//         E.map(({ id, parentId, nextId, prevId }) => ({
//           ...item,
//           tempPosition: { id: id!, parentId, nextId, prevId },
//         }))
//       )
//     )
//   );
// };

// export const fromItemsWithTempPosition = <
//   T extends { tempPosition: TempNodePosition }
// >(
//   items: T[]
// ): E.Either<Error, WithPosition<T>[]> => {
//   const idMap = makeIdMap(items.map((item) => item.tempPosition.id));

//   return pipe(
//     items,
//     A.traverse(E.Applicative)((item) =>
//       pipe(
//         E.Do,
//         E.bind('parentId', () => resolveRef(idMap, item.tempPosition.parentId)),
//         E.bind('nextId', () => resolveRef(idMap, item.tempPosition.nextId)),
//         E.bind('prevId', () => resolveRef(idMap, item.tempPosition.prevId)),
//         E.bind('id', () =>
//           resolveRef(idMap, item.tempPosition.id).map((id) => Number(id))
//         ),
//         E.map(({ id, parentId, nextId, prevId }) => ({
//           ...item,
//           id,
//           position: { parentId, nextId, prevId },
//         }))
//       )
//     )
//   );
// };
