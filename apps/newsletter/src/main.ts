import 'reflect-metadata';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import { getConfig } from './util';
import { createContext, appRouter, initPassport } from './trpc';

const config = getConfig();

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
    // AccessControlAllowOrigin: '*',
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

app.listen(config.app.port, config.app.host, () => {
  console.log(`[ ready ] http://${config.app.host}:${config.app.port}`);
});
