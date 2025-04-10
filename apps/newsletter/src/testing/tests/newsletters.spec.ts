import _ from 'lodash';
import { createFixture } from '../setup';
import {
  createNewsletter,
  deleteNewsletter,
  getNewsletter,
  inviteNewsletterUser,
  updateNewsletter,
} from '../test-util';
import { DBManagerClient, SelectNewsletter, SelectUser } from '@backend/db';
import { NewsletterRole, CreateNewsletter } from '@athena/common';
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
  describe('invite user', () => {
    test('invite user', async () => {
      const entities1 = await createFixture('newsletter.yaml');
      const entities2 = await createFixture('user.yaml');
      const user1 = _.get(entities1, ['user', 0]) as SelectUser;
      const user2 = _.get(entities2, ['user', 0]) as SelectUser;

      const existingNewsletter = _.get(entities1, [
        'newsletter',
        0,
      ]) as SelectNewsletter;

      await inviteNewsletterUser(user1.id, {
        newsletterId: existingNewsletter.id,
        email: user2.email,
        role: NewsletterRole.READ_ONLY,
      });
      const newsletter = await getNewsletter(user1.id, existingNewsletter.id);
      expect(newsletter.members).toEqual(expect.arrayContaining([user1, user2]));
    });
    test('throw error if a user with invalid permissions tries to invite a user', async () => {
      const entities = await createFixture('newsletter-with-read-only-member.yaml');
      const entities2 = await createFixture('user.yaml');
      const user1 = _.get(entities, ['user', 0]) as SelectUser;
      const user2 = _.get(entities, ['user', 1]) as SelectUser;
      const user3 = _.get(entities2, ['user', 0]) as SelectUser;

      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;

      const invite = inviteNewsletterUser(user2.id, {
        newsletterId: newsletter.id,
        email: user3.email,
        role: NewsletterRole.READ_ONLY,
      });
      await expect(invite).rejects.toEqual(new Error('Do not have permissions'));
    });
  });
});
