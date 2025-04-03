import 'reflect-metadata';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import { getConfig } from './util';
import { createContext, appRouter, initPassport } from './trpc';
import path from 'path';

const config = getConfig();

export let app = express();
app.use(
  cors({
    // credentials: true,
    // origin: [
    //   `http://${config.client.host}:${config.client.port}`,
    //   'https://storage.googleapis.com/athena-newsletter',
    // ],
    credentials: false,
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

if (process.env.NODE_ENV === 'production') {
  // web app
  const webApp = express();
  const webAppPath = path.join(__dirname, '..', '..', '..', '..', 'athena-frontend');
  webApp.use(express.static(webAppPath));

  webApp.get('*', (req, res) => {
    res.sendFile(path.join(webAppPath, 'index.html'));
  });

  webApp.listen(config.client.port, config.client.host, () => {
    console.log(`[ ready ] http://${config.client.host}:${config.client.port}`);
  });
}
