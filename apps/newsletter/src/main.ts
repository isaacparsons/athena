import express from 'express';
import dbMiddleware from './middleware/db';
import postgres from 'postgres';
import cors from 'cors';

import { DBSetup } from './db/init-db';
import routes from './routes/index';
import { initPassport } from './routes/auth';
import { DBClient } from './db/db';
import { parseEnv } from './util/parse-env';

const env = parseEnv();

const db = postgres(
  `postgres://${env.db.username}:${env.db.password}@${env.db.host}:${env.db.port}/${env.db.name}`,
  {
    transform: postgres.camel,
  }
);

const dbClient = new DBClient(db);
const dbSetup = new DBSetup(db);
// dbSetup.setup();
// dbSetup.teardown();

// var corsOptions = {
//   origin: 'http://example.com',
// }

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
app.use(dbMiddleware(dbClient));
app = initPassport(app);

app.get('/', (req, res) => {
  res.send('success');
});

app.use('/v1', routes);

app.listen(env.app.port, env.app.host, () => {
  console.log(`[ ready ] http://${env.app.host}:${env.app.port}`);
});
