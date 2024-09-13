import { Router } from 'express';
import postgres from 'postgres';

const router = Router();

interface NewsletterInput {
  name: string;
  userId: string;
}

async function createNewsletter(db: postgres.Sql, input: NewsletterInput) {
  const now = new Date().toISOString();

  const [newsletter, userNewsletter] = await db.begin(async (sql) => {
    const [newsletter] = await sql`
    insert into public.newsletters ${sql(
      { ...input, created: now, modified: now },
      'name',
      'created',
      'modified'
    )}
    returning *
  `;

    const [userNewsletter] = await sql`
      insert into public.user_newsletters (
        user_id,
        newsletter_id
      ) values (
        ${input.userId},
         ${newsletter.id}
      )
      returning *
    `;
    return [newsletter, userNewsletter];
  });
  console.log(newsletter);

  console.log(userNewsletter);

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

router.get('/', (req, res) => {
  res.send('GET: newsletters');
});

router.post('/', (req, res) => {
  console.log(req.body);

  createNewsletter(req.db, {
    userId: req.userId,
    ...req.body,
  });
  res.send('POST: newsletters');
});

router.get('/:newsletterId', (req, res) => {
  res.send(req.params);
});

export default router;
