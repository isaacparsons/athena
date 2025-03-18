import _ from 'lodash';
import { createFixture } from '../setup';
import {
  createNewsletter,
  deleteNewsletter,
  getNewsletter,
  updateNewsletter,
} from '../test-util';
import { DBManagerClient, SelectNewsletter, SelectUser } from '@athena/db';
import { CreateNewsletter } from '@athena/common';

const dbClient = new DBManagerClient();

describe('newsletter routes', () => {
  afterAll(async () => {
    await dbClient.truncateTables(['user']);
    await dbClient.truncateTables(['newsletter']);
    await dbClient.truncateTables(['user_newsletter']);
  });
  test('get', async () => {
    const entities = await createFixture('newsletter.yaml');
    const user = _.get(entities, ['user', 0]) as SelectUser;
    const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

    const createdNewsletter = await getNewsletter(user.id, newsletter.id);

    expect(createdNewsletter).toEqual({
      id: expect.any(Number),
      meta: {
        creator: user,
        created: expect.any(String),
      },
      properties: {
        name: newsletter.name,
        dateRange: {
          start: expect.any(String),
          end: expect.any(String),
        },
      },
      owner: user,
      members: expect.arrayContaining([user]),
      posts: [],
    });
  });
  test('post', async () => {
    const entities = await createFixture('user.yaml');
    const user = _.get(entities, ['user', 0]) as SelectUser;

    const newsletterInput: CreateNewsletter = {
      properties: {
        name: 'test newsletter 2',
        dateRange: {
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
      },
    };
    const newsletterId = await createNewsletter(user.id, newsletterInput);

    const createdNewsletter = await getNewsletter(user.id, newsletterId);

    expect(createdNewsletter).toEqual({
      id: newsletterId,
      meta: {
        creator: user,
        created: expect.any(String),
      },
      properties: newsletterInput.properties,
      owner: user,
      members: expect.arrayContaining([user]),
      posts: [],
    });
  });
  describe('update', () => {
    test('update name and date', async () => {
      const entities = await createFixture('newsletter.yaml');
      const user = _.get(entities, ['user', 0]) as SelectUser;
      const existingNewsletter = _.get(entities, [
        'newsletter',
        0,
      ]) as SelectNewsletter;

      const newsletterInput: CreateNewsletter = {
        properties: {
          name: 'updated test newsletter 1',
          dateRange: {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
          },
        },
      };

      await updateNewsletter(user.id, {
        ...newsletterInput,
        id: existingNewsletter.id,
      });

      const newsletter = await getNewsletter(user.id, existingNewsletter.id);
      expect(newsletter).toEqual({
        id: existingNewsletter.id,
        meta: {
          creator: user,
          created: expect.any(String),
          modified: expect.any(String),
          modifier: user,
        },
        properties: newsletterInput.properties,
        owner: user,
        members: expect.arrayContaining([user]),
        posts: [],
      });
    });
  });
  test('delete', async () => {
    const entities = await createFixture('newsletter.yaml');
    const user = _.get(entities, ['user', 0]) as SelectUser;
    const existingNewsletter = _.get(entities, [
      'newsletter',
      0,
    ]) as SelectNewsletter;

    await deleteNewsletter(user.id, existingNewsletter.id);
    const newsletter = getNewsletter(user.id, existingNewsletter.id);
    await expect(newsletter).rejects.toEqual(
      new Error(`newsletter with id: ${existingNewsletter.id} does not exist`)
    );
  });
});
