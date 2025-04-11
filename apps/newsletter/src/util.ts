import fs from 'node:fs';
import { parse } from 'csv-parse';
import { finished } from 'stream/promises';
import path from 'path';
const configPath = path.join(__dirname, '..', '..', '..', 'config');
process.env['NODE_CONFIG_DIR'] = configPath;
import config from 'config';
import { Config } from './types/types';

export function getConfig(): Config {
  return {
    app: config.util.toObject(config.get('app')),
    db: config.util.toObject(config.get('db')),
    google: config.util.toObject(config.get('google')),
    gcs: config.util.toObject(config.get('gcs')),
    client: config.util.toObject(config.get('client')),
  };
}

export async function parseCsvFile(file: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const records: any[] = [];
  const parser = fs.createReadStream(file).pipe(parse({}));
  parser.on('readable', function () {
    let record;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });
  await finished(parser);
  return records;
}

export const isProduction = () => process.env.NODE_ENV === 'production';
export const isAuthEnabled = () => Boolean(process.env.AUTH_DISABLED) === false;
