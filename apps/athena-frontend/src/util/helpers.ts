import { DateRange } from '@athena/athena-common';

export function mapToArray<T = object>(obj: Record<string, T>): T[] {
  return Object.keys(obj).map((key) => obj[Number(key)]);
}

export function formatDate(date: string) {
  return new Date(date).toDateString();
}

export function formatDateRange(dateRange: DateRange) {
  if (!dateRange.start) return null;
  const start = formatDate(dateRange.start);
  const end = dateRange.end ? formatDate(dateRange.end) : null;
  return `${start} - ${end}`;
}
