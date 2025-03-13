import _ from 'lodash';
import { appRouter as router } from '../../trpc/routes';
import { createContext } from '../../trpc/context';
import { createFixture } from '../setup';
import { getNewsletter } from '../test-util';
import { DBManagerClient, SelectNewsletter, SelectUser } from '@athena/db';
import { CreateNewsletter } from '@athena/common';

// const now = new Date(2024, 1, 1);
// Date.now = jest.fn(() => now.getTime());

const dbClient = new DBManagerClient();

describe('newsletter routes', () => {
  afterAll(async () => {
    await dbClient.truncateTables(['user']);
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
      items: [],
    });
  });
  test('post', async () => {
    const entities = await createFixture('user.yaml');
    const user = _.get(entities, ['user', 0]) as SelectUser;

    const newsletterInput: CreateNewsletter = {
      properties: {
        name: 'test newsletter 1',
        dateRange: {
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
      },
    };
    const newsletterId = (await router.newsletters.post({
      ctx: createContext({
        req: {
          user: {
            userId: user.id,
          },
          isAuthenticated: () => true,
        } as any,
        res: {} as any,
      }),
      path: '',
      rawInput: newsletterInput,
      type: router.newsletters.post._type,
    })) as number;

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
      items: [],
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

      await router.newsletters.update({
        ctx: createContext({
          req: {
            user: {
              userId: user.id,
            },
            isAuthenticated: () => true,
          } as any,
          res: {} as any,
        }),
        path: '',
        rawInput: { ...newsletterInput, id: existingNewsletter.id },
        type: router.newsletters.update._type,
      });

      const newsletter = await getNewsletter(user.id, existingNewsletter.id);
      console.log(JSON.stringify(newsletter, null, 4));
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
        items: [],
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

    await router.newsletters.delete({
      ctx: createContext({
        req: {
          user: {
            userId: user.id,
          },
          isAuthenticated: () => true,
        } as any,
        res: {} as any,
      }),
      path: '',
      rawInput: {
        id: existingNewsletter.id,
      },
      type: router.newsletters.delete._type,
    });
    const newsletter = getNewsletter(user.id, existingNewsletter.id);
    expect(newsletter).rejects.toEqual(
      new Error(`newsletter with id: ${existingNewsletter.id} does not exist`)
    );
  });
});
