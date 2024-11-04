import 'reflect-metadata';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import { parseEnv } from './util';
import { createContext, appRouter, initPassport } from './trpc';

const env = parseEnv();

export let app = express();
app.use(
  cors({
    // credentials: true,
    credentials: false,
    // origin: [
    //   `http://${env.client.host}:${env.client.port}`,
    //   'https://storage.googleapis.com/athena-newsletter',
    // ],
    origin: '*',
    AccessControlAllowOrigin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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
    onError(opts) {
      const { error, type, path, input, ctx, req } = opts;
      console.error('Error:', error);
      // if (error.code === 'INTERNAL_SERVER_ERROR') {
      // }
    },
  })
);

app.listen(env.app.port, env.app.host, () => {
  console.log(`[ ready ] http://${env.app.host}:${env.app.port}`);
});
