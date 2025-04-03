import _ from 'lodash';
import {
  MediaFormat,
  NewsletterPostBase,
  NewsletterPostTypeName,
  DateRange,
  TempNodePosition,
} from './lib';
import { NewsletterPost, MediaPostDetails, TextPostDetails } from './entity';

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
