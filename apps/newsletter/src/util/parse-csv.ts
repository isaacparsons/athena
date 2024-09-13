import fs from 'node:fs';
import { parse } from 'csv-parse';
import { finished } from 'stream/promises';

export async function parseCsvFile(file: string) {
  const records = [];
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
