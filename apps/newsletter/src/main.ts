import express from 'express';
import dbMiddleware from './middleware/db';
import { setupDb, truncateTables, dropTables } from './db/init-db';
import db from './db/db';
import routes from './routes/index';
import { initPassport } from './routes/auth';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// dropTables(db);
// setupDb(db);

let app = express();
app.use(express.json());
app.use(dbMiddleware);
app = initPassport(app);

app.get('/', (req, res) => {
  res.send('success');
});

app.use('/v1', routes);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
