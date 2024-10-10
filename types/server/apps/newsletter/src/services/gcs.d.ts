import { Bucket } from '@google-cloud/storage';
export declare class GCSManager {
    bucket: Bucket;
    constructor();
    getSignedUrl(fileName: string, action: 'read' | 'write' | 'delete' | 'resumable'): Promise<string>;
}
