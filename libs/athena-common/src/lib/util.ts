import { DateRange, MediaFormat } from './athena-common';

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
