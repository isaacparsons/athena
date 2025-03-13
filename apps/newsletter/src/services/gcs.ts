import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Bucket, Storage } from '@google-cloud/storage';
import { GCSConfig, TYPES } from '../types/types';

const storage = new Storage({
  keyFilename:
    '/Users/isaacparsons/Documents/Projects/athena/apps/newsletter/athena-435518-246fc2bb15a8.json',
});

export interface IGCSManager {
  getSignedUrl(
    fileName: string,
    action: 'read' | 'write' | 'delete' | 'resumable'
  ): Promise<string>;
}

@injectable()
export class GCSManager implements IGCSManager {
  bucket: Bucket;
  // config: GCSConfig
  constructor(@inject(TYPES.gcsConfig) readonly config: GCSConfig) {
    // this.bucket = storage.bucket(this.env.gcs.bucketName);
    this.bucket = storage.bucket(config.bucketName);
  }

  async getSignedUrl(
    fileName: string,
    action: 'read' | 'write' | 'delete' | 'resumable'
  ) {
    const [url] = await storage
      .bucket(this.config.bucketName)
      .file(fileName)
      .getSignedUrl({
        version: 'v4',
        action: action,
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      });
    return url;
  }
}
