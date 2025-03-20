import 'reflect-metadata';
import { container } from '../inversify.config';
import { INewsletterDAO, INewsletterPostDAO } from '@athena/dao';
import {
  CountryTableClient,
  UserNewsletterTableClient,
  NewsletterTableClient,
  UserTableClient,
  FederatedCredentialTableClient,
  LocationTableClient,
  NewsletterPostTableClient,
  NewsletterPostMediaTableClient,
  NewsletterPostTextTableClient,
  // NewsletterPostTemplateTableClient,
  // NewsletterPostTemplateDataTableClient,
  // UserTemplateTableClient,
  ITable,
  TABLE_NAMES,
  DBConnection,
  NewsletterPostContainerTableClient,
  sql,
} from '@athena/db';
import { TYPES } from '../types/types';
// import { nanoid } from 'nanoid';
// import {
//   NewsletterPostPostName,
//   CreateNewsletterPostBatchItem,
// } from '@athena/common';

export class DBManagerClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tables: ITable<any, any>[];
  client: DBConnection;
  newsletterDAO: INewsletterDAO;
  newsletterItemsDAO: INewsletterPostDAO;
  constructor() {
    this.client = container.get<DBConnection>(TYPES.DBClient);
    this.newsletterDAO = container.get<INewsletterDAO>(TYPES.INewsletterDAO);
    this.newsletterItemsDAO = container.get<INewsletterPostDAO>(
      TYPES.INewsletterPostDAO
    );
    this.tables = [
      new LocationTableClient(this.client, TABLE_NAMES.LOCATION),
      new CountryTableClient(this.client, TABLE_NAMES.COUNTRY),
      new UserTableClient(this.client, TABLE_NAMES.USER),
      new FederatedCredentialTableClient(
        this.client,
        TABLE_NAMES.FEDEREATED_CREDENTIAL
      ),
      new NewsletterTableClient(this.client, TABLE_NAMES.NEWSLETTER),
      new UserNewsletterTableClient(this.client, TABLE_NAMES.USER_NEWSLETTER),
      new NewsletterPostTableClient(this.client, TABLE_NAMES.NEWSLETTER_POST),
      new NewsletterPostMediaTableClient(
        this.client,
        TABLE_NAMES.NEWSLETTER_POST_MEDIA
      ),
      new NewsletterPostTextTableClient(
        this.client,
        TABLE_NAMES.NEWSLETTER_POST_TEXT
      ),
      new NewsletterPostContainerTableClient(
        this.client,
        TABLE_NAMES.NEWSLETTER_POST_CONTAINER
      ),
      // new NewsletterPostTemplateTableClient(
      //   this.client,
      //   TABLE_NAMES.NEWSLETTER_POST_TEMPLATE
      // ),
      // new NewsletterPostTemplateDataTableClient(
      //   this.client,
      //   TABLE_NAMES.NEWSLETTER_POST_TEMPLATE_DATA
      // ),
      // new UserTemplateTableClient(this.client, TABLE_NAMES.USER_TEMPLATE),
    ];
  }
  async createTables() {
    for (let i = 0; i < this.tables.length; i++) {
      await this.tables[i].createTable();
    }
    await this.addCustom();
  }

  async dropTables() {
    for (let i = 0; i < this.tables.length; i++) {
      await this.tables[i].deleteTable();
    }
  }

  async truncateTables(ignore?: string[]) {
    for (let i = 0; i < this.tables.length; i++) {
      if (!ignore || !ignore.includes(this.tables[i].name))
        await this.tables[i].truncateTable();
    }
  }

  async addCustom() {
    await sql`
      ALTER TABLE newsletter_post
      ADD CONSTRAINT newsletter_post_nextId_fkey
      FOREIGN KEY (${sql.ref('nextId')}) 
      REFERENCES newsletter_post(id)
      DEFERRABLE INITIALLY DEFERRED
    `.execute(this.client);

    await sql`
      ALTER TABLE newsletter_post
      ADD CONSTRAINT newsletter_post_prevId_fkey
      FOREIGN KEY (${sql.ref('prevId')}) 
      REFERENCES newsletter_post(id)
      DEFERRABLE INITIALLY DEFERRED
      `.execute(this.client);
  }

  async seed() {
    console.log('seeding...');
    const user = await this.client
      .insertInto('user')
      .values({
        firstName: 'SUPER',
        lastName: 'USER',
        email: 'isaac.2962@gmail.com',
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    console.log('user created!');
    console.log(user);
    // const newsletterId = await this.newsletterDAO.post(user.id, {
    //   properties: {
    //     name: 'Monthly Newsletter',
    //     dateRange: {
    //       start: new Date(2024, 1, 1).toISOString(),
    //       end: new Date(2024, 1, 30).toISOString(),
    //     },
    //   },
    // });
    // console.log('newsletter created!');
    // console.log(newsletterId);

    // const movieReviewId = nanoid();
    // const movieReviewRatingId = nanoid();
    // const movieReviewThoughtsId = nanoid();

    // const movieReview: CreateNewsletterPostBatchItem<NewsletterPostPostName.Container> =
    // {
    //   title: 'Movie Review',
    //   newsletterId,
    //   temp: {
    //     id: movieReviewId,
    //     parentId: null,
    //     nextId: null,
    //     prevId: null,
    //   },
    //   details: {
    //     type: NewsletterPostPostName.Container,
    //     name: 'Movie Review',
    //   },
    // };

    // const movieReviewThoughts: CreateNewsletterPostBatchItem<NewsletterPostPostName.Text> =
    // {
    //   title: 'Thoughts',
    //   newsletterId,
    //   temp: {
    //     id: movieReviewThoughtsId,
    //     parentId: movieReviewId,
    //     nextId: movieReviewRatingId,
    //     prevId: null,
    //   },
    //   details: {
    //     type: NewsletterPostPostName.Text,
    //     name: 'It was pretty good',
    //   },
    // };
    // const movieReviewRating: CreateNewsletterPostBatchItem<NewsletterPostPostName.Text> =
    // {
    //   title: 'Rating',
    //   newsletterId,
    //   temp: {
    //     id: movieReviewRatingId,
    //     parentId: movieReviewId,
    //     nextId: null,
    //     prevId: movieReviewThoughtsId,
    //   },
    //   details: {
    //     type: NewsletterPostPostName.Text,
    //     name: '7/10',
    //   },
    // };
    // const inputBatch = {
    //   newsletterId,
    //   position: {
    //     parentId: null,
    //     nextId: null,
    //     prevId: null,
    //   },
    //   batch: [movieReview, movieReviewThoughts, movieReviewRating],
    // };

    // const ids = await this.newsletterItemsDAO.postBatch(user.id, inputBatch);
  }
}
