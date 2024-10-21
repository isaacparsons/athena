import { appRouter as router } from '../../routes/index';
import { createContext } from '../../trpc/context';
import { createNewsletter } from '../fixtures/newsletters';
import { createUser } from '../fixtures/users';
import { trpc } from '../../trpc/trpc';
import {
  CreateMediaItemDetailsInput,
  CreateTextItemDetailsInput,
  NewsletterItemDetailsText,
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

const userId = 1;
const newsletterName = 'test newsletter 1';
describe('newsletter item routes', () => {
  let newsletter;
  beforeAll(async () => {
    newsletter = await createNewsletter(userId, newsletterName);
  });

  describe('create newsletter item', () => {
    test('add items to newsletter', async () => {
      const inputNode = {
        title: 'node item 1',
        temp: {
          id: 1,
          parentId: null,
          nextItemId: null,
          previousItemId: null,
        },
      };

      const inputTextItem1 = {
        title: 'text item 1',
        temp: {
          id: 2,
          parentId: 1,
          nextItemId: 3,
          previousItemId: null,
        },
        details: {
          type: NewsletterItemType.text,
          name: 'text item 1',
        } as CreateTextItemDetailsInput,
      };
      const inputTextItem2 = {
        title: 'text item 2',
        temp: {
          id: 3,
          parentId: 1,
          nextItemId: null,
          previousItemId: 2,
        },
        details: {
          type: NewsletterItemType.text,
          name: 'text item 2',
        } as CreateTextItemDetailsInput,
      };
      const inputBatch = {
        newsletterId: newsletter.id,
        parentId: null,
        nextItemId: null,
        previousItemId: null,
        batch: [inputNode, inputTextItem1, inputTextItem2],
      };

      const ids = await testCaller.newsletterItems.createBatch(inputBatch);
      for (let i = 0; i < ids.length; i++) {
        const newsletterItem = await testCaller.newsletterItems.get({
          newsletterItemId: ids[i].id,
        });
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
    // test('add node item to newsletter', async () => {
    //   const caller = trpc.createCallerFactory(router)(
    //     createContext({
    //       req: {
    //         user: {
    //           userId: user.id,
    //         },
    //       } as any,
    //       res: {} as any,
    //     })
    //   );

    //   const input1 = {
    //     type: 'node' as NewsletterItemType,
    //     newsletterId: newsletter.id,
    //     title: 'test text item 1',
    //     parentId: null,
    //   };
    //   const createdItemId1 = await caller.newsletterItems.create(input1);

    //   const input2 = {
    //     type: 'text' as NewsletterItemType,
    //     title: 'test text item 1',
    //     newsletterId: newsletter.id,
    //     parentId: createdItemId1,
    //   };

    //   const createdItemId2 = await caller.newsletterItems.create(input2);
    //   const input3 = {
    //     type: 'text' as NewsletterItemType,
    //     newsletterId: newsletter.id,
    //     title: 'test text item 1',
    //     parentId: createdItemId1,
    //     nextItemId: createdItemId2,
    //   };
    //   const createdItemId3 = await caller.newsletterItems.create(input3);

    //   const newsletterItem = await caller.newsletterItems.get({
    //     newsletterItemId: createdItemId1,
    //   });

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
    // });

    // test('add item between 2 existing items', async () => {
    //   const caller = trpc.createCallerFactory(router)(
    //     createContext({
    //       req: {
    //         user: {
    //           userId: user.id,
    //         },
    //       } as any,
    //       res: {} as any,
    //     })
    //   );

    //   const input1 = {
    //     type: 'node' as NewsletterItemType,
    //     newsletterId: newsletter.id,
    //     title: 'test text item 1',
    //     parentId: null,
    //   };
    //   const createdItemId1 = await caller.newsletterItems.create(input1);

    //   const input2 = {
    //     type: 'text' as NewsletterItemType,
    //     title: 'test text item 2',
    //     newsletterId: newsletter.id,
    //     parentId: createdItemId1,
    //   };
    //   const createdItemId2 = await caller.newsletterItems.create(input2);

    //   const input3 = {
    //     type: 'text' as NewsletterItemType,
    //     newsletterId: newsletter.id,
    //     title: 'test text item 3',
    //     parentId: createdItemId1,
    //   };
    //   const createdItemId3 = await caller.newsletterItems.create(input3);

    //   const input4 = {
    //     type: 'text' as NewsletterItemType,
    //     newsletterId: newsletter.id,
    //     title: 'test text item 4',
    //     parentId: createdItemId1,
    //     nextItemId: createdItemId3,
    //   };

    //   const createdItemId4 = await caller.newsletterItems.create(input4);

    //   const newsletterItem = await caller.newsletterItems.get({
    //     newsletterItemId: createdItemId1,
    //   });

    //   // 2 -> 4 -> 3
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
    //         title: input4.title,
    //         newsletterId: newsletter.id,
    //         date: null,
    //         locationId: expect.any(Number),
    //         created: expect.any(String),
    //         creatorId: user.id,
    //         modified: null,
    //         modifierId: null,
    //         type: input3.type,
    //         parentId: createdItemId1,
    //         nextItemId: createdItemId3,
    //       },
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
    //         nextItemId: createdItemId4,
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
    //         nextItemId: null,
    //       },
    //     ]),
    //   });
    // });
  });

  // test('delete item between 2 existing items', async () => {
  //   const caller = trpc.createCallerFactory(router)(
  //     createContext({
  //       req: {
  //         user: {
  //           userId: user.id,
  //         },
  //       } as any,
  //       res: {} as any,
  //     })
  //   );

  //   const input1 = {
  //     type: 'node' as NewsletterItemType,
  //     newsletterId: newsletter.id,
  //     title: 'test text item 1',
  //     parentId: null,
  //   };
  //   const createdItemId1 = await caller.newsletterItems.create(input1);

  //   const input2 = {
  //     type: 'text' as NewsletterItemType,
  //     title: 'test text item 2',
  //     newsletterId: newsletter.id,
  //     parentId: createdItemId1,
  //   };
  //   const createdItemId2 = await caller.newsletterItems.create(input2);

  //   const input3 = {
  //     type: 'text' as NewsletterItemType,
  //     newsletterId: newsletter.id,
  //     title: 'test text item 3',
  //     parentId: createdItemId1,
  //   };
  //   const createdItemId3 = await caller.newsletterItems.create(input3);

  //   const input4 = {
  //     type: 'text' as NewsletterItemType,
  //     newsletterId: newsletter.id,
  //     title: 'test text item 4',
  //     parentId: createdItemId1,
  //     nextItemId: createdItemId3,
  //   };
  //   const createdItemId4 = await caller.newsletterItems.create(input4);

  //   await caller.newsletterItems.delete({
  //     newsletterItemId: createdItemId4,
  //   });

  //   const newsletterItem = await caller.newsletterItems.get({
  //     newsletterItemId: createdItemId1,
  //   });
  //   console.log(newsletterItem);

  //   // delete item from beginning
  //   // delete item from end
  //   // delete parent item -> should delete children
  // });

  // test('update item', async () => {
  //   const caller = trpc.createCallerFactory(router)(
  //     createContext({
  //       req: {
  //         user: {
  //           userId: user.id,
  //         },
  //       } as any,
  //       res: {} as any,
  //     })
  //   );

  //   const input1 = {
  //     type: 'node' as NewsletterItemType,
  //     newsletterId: newsletter.id,
  //     title: 'test text item 1',
  //     parentId: null,
  //   };
  //   const createdItemId1 = await caller.newsletterItems.create(input1);

  //   const input2 = {
  //     type: 'text' as NewsletterItemType,
  //     title: 'test text item 2',
  //     newsletterId: newsletter.id,
  //     parentId: createdItemId1,
  //   };
  //   const createdItemId2 = await caller.newsletterItems.create(input2);

  //   const input3 = {
  //     type: 'text' as NewsletterItemType,
  //     newsletterId: newsletter.id,
  //     title: 'test text item 3',
  //     parentId: createdItemId1,
  //   };
  //   const createdItemId3 = await caller.newsletterItems.create(input3);

  //   const input4 = {
  //     type: 'text' as NewsletterItemType,
  //     newsletterId: newsletter.id,
  //     title: 'test text item 4',
  //     parentId: createdItemId1,
  //     nextItemId: createdItemId3,
  //   };
  //   const createdItemId4 = await caller.newsletterItems.create(input4);

  //   try {
  //     await caller.newsletterItems.update({
  //       newsletterItemId: createdItemId4,
  //       nextItemId: createdItemId2,
  //     });

  //     const newsletterItem = await caller.newsletterItems.get({
  //       newsletterItemId: createdItemId1,
  //     });
  //     console.log(newsletterItem);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
});
