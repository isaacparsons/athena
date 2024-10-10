// import { appRouter as router } from '../../src/routes/index';
// import { createContext } from '../../src/trpc/context';
// import { createNewsletter } from '../fixtures/newsletters';
// import { createUser } from '../fixtures/users';
// import { trpc } from '../../src/trpc/trpc';
// import { NewsletterItemType } from '@athena/api';

// const now = new Date(2024, 1, 1);
// Date.now = jest.fn(() => now.getTime());

// const newsletterName = 'test newsletter 1';
// describe('newsletter item routes', () => {
//   let newsletter;
//   let user;
//   let caller;
//   beforeAll(async () => {
//     user = await createUser();
//     newsletter = await createNewsletter(user.id, newsletterName);
//     caller = trpc.createCallerFactory(router)(
//       createContext({
//         req: {
//           user: {
//             userId: user.id,
//           },
//         } as any,
//         res: {} as any,
//       })
//     );
//   });

//   describe('create newsletter item', () => {
//     test('add items to newsletter', async () => {
//       const caller = trpc.createCallerFactory(router)(
//         createContext({
//           req: {
//             user: {
//               userId: user.id,
//             },
//           } as any,
//           res: {} as any,
//         })
//       );
//       const input_node = {
//         newsletterId: newsletter.id,
//         parentId: null,
//         nextItemId: null,
//         previousItemId: null,
//         type: 'text' as NewsletterItemType,
//         title: 'node item 1',
//       };

//       const createdItemId = await caller.newsletterItems.create(input_node);

//       const input_item1 = {
//         newsletterId: newsletter.id,
//         parentId: createdItemId,
//         nextItemId: null,
//         previousItemId: null,
//         type: 'text' as NewsletterItemType,
//         title: 'text item 1',
//       };
//       const createdItemId2 = await caller.newsletterItems.create(input_item1);

//       const input_item2 = {
//         newsletterId: newsletter.id,
//         parentId: createdItemId,
//         nextItemId: null,
//         previousItemId: createdItemId2,
//         type: 'text' as NewsletterItemType,
//         title: 'text item 2',
//       };
//       const createdItemId3 = await caller.newsletterItems.create(input_item2);

//       const newsletterItem = await caller.newsletterItems.get({
//         newsletterItemId: createdItemId,
//       });
//       console.log(JSON.stringify(newsletterItem, null, 6));
//       // expect(newsletterItem).toEqual({
//       //   id: expect.any(Number),
//       //   title: 'test text item 1',
//       //   newsletterId: newsletter.id,
//       //   date: null,
//       //   locationId: expect.any(Number),
//       //   created: expect.any(Date),
//       //   creatorId: user.id,
//       //   modified: null,
//       //   modifierId: null,
//       //   type: 'text',
//       //   parentId: null,
//       //   nextItemId: null,
//       //   children: [],
//       // });
//     });
//     // test('add node item to newsletter', async () => {
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
//     //     type: 'node' as NewsletterItemType,
//     //     newsletterId: newsletter.id,
//     //     title: 'test text item 1',
//     //     parentId: null,
//     //   };
//     //   const createdItemId1 = await caller.newsletterItems.create(input1);

//     //   const input2 = {
//     //     type: 'text' as NewsletterItemType,
//     //     title: 'test text item 1',
//     //     newsletterId: newsletter.id,
//     //     parentId: createdItemId1,
//     //   };

//     //   const createdItemId2 = await caller.newsletterItems.create(input2);
//     //   const input3 = {
//     //     type: 'text' as NewsletterItemType,
//     //     newsletterId: newsletter.id,
//     //     title: 'test text item 1',
//     //     parentId: createdItemId1,
//     //     nextItemId: createdItemId2,
//     //   };
//     //   const createdItemId3 = await caller.newsletterItems.create(input3);

//     //   const newsletterItem = await caller.newsletterItems.get({
//     //     newsletterItemId: createdItemId1,
//     //   });

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
//     //         nextItemId: null,
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
//     //         nextItemId: createdItemId2,
//     //       },
//     //     ]),
//     //   });
//     // });

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
//     //     type: 'node' as NewsletterItemType,
//     //     newsletterId: newsletter.id,
//     //     title: 'test text item 1',
//     //     parentId: null,
//     //   };
//     //   const createdItemId1 = await caller.newsletterItems.create(input1);

//     //   const input2 = {
//     //     type: 'text' as NewsletterItemType,
//     //     title: 'test text item 2',
//     //     newsletterId: newsletter.id,
//     //     parentId: createdItemId1,
//     //   };
//     //   const createdItemId2 = await caller.newsletterItems.create(input2);

//     //   const input3 = {
//     //     type: 'text' as NewsletterItemType,
//     //     newsletterId: newsletter.id,
//     //     title: 'test text item 3',
//     //     parentId: createdItemId1,
//     //   };
//     //   const createdItemId3 = await caller.newsletterItems.create(input3);

//     //   const input4 = {
//     //     type: 'text' as NewsletterItemType,
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
//   //     type: 'node' as NewsletterItemType,
//   //     newsletterId: newsletter.id,
//   //     title: 'test text item 1',
//   //     parentId: null,
//   //   };
//   //   const createdItemId1 = await caller.newsletterItems.create(input1);

//   //   const input2 = {
//   //     type: 'text' as NewsletterItemType,
//   //     title: 'test text item 2',
//   //     newsletterId: newsletter.id,
//   //     parentId: createdItemId1,
//   //   };
//   //   const createdItemId2 = await caller.newsletterItems.create(input2);

//   //   const input3 = {
//   //     type: 'text' as NewsletterItemType,
//   //     newsletterId: newsletter.id,
//   //     title: 'test text item 3',
//   //     parentId: createdItemId1,
//   //   };
//   //   const createdItemId3 = await caller.newsletterItems.create(input3);

//   //   const input4 = {
//   //     type: 'text' as NewsletterItemType,
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
//   //     type: 'node' as NewsletterItemType,
//   //     newsletterId: newsletter.id,
//   //     title: 'test text item 1',
//   //     parentId: null,
//   //   };
//   //   const createdItemId1 = await caller.newsletterItems.create(input1);

//   //   const input2 = {
//   //     type: 'text' as NewsletterItemType,
//   //     title: 'test text item 2',
//   //     newsletterId: newsletter.id,
//   //     parentId: createdItemId1,
//   //   };
//   //   const createdItemId2 = await caller.newsletterItems.create(input2);

//   //   const input3 = {
//   //     type: 'text' as NewsletterItemType,
//   //     newsletterId: newsletter.id,
//   //     title: 'test text item 3',
//   //     parentId: createdItemId1,
//   //   };
//   //   const createdItemId3 = await caller.newsletterItems.create(input3);

//   //   const input4 = {
//   //     type: 'text' as NewsletterItemType,
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
//   // });
// });
