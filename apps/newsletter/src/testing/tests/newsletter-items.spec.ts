import { createFixture } from '../setup';
import _ from 'lodash';
import { appRouter as router } from '../../trpc/routes';
import {
  CreateNewsletterPost,
  CreateNewsletterPostBatchItem,
  CreateNewsletterPostDetailsText,
  CreateNewsletterPostsBatch,
  NewsletterPostPostName,
} from '@athena/common';
import { SelectNewsletter, SelectUser } from '@athena/db';
import { createMockRequest } from '../test-util';

// const now = new Date(2024, 1, 1);
// Date.now = jest.fn(() => now.getTime());

// const userId = 1;
// const newsletterName = 'test newsletter 1';

describe('newsletter item routes', () => {
  //   let newsletter;
  //   beforeAll(async () => {
  //     newsletter = await createNewsletter(userId, newsletterName);
  //   });

  describe('create newsletter item', () => {
    test('add items to newsletter', async () => {
      const entities = await createFixture('newsletter.yaml');
      const user = _.get(entities, ['user', 0]) as SelectUser;
      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;
      const inputNode: CreateNewsletterPostBatchItem = {
        newsletterId: newsletter.id,
        title: 'node item 1',
        temp: {
          id: '1',
          parentId: null,
          nextId: null,
          prevId: null,
        },
        details: {
          type: NewsletterPostPostName.Container,
          name: 'container',
        },
      };

      const inputTextItem1: CreateNewsletterPostBatchItem = {
        newsletterId: newsletter.id,
        title: 'text item 1',
        temp: {
          id: '2',
          parentId: '1',
          nextId: '3',
          prevId: null,
        },
        details: {
          type: 'text',
          name: 'text item 1',
        } as CreateNewsletterPostDetailsText,
      };
      const inputTextItem2: CreateNewsletterPostBatchItem = {
        newsletterId: newsletter.id,
        title: 'text item 2',
        temp: {
          id: '3',
          parentId: '1',
          nextId: null,
          prevId: '2',
        },
        details: {
          type: NewsletterPostPostName.Text,
          name: 'text item 2',
        } as CreateNewsletterPostDetailsText,
      };
      const inputBatch: CreateNewsletterPostsBatch = {
        newsletterId: newsletter.id,
        position: {
          parentId: null,
          nextId: null,
          prevId: null,
        },
        batch: [inputNode, inputTextItem1, inputTextItem2],
      };

      const ids = (await router.newsletterItems.createBatch(
        createMockRequest(user.id, inputBatch)
      )) as number[];

      for (let i = 0; i < ids.length; i++) {
        const newsletterItem = await router.newsletterItems.get(
          createMockRequest(user.id, { id: ids[i] })
        );
        console.log(JSON.stringify(newsletterItem, null, 6));
      }

      // expect(newsletterItem).toEqual({
      //   id: expect.any(Number),
      //   title: 'test text item 1',
      //   newsletterId: newsletter.id,
      //   date: null,
      //   locationId: expect.any(Number),
      //   created: expect.any(Date),
      //   creatorId: user.id,
      //   modified: null,
      //   modifierId: null,
      //   type: 'text',
      //   parentId: null,
      //   nextItemId: null,
      //   children: [],
      // });
    });
    test.only('add node item to newsletter', async () => {
      const entities = await createFixture('newsletter.yaml');
      const user = _.get(entities, ['user', 0]) as SelectUser;
      const newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;
      const inputNode: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'node item 1',
        position: {
          parentId: null,
          nextId: null,
          prevId: null,
        },
        details: {
          type: NewsletterPostPostName.Container,
          name: 'node',
        },
      };

      const itemId1 = (await router.newsletterItems.create(
        createMockRequest(user.id, inputNode)
      )) as number;

      const input2: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'test text item 1',
        position: {
          parentId: itemId1,
          nextId: null,
          prevId: null,
        },
        details: {
          type: NewsletterPostPostName.Text,
          name: 'test text item 1',
        },
      };

      const itemId2 = (await router.newsletterItems.create(
        createMockRequest(user.id, input2)
      )) as number;

      const input3: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'test text item 1',
        position: {
          parentId: itemId1,
          nextId: itemId2,
          prevId: null,
        },
        details: {
          type: NewsletterPostPostName.Text,
          name: 'test text item 1',
        },
      };

      const itemId3 = (await router.newsletterItems.create(
        createMockRequest(user.id, input3)
      )) as number;

      const newsletterItem = (await router.newsletterItems.get(
        createMockRequest(user.id, { id: itemId1 })
      )) as number;

      console.log(JSON.stringify(newsletterItem, null, 4));
      //   expect(newsletterItem).toEqual({
      //     id: expect.any(Number),
      //     title: input1.title,
      //     newsletterId: newsletter.id,
      //     date: null,
      //     locationId: expect.any(Number),
      //     created: expect.any(Date),
      //     creatorId: user.id,
      //     modified: null,
      //     modifierId: null,
      //     type: input1.type,
      //     parentId: null,
      //     nextItemId: null,
      //     children: expect.arrayContaining([
      //       {
      //         id: expect.any(Number),
      //         title: input2.title,
      //         newsletterId: newsletter.id,
      //         date: null,
      //         locationId: expect.any(Number),
      //         created: expect.any(String),
      //         creatorId: user.id,
      //         modified: null,
      //         modifierId: null,
      //         type: input2.type,
      //         parentId: createdItemId1,
      //         nextItemId: null,
      //       },
      //       {
      //         id: expect.any(Number),
      //         title: input3.title,
      //         newsletterId: newsletter.id,
      //         date: null,
      //         locationId: expect.any(Number),
      //         created: expect.any(String),
      //         creatorId: user.id,
      //         modified: null,
      //         modifierId: null,
      //         type: input3.type,
      //         parentId: createdItemId1,
      //         nextItemId: createdItemId2,
      //       },
      //     ]),
      //   });
    });

    //     // test('add item between 2 existing items', async () => {
    //     //   const caller = trpc.createCallerFactory(router)(
    //     //     createContext({
    //     //       req: {
    //     //         user: {
    //     //           userId: user.id,
    //     //         },
    //     //       } as any,
    //     //       res: {} as any,
    //     //     })
    //     //   );

    //     //   const input1 = {
    //     //     type: 'node' as NewsletterPostType,
    //     //     newsletterId: newsletter.id,
    //     //     title: 'test text item 1',
    //     //     parentId: null,
    //     //   };
    //     //   const createdItemId1 = await caller.newsletterItems.create(input1);

    //     //   const input2 = {
    //     //     type: 'text' as NewsletterPostType,
    //     //     title: 'test text item 2',
    //     //     newsletterId: newsletter.id,
    //     //     parentId: createdItemId1,
    //     //   };
    //     //   const createdItemId2 = await caller.newsletterItems.create(input2);

    //     //   const input3 = {
    //     //     type: 'text' as NewsletterPostType,
    //     //     newsletterId: newsletter.id,
    //     //     title: 'test text item 3',
    //     //     parentId: createdItemId1,
    //     //   };
    //     //   const createdItemId3 = await caller.newsletterItems.create(input3);

    //     //   const input4 = {
    //     //     type: 'text' as NewsletterPostType,
    //     //     newsletterId: newsletter.id,
    //     //     title: 'test text item 4',
    //     //     parentId: createdItemId1,
    //     //     nextItemId: createdItemId3,
    //     //   };

    //     //   const createdItemId4 = await caller.newsletterItems.create(input4);

    //     //   const newsletterItem = await caller.newsletterItems.get({
    //     //     newsletterItemId: createdItemId1,
    //     //   });

    //     //   // 2 -> 4 -> 3
    //     //   expect(newsletterItem).toEqual({
    //     //     id: expect.any(Number),
    //     //     title: input1.title,
    //     //     newsletterId: newsletter.id,
    //     //     date: null,
    //     //     locationId: expect.any(Number),
    //     //     created: expect.any(Date),
    //     //     creatorId: user.id,
    //     //     modified: null,
    //     //     modifierId: null,
    //     //     type: input1.type,
    //     //     parentId: null,
    //     //     nextItemId: null,
    //     //     children: expect.arrayContaining([
    //     //       {
    //     //         id: expect.any(Number),
    //     //         title: input4.title,
    //     //         newsletterId: newsletter.id,
    //     //         date: null,
    //     //         locationId: expect.any(Number),
    //     //         created: expect.any(String),
    //     //         creatorId: user.id,
    //     //         modified: null,
    //     //         modifierId: null,
    //     //         type: input3.type,
    //     //         parentId: createdItemId1,
    //     //         nextItemId: createdItemId3,
    //     //       },
    //     //       {
    //     //         id: expect.any(Number),
    //     //         title: input2.title,
    //     //         newsletterId: newsletter.id,
    //     //         date: null,
    //     //         locationId: expect.any(Number),
    //     //         created: expect.any(String),
    //     //         creatorId: user.id,
    //     //         modified: null,
    //     //         modifierId: null,
    //     //         type: input2.type,
    //     //         parentId: createdItemId1,
    //     //         nextItemId: createdItemId4,
    //     //       },
    //     //       {
    //     //         id: expect.any(Number),
    //     //         title: input3.title,
    //     //         newsletterId: newsletter.id,
    //     //         date: null,
    //     //         locationId: expect.any(Number),
    //     //         created: expect.any(String),
    //     //         creatorId: user.id,
    //     //         modified: null,
    //     //         modifierId: null,
    //     //         type: input3.type,
    //     //         parentId: createdItemId1,
    //     //         nextItemId: null,
    //     //       },
    //     //     ]),
    //     //   });
    //     // });
    //   });

    //   // test('delete item between 2 existing items', async () => {
    //   //   const caller = trpc.createCallerFactory(router)(
    //   //     createContext({
    //   //       req: {
    //   //         user: {
    //   //           userId: user.id,
    //   //         },
    //   //       } as any,
    //   //       res: {} as any,
    //   //     })
    //   //   );

    //   //   const input1 = {
    //   //     type: 'node' as NewsletterPostType,
    //   //     newsletterId: newsletter.id,
    //   //     title: 'test text item 1',
    //   //     parentId: null,
    //   //   };
    //   //   const createdItemId1 = await caller.newsletterItems.create(input1);

    //   //   const input2 = {
    //   //     type: 'text' as NewsletterPostType,
    //   //     title: 'test text item 2',
    //   //     newsletterId: newsletter.id,
    //   //     parentId: createdItemId1,
    //   //   };
    //   //   const createdItemId2 = await caller.newsletterItems.create(input2);

    //   //   const input3 = {
    //   //     type: 'text' as NewsletterPostType,
    //   //     newsletterId: newsletter.id,
    //   //     title: 'test text item 3',
    //   //     parentId: createdItemId1,
    //   //   };
    //   //   const createdItemId3 = await caller.newsletterItems.create(input3);

    //   //   const input4 = {
    //   //     type: 'text' as NewsletterPostType,
    //   //     newsletterId: newsletter.id,
    //   //     title: 'test text item 4',
    //   //     parentId: createdItemId1,
    //   //     nextItemId: createdItemId3,
    //   //   };
    //   //   const createdItemId4 = await caller.newsletterItems.create(input4);

    //   //   await caller.newsletterItems.delete({
    //   //     newsletterItemId: createdItemId4,
    //   //   });

    //   //   const newsletterItem = await caller.newsletterItems.get({
    //   //     newsletterItemId: createdItemId1,
    //   //   });
    //   //   console.log(newsletterItem);

    //   //   // delete item from beginning
    //   //   // delete item from end
    //   //   // delete parent item -> should delete children
    //   // });

    //   // test('update item', async () => {
    //   //   const caller = trpc.createCallerFactory(router)(
    //   //     createContext({
    //   //       req: {
    //   //         user: {
    //   //           userId: user.id,
    //   //         },
    //   //       } as any,
    //   //       res: {} as any,
    //   //     })
    //   //   );

    //   //   const input1 = {
    //   //     type: 'node' as NewsletterPostType,
    //   //     newsletterId: newsletter.id,
    //   //     title: 'test text item 1',
    //   //     parentId: null,
    //   //   };
    //   //   const createdItemId1 = await caller.newsletterItems.create(input1);

    //   //   const input2 = {
    //   //     type: 'text' as NewsletterPostType,
    //   //     title: 'test text item 2',
    //   //     newsletterId: newsletter.id,
    //   //     parentId: createdItemId1,
    //   //   };
    //   //   const createdItemId2 = await caller.newsletterItems.create(input2);

    //   //   const input3 = {
    //   //     type: 'text' as NewsletterPostType,
    //   //     newsletterId: newsletter.id,
    //   //     title: 'test text item 3',
    //   //     parentId: createdItemId1,
    //   //   };
    //   //   const createdItemId3 = await caller.newsletterItems.create(input3);

    //   //   const input4 = {
    //   //     type: 'text' as NewsletterPostType,
    //   //     newsletterId: newsletter.id,
    //   //     title: 'test text item 4',
    //   //     parentId: createdItemId1,
    //   //     nextItemId: createdItemId3,
    //   //   };
    //   //   const createdItemId4 = await caller.newsletterItems.create(input4);

    //   //   try {
    //   //     await caller.newsletterItems.update({
    //   //       newsletterItemId: createdItemId4,
    //   //       nextItemId: createdItemId2,
    //   //     });

    //   //     const newsletterItem = await caller.newsletterItems.get({
    //   //       newsletterItemId: createdItemId1,
    //   //     });
    //   //     console.log(newsletterItem);
    //   //   } catch (error) {
    //   //     console.error(error);
    //   //   }
  });
});
