import postgres from 'postgres';

interface NewsletterInput {
  name: string;
  userId: number;
  googleDriveFolderId: string;
}

interface NewsletterItemPhotoInput
  extends Omit<DBNewsletterItemPhoto, 'id' | 'newsletterItemId'> {
  newsletterId: number;
}

export class DBClient {
  db: postgres.Sql;
  constructor(db: postgres.Sql) {
    this.db = db;
  }

  async getNewslettersForUserId(userId: number) {
    return await this.db`
    select 
      n.name as name, 
      n.start_date as start_date, 
      n.end_date as end_date,
      n.owner_id as owner_id,
      n.created as created,
      n.modified as modified
      from public.user_newsletters as un
      join public.newsletters as n
      on n.id = un.newsletter_id
      where un.user_id = ${userId}
    `;
  }

  async getNewsletterById(newsletterId: number) {
    const [newsletter]: [DBNewsletter?] = await this.db`
      select * from public.newsletters 
      where id = ${newsletterId}
    `;
    return newsletter;
  }

  async createNewsletter(input: NewsletterInput) {
    const now = new Date().toISOString();

    const [newsletter, userNewsletter] = await this.db.begin(async (sql) => {
      const [newsletter] = await sql`
      insert into public.newsletters ${sql(
        {
          name: input.name,
          created: now,
          modified: now,
          ownerId: input.userId,
          googleDriveFolderId: input.googleDriveFolderId,
        },
        'name',
        'created',
        'modified',
        'ownerId',
        'googleDriveFolderId'
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
    return newsletter;
  }

  async createNewsletterPhotoItem(input: NewsletterItemPhotoInput) {
    const now = new Date().toISOString();

    const [newsletterItem, newsletterPhotoItem] = await this.db.begin(
      async (sql) => {
        const [newsletterItem]: [DBNewsletterItem?] = await sql`
      insert into public.newsletter_items ${sql(
        {
          title: input.name,
          newsletterId: input.newsletterId,
          created: now,
          modified: now,
        },
        'title',
        'newsletterId',
        'created',
        'modified'
      )}
      returning *
    `;
        if (!newsletterItem) {
          throw new Error('Unable to create newsletter item');
        }
        const [newsletterPhotoItem]: [DBNewsletterItemPhoto?] = await sql`
        insert into public.newsletter_item_photos ${sql(
          {
            newsletterItemId: newsletterItem.id,
            name: input.name,
            caption: input.caption ?? null,
            locationId: input.locationId ?? null,
            format: input.format ?? null,
            size: input.size ?? null,
            link: input.link,
            googleDriveFileId: input.googleDriveFileId,
          },
          'newsletterItemId',
          'name',
          'caption',
          'locationId',
          'format',
          'size',
          'link',
          'googleDriveFileId'
        )}
        returning *
      `;
        if (!newsletterPhotoItem) {
          throw new Error('Unable to create newsletter item');
        }

        return [newsletterItem, newsletterPhotoItem];
      }
    );
    return newsletterPhotoItem;
  }

  async getUserByEmail(email: string) {
    const [user]: [DBUser?] = await this.db`
      select *
      from public.users
      where email=${email}
    `;
    return user;
  }

  async getUserById(id: number) {
    const [user]: [DBUser?] = await this.db`
      select *
      from public.users
      where id=${id}
    `;
    return user;
  }

  async createUser(userInput: Omit<DBUser, 'id'>) {
    const users = await this.db<DBUser[]>`
      insert into public.users
        (first_name, last_name, email)
        values
        (${userInput.firstName ?? null}, ${userInput.lastName ?? null}, ${
      userInput.email
    })
      returning *
    `;
    if (!users[0]) throw new Error('Unable to create user');
    return users[0];
  }

  async getCredentialsForProvider(
    credentials: Omit<DBFederatedCredentials, 'id' | 'userId'>
  ) {
    const [googleCredentials]: [DBFederatedCredentials] = await this.db`
      select *
      from public.federated_credentials
      where provider=${credentials.provider} and subject_id=${credentials.subjectId}
    `;
    return googleCredentials;
  }

  async createCredentialsForProvider(
    credentials: Omit<DBFederatedCredentials, 'id'>
  ) {
    const [googleCredentials]: [DBFederatedCredentials] = await this.db`
        insert into public.federated_credentials
          (provider, subject_id, user_id)
        values
          (${credentials.provider}, ${credentials.subjectId}, ${credentials.userId})
      returning *
      `;
    return googleCredentials;
  }
}
