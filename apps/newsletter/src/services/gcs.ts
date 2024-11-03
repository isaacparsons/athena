import { Bucket, Storage } from '@google-cloud/storage';
import { parseEnv } from '../util';

const env = parseEnv();
const storage = new Storage({
  keyFilename:
    '/Users/isaacparsons/Documents/Projects/athena/apps/newsletter/athena-435518-246fc2bb15a8.json',
});

export class GCSManager {
  bucket: Bucket;
  constructor() {
    this.bucket = storage.bucket(env.gcs.bucketName);
  }

  async getSignedUrl(
    fileName: string,
    action: 'read' | 'write' | 'delete' | 'resumable'
  ) {
    const [url] = await storage
      .bucket(env.gcs.bucketName)
      .file(fileName)
      .getSignedUrl({
        version: 'v4',
        action: action,
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      });
    return url;
  }
}
