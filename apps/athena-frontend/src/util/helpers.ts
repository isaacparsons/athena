import { DateRange, MediaFormat } from '@athena/athena-common';

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
