// import { createNewsletter } from '../fixtures/newsletters';
// import { trpc, createContext, appRouter as router } from '../../trpc';

// import { CreateNewsletterPostTemplateInput } from '@athena/athena-common';

// const testCaller = trpc.createCallerFactory(router)(
//   createContext({
//     req: {
//       headers: {},
//       user: {
//         userId: 1,
//       },
//     } as any,
//     res: {} as any,
//   })
// );

// const now = new Date(2024, 1, 1);
// Date.now = jest.fn(() => now.getTime());

// const newsletterName = 'test newsletter 1';
// describe('newsletter item template routes', () => {
//   let newsletter;
//   // let user;

//   beforeAll(async () => {
//     // user = await createUser();
//     newsletter = await createNewsletter(1, newsletterName);
//   });

//   const movieReviewInput: CreateNewsletterPostTemplateInput = {
//     name: 'movie review',
//     data: [
//       {
//         temp: {
//           id: 1,
//           parentId: null,
//           nextId: 2,
//           prevId: null,
//         },
//         data: {
//           type: 'text',
//           name: 'thoughts',
//           description: 'it was good',
//         },
//       },
//       {
//         temp: {
//           id: 2,
//           parentId: null,
//           nextId: null,
//           prevId: 1,
//         },
//         data: {
//           type: 'text',
//           name: 'rating',
//           description: '8/10',
//         },
//       },
//     ],
//   };

//   describe('create newsletter item template', () => {
//     test('create a movie review template', async () => {
//       const templateId = await testCaller.newsletterItemTemplates.create(
//         movieReviewInput
//       );

//       const result = await testCaller.newsletterItemTemplates.get({
//         id: templateId,
//       });
//       console.log('template', JSON.stringify(result, null, 6));
//     });
//     test('create a movie theatre review template', async () => {
//       const templateId = await testCaller.newsletterItemTemplates.create(
//         movieReviewInput
//       );

//       const movieTheatreReviewInput: CreateNewsletterPostTemplateInput = {
//         name: 'movie theatre review',
//         data: [
//           {
//             temp: {
//               id: 1,
//               parentId: null,
//               nextId: 4,
//               prevId: null,
//             },
//           },
//           {
//             temp: {
//               id: 2,
//               parentId: 1,
//               nextId: 3,
//               prevId: null,
//             },
//             data: {
//               type: 'text',
//               name: 'distance',
//               description: 'it was close',
//             },
//           },
//           {
//             temp: {
//               id: 3,
//               parentId: 1,
//               nextId: null,
//               prevId: 2,
//             },
//             data: {
//               type: 'text',
//               name: 'snacks',
//               description: 'large selection',
//             },
//           },
//           {
//             temp: {
//               id: 4,
//               parentId: null,
//               nextId: 5,
//               prevId: 1,
//             },
//             templateId: templateId,
//           },
//           {
//             temp: {
//               id: 5,
//               parentId: null,
//               nextId: null,
//               prevId: 4,
//             },
//             data: {
//               type: 'text',
//               name: 'Conclusion',
//               description: '',
//             },
//           },
//         ],
//       };

//       const movieTheatreTemplateId = await testCaller.newsletterItemTemplates.create(
//         movieTheatreReviewInput
//       );

//       const result = await testCaller.newsletterItemTemplates.get({
//         id: movieTheatreTemplateId,
//       });
//       console.log('template', JSON.stringify(result, null, 6));
//     });
//   });
// });
