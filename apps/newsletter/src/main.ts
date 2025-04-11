import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { getConfig, isAuthEnabled, isProduction } from './util';
import path from 'path';
import {
  sessionMiddleware,
  passportMiddleware,
  trpcMiddleware,
  contextMiddleware,
} from './middleware';
import { authRoutes } from './auth';

const config = getConfig();
console.log({ config, authEnabled: isAuthEnabled() });

const HOST = `http://${config.client.host}:${config.client.port}`;
const corsConfig = isProduction()
  ? {
      credentials: true,
      origin: [HOST, `https://storage.googleapis.com/${config.gcs.bucketName}`],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    }
  : {
      credentials: isAuthEnabled(),
      origin: isAuthEnabled()
        ? [HOST, `https://storage.googleapis.com/${config.gcs.bucketName}`]
        : '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    };

let app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(contextMiddleware);
app = passportMiddleware(app);
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
