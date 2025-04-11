import _ from 'lodash';
import 'reflect-metadata';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import { getConfig, isProduction } from './util';
import { createContext, appRouter } from './trpc';

import path from 'path';
import { container } from './inversify.config';
import { Kysely } from 'kysely';
import {
  DB,
  TYPES,
  ILocationDAO,
  INewsletterDAO,
  INewsletterPostDAO,
  ITemplateDAO,
  IUserDAO,
} from '@backend/types';
import {
  sessionMiddleware,
  passportMiddleware,
  trpcMiddleware,
  contextMiddleware,
} from './middleware';
import { authRoutes } from './auth';

const config = getConfig();

const corsConfig = isProduction()
  ? {
      credentials: true,
      origin: [
        `http://${config.client.host}:${config.client.port}`,
        `https://storage.googleapis.com/${config.gcs.bucketName}`,
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    }
  : {
      credentials: true, //false
      origin: 'http://localhost:4200', //'*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    };

console.log(corsConfig);

const app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(contextMiddleware);
passportMiddleware(app);
// app.use((req, res, next) => {
//   req.db = container.get<Kysely<DB>>(TYPES.DBClient);
//   req.dao = {
//     user: container.get<IUserDAO>(TYPES.IUserDAO),
//     newsletter: container.get<INewsletterDAO>(TYPES.INewsletterDAO),
//     location: container.get<ILocationDAO>(TYPES.ILocationDAO),
//     newsletterPost: container.get<INewsletterPostDAO>(TYPES.INewsletterPostDAO),
//     template: container.get<ITemplateDAO>(TYPES.ITemplateDAO),
//   };
//   next();
// });
// app = initPassport(app);
app.use('/v1/auth', authRoutes);

app.get('/health', (req, res) => {
  res.send({ status: 'OK' });
});

app.use('/v1/api/trpc', trpcMiddleware);

app.listen(config.app.port, config.app.host, () => {
  console.log(`[ ready ] http://${config.app.host}:${config.app.port}`);
});

if (Boolean(process.env.DISABLE_WEB) === false) {
  // web app
  const webApp = express();
  const webAppPath = path.join(__dirname, '..', '..', '..', '..', 'athena-frontend');
  webApp.use(express.static(webAppPath));

  webApp.get('*', (req, res) => {
    res.sendFile(path.join(webAppPath, 'index.html'));
  });

  webApp.listen(config.client.port, config.app.host, () => {
    console.log(`[ ready ] http://${config.app.host}:${config.client.port}`);
  });
}
