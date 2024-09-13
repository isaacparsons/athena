import postgres from 'postgres';
import { parseEnv } from '../util/parse-env';

const env = parseEnv();

const sql: postgres.Sql = postgres(
  `postgres://${env.db.username}:${env.db.password}@${env.db.host}:${env.db.port}/${env.db.name}`,
  {
    transform: postgres.camel,
  }
);

export default sql;
