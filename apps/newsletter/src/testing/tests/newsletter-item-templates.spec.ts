import { appRouter as router } from '../../routes/index';
import { createContext } from '../../trpc/context';
import { createNewsletter } from '../fixtures/newsletters';
import { trpc } from '../../trpc/trpc';

import {
  CreateNewsletterItemTemplateInput,
  CreateTextItemDetailsInput,
  NewsletterItemType,
} from '@athena/athena-common';

const testCaller = trpc.createCallerFactory(router)(
  createContext({
    req: {
      headers: {},
      user: {
        userId: 1,
      },
    } as any,
    res: {} as any,
  })
);

const now = new Date(2024, 1, 1);
Date.now = jest.fn(() => now.getTime());

const newsletterName = 'test newsletter 1';
describe('newsletter item template routes', () => {
  let newsletter;
  // let user;

  beforeAll(async () => {
    // user = await createUser();
    newsletter = await createNewsletter(1, newsletterName);
  });

  const movieReviewInput: CreateNewsletterItemTemplateInput = {
    name: 'movie review',
    data: [
      {
        temp: {
          id: 1,
          parentId: null,
          nextId: 2,
          prevId: null,
        },
        data: {
          type: NewsletterItemType.text,
          name: 'thoughts',
          description: 'it was good',
        },
      },
      {
        temp: {
          id: 2,
          parentId: null,
          nextId: null,
          prevId: 1,
        },
        data: {
          type: NewsletterItemType.text,
          name: 'rating',
          description: '8/10',
        },
      },
    ],
  };

  describe('create newsletter item template', () => {
    test('create a movie review template', async () => {
      const templateId = await testCaller.newsletterItemTemplates.create(
        movieReviewInput
      );

      const result = await testCaller.newsletterItemTemplates.get({
        id: templateId,
      });
      console.log('template', JSON.stringify(result, null, 6));
    });
    test('create a movie theatre review template', async () => {
      const templateId = await testCaller.newsletterItemTemplates.create(
        movieReviewInput
      );

      const movieTheatreReviewInput: CreateNewsletterItemTemplateInput = {
        name: 'movie theatre review',
        data: [
          {
            temp: {
              id: 1,
              parentId: null,
              nextId: 4,
              prevId: null,
            },
          },
          {
            temp: {
              id: 2,
              parentId: 1,
              nextId: 3,
              prevId: null,
            },
            data: {
              type: NewsletterItemType.text,
              name: 'distance',
              description: 'it was close',
            },
          },
          {
            temp: {
              id: 3,
              parentId: 1,
              nextId: null,
              prevId: 2,
            },
            data: {
              type: NewsletterItemType.text,
              name: 'snacks',
              description: 'large selection',
            },
          },
          {
            temp: {
              id: 4,
              parentId: null,
              nextId: 5,
              prevId: 1,
            },
            templateId: templateId,
          },
          {
            temp: {
              id: 5,
              parentId: null,
              nextId: null,
              prevId: 4,
            },
            data: {
              type: NewsletterItemType.text,
              name: 'Conclusion',
              description: '',
            },
          },
        ],
      };

      const movieTheatreTemplateId =
        await testCaller.newsletterItemTemplates.create(
          movieTheatreReviewInput
        );

      const result = await testCaller.newsletterItemTemplates.get({
        id: movieTheatreTemplateId,
      });
      console.log('template', JSON.stringify(result, null, 6));
    });
  });
});
