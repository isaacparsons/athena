import _ from 'lodash';
import {
  MediaFormat,
  NewsletterPostBase,
  NewsletterPostTypeName,
  DateRange,
} from './lib';
import { NewsletterPost } from './entity';

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
  post: NewsletterPostBase
): post is NewsletterPost<NewsletterPostTypeName.Media> => {
  return (
    (post as NewsletterPost<NewsletterPostTypeName.Media>).details.type ===
    NewsletterPostTypeName.Media
  );
};

export const isTextPost = (
  post: NewsletterPostBase
): post is NewsletterPost<NewsletterPostTypeName.Text> => {
  return (
    (post as NewsletterPost<NewsletterPostTypeName.Text>).details.type ===
    NewsletterPostTypeName.Text
  );
};

export const isContainerItem = (
  post: NewsletterPostBase
): post is NewsletterPost<NewsletterPostTypeName.Container> => {
  return (
    (post as NewsletterPost<NewsletterPostTypeName.Container>).details.type ===
    NewsletterPostTypeName.Container
  );
};

export const isNumberOrNull = _.overSome([_.isNumber, _.isNull]);

type NonUndefined<T> = T extends undefined ? never : T;

export function areDefinedOrNull<T>(values: T[]): values is NonUndefined<T>[] {
  return values.every(_.negate(_.isUndefined));
}
