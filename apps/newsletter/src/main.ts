import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import { appRouter } from './routes/index';
import { initPassport } from './routes/auth';
import { parseEnv } from './util/parse-env';
import { createContext } from './trpc/context';

const env = parseEnv();

export let app = express();
app.use(
  cors({
    credentials: true,
    origin: `http://${env.client.host}:${env.client.port}`,
    AccessControlAllowOrigin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app = initPassport(app);

app.get('/health', (req, res) => {
  res.send({ status: 'OK' });
});

app.use(
  '/api/v1/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  })
);

app.listen(env.app.port, env.app.host, () => {
  console.log(`[ ready ] http://${env.app.host}:${env.app.port}`);
});
