import express from 'express';
import dbMiddleware from './middleware/db';
import { getUser } from './db/queries/user';
import {
  createTables,
  truncateTables,
  dropTables,
  initialData,
} from './db/init-db';
import db from './db/db';
import routes from './routes/index';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// initialData(db);
// createTables(db);

// dropTables(db);
// truncateTables(db);

const app = express();
app.use(express.json());
app.use(dbMiddleware);

app.use(async (req, res, next) => {
  const user = await req.db<User[]>`
    select * from users where first_name = 'isaac'
  `;
  req.userId = user[0].id;
  next();
});

app.use('/v1', routes);

app.get('/', async (req, res) => {
  console.log(req.body);
  res.send({ message: req.body });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
