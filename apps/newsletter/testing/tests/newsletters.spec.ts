import { DateTime } from 'luxon';
import { appRouter as router } from '../../src/routes/index';
import { createContext } from '../../src/trpc/context';
import { createNewsletter } from '../fixtures/newsletters';
import { createUser } from '../fixtures/users';

const now = new Date(2024, 1, 1);
Date.now = jest.fn(() => now.getTime());

const getNewsletter = async (userId: number, id: number) => {
  return router.newsletters.get({
    ctx: createContext({
      req: {
        user: {
          id: userId,
        },
      } as any,
      res: {} as any,
    }),
    path: '',
    rawInput: {
      newsletterId: id,
    },
    type: router.newsletters.get._type,
  });
};

describe('newsletter routes', () => {
  test('get', async () => {
    const newsletterInput = {
      name: 'test newsletter 1',
    };
    const user1 = await createUser();
    const existingNewsletter = await createNewsletter(
      user1.id,
      newsletterInput.name
    );

    const newsletter = await getNewsletter(user1.id, existingNewsletter.id);
    expect(newsletter).toEqual({
      meta: {
        creator: user1,
        created: expect.any(Date),
        modified: null,
        modifier: null,
      },
      properties: {
        name: newsletterInput.name,
        dateRange: {
          start: expect.any(Date),
          end: expect.any(Date),
        },
      },
      owner: user1,
      members: expect.arrayContaining([user1]),
      items: [],
    });
  });
  test('post', async () => {
    const user1 = await createUser();
    const newsletterInput = {
      name: 'test newsletter 1',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
    const newsletter = await router.newsletters.post({
      ctx: createContext({
        req: {
          user: {
            id: user1.id,
          },
        } as any,
        res: {} as any,
      }),
      path: '',
      rawInput: newsletterInput,
      type: router.newsletters.post._type,
    });
    expect(newsletter).toEqual({
      id: expect.any(Number),
      name: newsletterInput.name,
      ownerId: user1.id,
      startDate: expect.any(Date),
      endDate: expect.any(Date),
      created: expect.any(Date),
      modified: null,
      creatorId: user1.id,
      modifierId: null,
    });
  });
  describe('update', () => {
    test('update name and date', async () => {
      const newsletterInput = {
        name: 'updated test newsletter 1',
        startDate: DateTime.now().toISO(),
        endDate: DateTime.now().plus({ day: 1 }).toISO(),
      };
      const user1 = await createUser();
      const existingNewsletter = await createNewsletter(
        user1.id,
        newsletterInput.name
      );

      await router.newsletters.update({
        ctx: createContext({
          req: {
            user: {
              id: user1.id,
            },
          } as any,
          res: {} as any,
        }),
        path: '',
        rawInput: { ...newsletterInput, id: existingNewsletter.id },
        type: router.newsletters.update._type,
      });

      const newsletter = await getNewsletter(user1.id, existingNewsletter.id);
      expect(newsletter).toEqual({
        meta: {
          creator: user1,
          created: expect.any(Date), // now, //TODO: fix this
          modified: expect.any(Date), //now, //TODO: fix this
          modifier: user1,
        },
        properties: {
          name: newsletterInput.name,
          dateRange: {
            start: new Date(newsletterInput.startDate),
            end: new Date(newsletterInput.endDate),
          },
        },
        owner: user1,
        members: expect.arrayContaining([user1]),
        items: [],
      });
    });
  });
  test('delete', async () => {
    const newsletterInput = {
      name: 'test newsletter 1',
    };
    const user1 = await createUser();
    const existingNewsletter = await createNewsletter(
      user1.id,
      newsletterInput.name
    );

    await router.newsletters.delete({
      ctx: createContext({
        req: {
          user: {
            id: user1.id,
          },
        } as any,
        res: {} as any,
      }),
      path: '',
      rawInput: {
        id: existingNewsletter.id,
      },
      type: router.newsletters.delete._type,
    });
    const newsletter = getNewsletter(user1.id, existingNewsletter.id);
    expect(newsletter).rejects.toEqual(
      new Error(`newsletter with id: ${existingNewsletter.id} does not exist`)
    );
  });
});
