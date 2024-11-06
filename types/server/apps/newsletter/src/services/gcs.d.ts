import 'reflect-metadata';
import { Bucket } from '@google-cloud/storage';
export interface IGCSManager {
    getSignedUrl(fileName: string, action: 'read' | 'write' | 'delete' | 'resumable'): Promise<string>;
}
export declare class GCSManager implements IGCSManager {
    bucket: Bucket;
    bucketName: string;
    constructor();
    getSignedUrl(fileName: string, action: 'read' | 'write' | 'delete' | 'resumable'): Promise<string>;
}
