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
      n.id as id,
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

  async getNewsletterById(
    userId: number,
    newsletterId: number
  ): Promise<Newsletter> {
    const [newsletter]: [DBNewsletter?] = await this.db`
      select n.* from public.user_newsletters as un
      join public.newsletters as n
      on n.id = un.newsletter_id 
      where un.newsletter_id = ${newsletterId} and un.user_id = ${userId}
    `;
    if (!newsletter) {
      throw new Error('newsletter does not exist');
    }
    const [owner]: [User?] = await this.db`
      select * from public.users as u
      where u.id = ${newsletter.ownerId}
    `;
    if (!owner) {
      throw new Error('owner does not exist');
    }
    const members = await this.db<User[]>`
     select u.* from public.user_newsletters as un
      join public.users as u
      on u.id = un.user_id
      where un.newsletter_id=${newsletter.id}
    `;

    const _photos = await this.db`
      select 
      ni.id as newsletter_item_id,
      ni.newsletter_id as newsletter_id,
      ni.title as title,
      ni.created as created,
      ni.modified as modified,
      nip.id as newsletter_photo_id,
      nip.link as link,
      nip.google_drive_file_id as google_drive_file_id,
      nip.name as name,
      nip.caption as caption,
      nip.format as format,
      nip.size as size
      from public.newsletter_items as ni
      left join public.newsletter_item_photos as nip
      on nip.newsletter_item_id = ni.id
      where ni.newsletter_id=${newsletter.id}
    `;
    const photos = _photos.map((item) => {
      return {
        id: item.id,
        newsletterId: item.newsletter_id,
        title: item.title,
        created: item.created,
        modified: item.modified,
        item: {
          newsletterItemId: item.newsletter_item_id,
          id: item.newsletter_photo_id,
          link: item.link,
          googleDriveFileId: item.google_drive_file_id,
          name: item.name,
          caption: item.caption,
          // location: ,
          format: item.format,
          size: item.size,
        },
      };
    });
    return {
      id: newsletter.id,
      name: newsletter.name,
      created: newsletter.created,
      modified: newsletter.modified,
      owner: owner,
      members: members,
      startDate: newsletter.startDate,
      endDate: newsletter.endDate,
      googleDriveFolderId: newsletter.googleDriveFolderId,
      items: photos,
    };
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
