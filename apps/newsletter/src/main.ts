import express from 'express';
import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
  host: '127.0.0.1',
  port: 8080,
  projectId: 'dummy-project',
  ssl: false,
  credentials: {
    client_email:
      'firebase-adminsdk-vsq2r@dummy-project.iam.gserviceaccount.com',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nsdfjklsfglasjkfghaskljgakljsghklasjdghlaksjghklajsdghlaksghakjlsdgklasfglkasdgh=\n-----END PRIVATE KEY-----\n',
  },
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/test', async (req, res) => {
  const document = firestore.doc('/test/WnN44Gp2HIDZI5pDlLGO');

  // Update an existing document.
  await document.update({
    body: 'My first Firestore app',
  });

  // Read the document.
  const doc = await document.get();

  res.send({ doc });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
