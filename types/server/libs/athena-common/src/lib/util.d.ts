import { DateRange, MediaFormat } from './athena-common';
export declare const logObject: (item: any, label?: string) => void;
export declare function range(x: number): number[];
export declare function mapToArray<T = object>(obj: Record<string, T>): T[];
export declare function formatDate(date: string): string;
export declare function formatDateRange(dateRange: DateRange): string | null;
export declare function mimeTypeToMediaFormat(mimeType: string): MediaFormat;
