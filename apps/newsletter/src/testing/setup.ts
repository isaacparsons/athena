import * as O from 'fp-ts/Option';
import { pipe, flow } from 'fp-ts/function';
import * as R from 'ramda';
import { parse } from 'yaml';
import fs from 'fs/promises';
import path from 'path';
import { faker } from '@faker-js/faker';
import { Database, DB, DBConnection, Pool, PostgresDialect } from '@athena/db';
import { Container } from 'inversify';
import { TYPES } from '../types/types';
import { container } from '../inversify.config';

const generateTypeMap = {
  email: faker.internet.email,
} as const;

type GenerateType = keyof typeof generateTypeMap;

const fixturesDir = path.join(__dirname, 'fixtures');

// const container = new Container();
// container.bind(TYPES.DBClient).toConstantValue(
//   new DB<Database>({
//     dialect: new PostgresDialect({
//       pool: new Pool({
//         database: 'newsletter',
//         host: 'localhost',
//         user: 'postgres',
//         password: 'postgres',
//         port: 5432,
//         max: 10,
//       }),
//     }),
//   })
// );
const db = container.get<DBConnection>(TYPES.DBClient);

export const parseFixture = async (fileName: string) => {
  const contents = await fs.readFile(path.join(fixturesDir, fileName), 'utf8');
  return parse(contents);
};

export const createFixture = async (fileName: string) => {
  const entities: Record<string, object[]> = {};
  const fixture = await parseFixture(fileName);
  const refMap = new Map<string, object>();
  const generateMap = new Map<string, string>();

  const extractRef = flow(
    O.fromPredicate((i) => typeof i === 'string'),
    O.chain(O.fromPredicate(R.startsWith('__ref'))),
    O.map(R.split('.')),
    O.chain((x) => O.fromNullable(x[1])),
    O.chain((id) => O.fromNullable(refMap.get(id))),
    O.map(R.prop('id'))
  );

  const transform = R.mapObjIndexed((value: string) => {
    if (typeof value !== 'string') {
      return value;
    } else {
      return pipe(
        value,
        extractRef as any,
        O.getOrElse(() => value)
      );
    }
  });

  const extractGenerate = flow(
    O.fromPredicate(R.startsWith('__generate')),
    O.map(R.split('.')),
    O.chain((x) => O.fromNullable(x[1])),
    O.chain((id) => O.fromNullable(generateMap.get(id)))
  );
  const transformGenerate = R.mapObjIndexed((value: string) => {
    if (typeof value !== 'string') {
      return value;
    } else {
      return pipe(
        value,
        extractGenerate as any,
        O.getOrElse(() => value)
      );
    }
  });

  for await (const [key, val] of R.toPairs(fixture)) {
    if (key === 'generate') {
      for (const generateKey in val) {
        if (!(val[generateKey] in generateTypeMap))
          throw new Error('not a generatable type');
        generateMap.set(
          generateKey,
          generateTypeMap[val[generateKey] as GenerateType]()
        );
      }
    } else {
      for await (const entity of val) {
        const e = R.omit(['__ref'], entity);
        const entityWithResolvedRefs = transform(e);
        const entityWithGeneratedValues = transformGenerate(entityWithResolvedRefs);
        const createdEntity = await db
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .insertInto(key as any)
          .values(entityWithGeneratedValues)
          .returningAll()
          .executeTakeFirstOrThrow();

        if (key in entities) {
          entities[key].push(createdEntity);
        } else {
          entities[key] = [createdEntity];
        }

        if ('__ref' in entity) refMap.set(entity['__ref'].toString(), createdEntity);
      }
    }
  }
  return entities;
};
