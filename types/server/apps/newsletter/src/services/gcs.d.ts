import 'reflect-metadata';
import { Bucket } from '@google-cloud/storage';
import { GCSConfig } from '../types/types';
export interface IGCSManager {
    getSignedUrl(fileName: string, action: 'read' | 'write' | 'delete' | 'resumable'): Promise<string>;
}
export declare class GCSManager implements IGCSManager {
    readonly config: GCSConfig;
    bucket: Bucket;
    constructor(config: GCSConfig);
    getSignedUrl(fileName: string, action: 'read' | 'write' | 'delete' | 'resumable'): Promise<string>;
}
