import { Router } from 'express';
import postgres from 'postgres';

import { google } from 'googleapis';

const router = Router();

interface NewsletterInput {
  name: string;
  userId: string;
}

async function createNewsletter(db: postgres.Sql, input: NewsletterInput) {
  const now = new Date().toISOString();

  // const res = await drive_v3.files.create({
  //   requestBody: {
  //     name: 'Test',
  //     mimeType: 'text/plain'
  //   },
  //   media: {
  //     mimeType: 'text/plain',
  //     body: 'Hello World'
  //   }
  // });

  // const [newsletter, userNewsletter] = await db.begin(async (sql) => {
  //   const [newsletter] = await sql`
  //   insert into public.newsletters ${sql(
  //     { ...input, created: now, modified: now },
  //     'name',
  //     'created',
  //     'modified'
  //   )}
  //   returning *
  // `;

  //   const [userNewsletter] = await sql`
  //     insert into public.user_newsletters (
  //       user_id,
  //       newsletter_id
  //     ) values (
  //       ${input.userId},
  //        ${newsletter.id}
  //     )
  //     returning *
  //   `;
  //   return [newsletter, userNewsletter];
  // });
  // console.log(newsletter);
  // console.log(userNewsletter);

  //   return await db`
  //     insert into public.newsletters ${db(
  //       { ...input, created: now, modified: now },
  //       'name',
  //       'created',
  //       'modified'
  //     )}
  //   `;
}

async function getNewsletters(db: postgres.Sql, input: NewsletterInput) {
  const now = new Date().toISOString();
  return await db`
      insert into public.newsletters ${db(
        { ...input, created: now, modified: now },
        'name',
        'created',
        'modified'
      )}
    `;
}

async function getNewsletterById(db: postgres.Sql, input: NewsletterInput) {
  const now = new Date().toISOString();
  return await db`
      insert into public.newsletters ${db(
        { ...input, created: now, modified: now },
        'name',
        'created',
        'modified'
      )}
    `;
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.get('/', isAuthenticated, async (req, res) => {
  res.send('GET: newsletters');
  console.log(req.user);
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: req.user['accessToken'] });
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  // Example: List files in the user's Google Drive
  const response = await drive.files.list({
    pageSize: 10,
    fields: 'files(id, name)',
  });

  const files = response.data.files;
  console.log(files);
});

router.post('/', (req, res) => {
  console.log(req.body);

  // createNewsletter(req.db, {
  //   userId: req.userId,
  //   ...req.body,
  // });

  res.send('POST: newsletters');
});

router.get('/:newsletterId', (req, res) => {
  res.send(req.params);
});

export default router;
