import express from 'express';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import dbMiddleware from './middleware/db';
import cors from 'cors';
import routes from './routes/index';
import { initPassport } from './routes/auth';
import { parseEnv } from './util/parse-env';
import { Database } from './db/db';
import { DBClient } from './db/client';

const env = parseEnv();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: env.db.name,
    host: env.db.host,
    user: env.db.username,
    password: env.db.password,
    port: env.db.port,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});

const dbClient = new DBClient(db);
// dbClient.dropTables();
dbClient.createTables();

let app = express();
app.use(
  cors({
    credentials: true,
    origin: `http://${env.client.host}:${env.client.port}`,
    AccessControlAllowOrigin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
app.use(express.json());
app.use(dbMiddleware(db));
app = initPassport(app);

app.get('/', (req, res) => {
  res.send('success');
});

app.use('/v1', routes);

app.listen(env.app.port, env.app.host, () => {
  console.log(`[ ready ] http://${env.app.host}:${env.app.port}`);
});
