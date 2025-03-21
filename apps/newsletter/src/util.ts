import fs from 'node:fs';
import _ from 'lodash';
import { parse } from 'csv-parse';
import { finished } from 'stream/promises';
import path from 'path';
const configPath = path.join(__dirname, '..', '..', '..', 'config');
process.env['NODE_CONFIG_DIR'] = configPath;
import config from 'config';
import { Config } from './types/types';

import * as R from 'fp-ts/Record';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

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

// import { isMediaItem, NewsletterPostBase } from '@athena/common';
// import { IGCSManager } from '@athena/services';

// export const signMediaItemUrls =
//   (gcs: IGCSManager) =>
//   async (items: NewsletterPostBase[]): Promise<NewsletterPostBase[]> =>
//     Promise.all(items.map(async (item) => signMediaItemUrl(gcs)(item)));

// export const signMediaItemUrl =
//   (gcs: IGCSManager) =>
//   async (item: NewsletterPostBase): Promise<NewsletterPostBase> => {
//     if (isMediaItem(item)) {
//       const signedUrl = await gcs.getSignedUrl(item.details.fileName, 'read');
//       return {
//         ...item,
//         details: {
//           ...item.details,
//           fileName: signedUrl,
//         },
//       };
//     }
//     return item;
//   };
