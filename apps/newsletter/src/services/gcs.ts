import { Bucket, Storage } from '@google-cloud/storage';
import { parseEnv } from '../util/parse-env';

const env = parseEnv();
const storage = new Storage({
  keyFilename:
    '/Users/isaacparsons/Documents/projects/athena/apps/newsletter/athena-435518-246fc2bb15a8.json',
});

export class GCSManager {
  bucket: Bucket;
  constructor() {
    this.bucket = storage.bucket(env.gcs.bucketName);
  }

  async getSignedUrl(fileName: string) {
    const [url] = await storage
      .bucket(env.gcs.bucketName)
      .file(fileName)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      });
    return url;
  }

  async uploadPhoto(photoPath: string, name: string) {
    return (
      await this.bucket.upload(photoPath, {
        destination: name,
      })
    )[0];
  }
  async uploadVideo(path: string, name: string) {
    return (
      await this.bucket.upload(path, {
        destination: name,
      })
    )[0];
  }
}
