import 'reflect-metadata';
import { container } from '../inversify.config';
import { INewsletterDAO, INewsletterItemDAO } from '@athena/dao';
import {
  CountryTableClient,
  UserNewsletterTableClient,
  NewsletterTableClient,
  UserTableClient,
  FederatedCredentialTableClient,
  LocationTableClient,
  NewsletterItemTableClient,
  NewsletterItemMediaTableClient,
  NewsletterItemTextTableClient,
  NewsletterItemTemplateTableClient,
  NewsletterItemTemplateDataTableClient,
  UserTemplateTableClient,
  ITable,
  TABLE_NAMES,
  DBConnection,
  NewsletterItemContainerTableClient,
} from '@athena/db';
import { TYPES } from '../types/types';
import { nanoid } from 'nanoid';
import {
  CreateNewsletterItemBatchInputItem,
  NewsletterItemTypeName,
} from '@athena/common';

const newsletterDAO = container.get<INewsletterDAO>(TYPES.INewsletterDAO);
const newsletterItemsDAO = container.get<INewsletterItemDAO>(
  TYPES.INewsletterItemDAO
);
const dbClient = container.get<DBConnection>(TYPES.DBClient);

export class DBManagerClient {
  tables: ITable[];
  constructor() {
    this.tables = [
      new LocationTableClient(dbClient, TABLE_NAMES.LOCATION),
      new CountryTableClient(dbClient, TABLE_NAMES.COUNTRY),
      new UserTableClient(dbClient, TABLE_NAMES.USER),
      new FederatedCredentialTableClient(
        dbClient,
        TABLE_NAMES.FEDEREATED_CREDENTIAL
      ),
      new NewsletterTableClient(dbClient, TABLE_NAMES.NEWSLETTER),
      new UserNewsletterTableClient(dbClient, TABLE_NAMES.USER_NEWSLETTER),
      new NewsletterItemTableClient(dbClient, TABLE_NAMES.NEWSLETTER_ITEM),
      new NewsletterItemMediaTableClient(
        dbClient,
        TABLE_NAMES.NEWSLETTER_ITEM_MEDIA
      ),
      new NewsletterItemTextTableClient(dbClient, TABLE_NAMES.NEWSLETTER_ITEM_TEXT),
      new NewsletterItemContainerTableClient(
        dbClient,
        TABLE_NAMES.NEWSLETTER_ITEM_CONTAINER
      ),
      new NewsletterItemTemplateTableClient(
        dbClient,
        TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE
      ),
      new NewsletterItemTemplateDataTableClient(
        dbClient,
        TABLE_NAMES.NEWSLETTER_ITEM_TEMPLATE_DATA
      ),
      new UserTemplateTableClient(dbClient, TABLE_NAMES.USER_TEMPLATE),
    ];
  }
  async createTables() {
    for (let i = 0; i < this.tables.length; i++) {
      await this.tables[i].createTable();
    }
  }

  async dropTables() {
    for (let i = 0; i < this.tables.length; i++) {
      await this.tables[i].deleteTable();
    }
  }

  async seed() {
    console.log('seeding...');
    const user = await dbClient
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
    const newsletterId = await newsletterDAO.post(user.id, {
      name: 'Monthly Newsletter',
      startDate: new Date(2024, 1, 1).toISOString(),
      endDate: new Date(2024, 1, 30).toISOString(),
    });
    console.log('newsletter created!');
    console.log(newsletterId);

    const movieReviewId = nanoid();
    const movieReviewRatingId = nanoid();
    const movieReviewThoughtsId = nanoid();

    const movieReview: CreateNewsletterItemBatchInputItem = {
      title: 'Movie Review',
      newsletterId,
      temp: {
        id: movieReviewId,
        parentId: null,
        nextId: null,
        prevId: null,
      },
      details: {
        type: NewsletterItemTypeName.Container,
        name: 'Movie Review',
      },
    };

    const movieReviewThoughts: CreateNewsletterItemBatchInputItem = {
      title: 'Thoughts',
      newsletterId,
      temp: {
        id: movieReviewThoughtsId,
        parentId: movieReviewId,
        nextId: movieReviewRatingId,
        prevId: null,
      },
      details: {
        type: NewsletterItemTypeName.Text,
        name: 'It was pretty good',
      },
    };
    const movieReviewRating: CreateNewsletterItemBatchInputItem = {
      title: 'Rating',
      newsletterId,
      temp: {
        id: movieReviewRatingId,
        parentId: movieReviewId,
        nextId: null,
        prevId: movieReviewThoughtsId,
      },
      details: {
        type: NewsletterItemTypeName.Text,
        name: '7/10',
      },
    };
    const inputBatch = {
      newsletterId,
      parentId: null,
      nextItemId: null,
      previousItemId: null,
      batch: [movieReview, movieReviewThoughts, movieReviewRating],
    };

    const ids = await newsletterItemsDAO.postBatch(user.id, inputBatch);
  }
}

// Monthly newsletter
// kitty of the month
//  - photo
//  - winner
//  - summary of why they won

// movie review
//  - link to the movie
//  - rating
//  - thoughts

//
