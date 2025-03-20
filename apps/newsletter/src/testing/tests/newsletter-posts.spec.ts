import { createFixture } from '../setup';
import _ from 'lodash';
import { appRouter as router } from '../../trpc/routes';
import {
  CreateNewsletterPost,
  CreateNewsletterPostChild,
  NewsletterPost,
  NewsletterPostTypeName,
} from '@athena/common';
import {
  DBManagerClient,
  SelectNewsletter,
  SelectNewsletterPost,
  SelectUser,
} from '@athena/db';
import {
  createMockRequest,
  createNewsletterPost,
  deleteNewsletterPost,
  getNewsletter,
  getNewsletterPost,
  updateNewsletterPost,
} from '../test-util';

// const createPostsBatch1 = (
//   newsletterId: number
// ): CreateNewsletterPostBatchItem[] => [
//   {
//     newsletterId,
//     title: 'node item 1',
//     temp: {
//       id: '1',
//       parentId: null,
//       nextId: null,
//       prevId: null,
//     },
//     details: {
//       type: NewsletterPostTypeName.Container,
//       name: 'container',
//     },
//   },
//   {
//     newsletterId,
//     title: 'text item 1',
//     temp: {
//       id: '2',
//       parentId: '1',
//       nextId: '3',
//       prevId: null,
//     },
//     details: {
//       type: NewsletterPostTypeName.Text,
//       name: 'text item 1',
//     } as CreateNewsletterPostDetailsText,
//   },
//   {
//     newsletterId,
//     title: 'text item 2',
//     temp: {
//       id: '3',
//       parentId: '1',
//       nextId: null,
//       prevId: '2',
//     },
//     details: {
//       type: NewsletterPostTypeName.Text,
//       name: 'text item 2',
//     } as CreateNewsletterPostDetailsText,
//   },
// ];

// const createPostsBatch2 = (
//   newsletterId: number
// ): CreateNewsletterPostBatchItem[] => [
//   {
//     newsletterId,
//     title: 'node item 1',
//     temp: {
//       id: '1',
//       parentId: null,
//       nextId: null,
//       prevId: null,
//     },
//     details: {
//       type: NewsletterPostTypeName.Container,
//       name: 'container',
//     },
//   },
//   {
//     newsletterId,
//     title: 'text item 1',
//     temp: {
//       id: '2',
//       parentId: '1',
//       nextId: '3',
//       prevId: null,
//     },
//     details: {
//       type: NewsletterPostTypeName.Text,
//       name: 'text item 1',
//     } as CreateNewsletterPostDetailsText,
//   },
//   {
//     newsletterId,
//     title: 'text item 2',
//     temp: {
//       id: '3',
//       parentId: '1',
//       nextId: '4',
//       prevId: '2',
//     },
//     details: {
//       type: NewsletterPostTypeName.Text,
//       name: 'text item 2',
//     } as CreateNewsletterPostDetailsText,
//   },
//   {
//     newsletterId,
//     title: 'text item 3',
//     temp: {
//       id: '4',
//       parentId: '1',
//       nextId: null,
//       prevId: '3',
//     },
//     details: {
//       type: NewsletterPostTypeName.Text,
//       name: 'text item 3',
//     } as CreateNewsletterPostDetailsText,
//   },
// ];

// async function addPosts(
//   posts: CreateNewsletterPostBatchItem[],
//   userId: number,
//   newsletterId: number
// ) {
//   const inputBatch: CreateNewsletterPostsBatch = {
//     newsletterId,
//     position: {
//       parentId: null,
//       nextId: null,
//       prevId: null,
//     },
//     batch: posts,
//   };
//   const ids = (await router.newsletterPosts.createBatch(
//     createMockRequest(userId, inputBatch)
//   )) as number[];
//   return Promise.all(ids.map((id) => getNewsletterPost(userId, id)));
// }

const dbClient = new DBManagerClient();

describe('newsletter post routes', () => {
  let newsletter: SelectNewsletter;
  let user: SelectUser;
  beforeAll(async () => {
    const entities = await createFixture('newsletter.yaml');
    user = _.get(entities, ['user', 0]) as SelectUser;
    newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;
  });

  // afterAll(async () => {
  //   await dbClient.truncateTables(['user']);
  //   await dbClient.truncateTables(['newsletter']);
  //   await dbClient.truncateTables(['user_newsletter']);
  //   await dbClient.truncateTables(['newsletter_post']);
  // });

  describe('create newsletter item', () => {
    test.only('add item with children', async () => {
      const child1Input: CreateNewsletterPostChild = {
        newsletterId: newsletter.id,
        title: 'text item 2',
        tempPosition: {
          id: '1',
          parentId: null,
          nextId: '2',
          prevId: null,
        },
        details: { type: NewsletterPostTypeName.Text, name: 'text item 2' },
      };

      const child2Input: CreateNewsletterPostChild = {
        newsletterId: newsletter.id,
        title: 'text item 3',
        tempPosition: {
          id: '2',
          parentId: null,
          nextId: '3',
          prevId: '1',
        },
        details: { type: NewsletterPostTypeName.Text, name: 'text item 3' },
      };
      const child3Input: CreateNewsletterPostChild = {
        newsletterId: newsletter.id,
        title: 'text item 4',
        tempPosition: {
          id: '3',
          parentId: null,
          nextId: null,
          prevId: '2',
        },
        details: { type: NewsletterPostTypeName.Text, name: 'text item 4' },
      };
      const inputTextItem1: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        position: { parentId: null, nextId: null },
        title: 'test text item 1',
        details: {
          type: NewsletterPostTypeName.Container,
          name: 'test text item 1',
        },
        children: [child1Input, child2Input, child3Input],
      };
      const createdItemId1 = await createNewsletterPost(user.id, inputTextItem1);

      const posts = await getNewsletterPost(user.id, createdItemId1);
      console.log(JSON.stringify(posts, null, 4));

      expect(posts).toMatchObject({
        position: {
          parentId: null,
          nextId: null,
          prevId: null,
        },
        details: {
          newsletterPostId: createdItemId1,
          id: expect.any(Number),
          ...inputTextItem1.details,
        },
      });

      const child1 = posts.children.find((c) => c.title === child1Input.title);
      const child2 = posts.children.find((c) => c.title === child2Input.title);
      const child3 = posts.children.find((c) => c.title === child3Input.title);

      // expect(child1).toMatchObject({
      //   position: {
      //     parentId: createdItemId1,
      //     nextId: child2.,
      //     prevId: null,
      //   },
      //   details: {
      //     newsletterPostId: createdItemId2,
      //     id: expect.any(Number),
      //     ...child1!.details,
      //   },
      // });

      // expect(child1);
    });
    test('add item between 2 existing items', async () => {
      const inputTextItem1: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        position: { parentId: null, nextId: null },
        title: 'test text item 1',
        details: {
          type: NewsletterPostTypeName.Container,
          name: 'test text item 1',
        },
        children: [],
      };
      const createdItemId1 = await createNewsletterPost(user.id, inputTextItem1);

      const inputTextItem2: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'text item 2',
        position: { parentId: createdItemId1, nextId: null },
        details: { type: NewsletterPostTypeName.Text, name: 'text item 2' },
        children: [],
      };
      const createdItemId2 = await createNewsletterPost(user.id, inputTextItem2);

      const inputTextItem3: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'text item 3',
        position: { parentId: createdItemId1, nextId: null },
        details: { type: NewsletterPostTypeName.Text, name: 'text item 3' },
        children: [],
      };

      const createdItemId3 = await createNewsletterPost(user.id, inputTextItem3);

      const inputTextItem4: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'text item 4',
        position: { parentId: createdItemId1, nextId: createdItemId3 },
        details: { type: NewsletterPostTypeName.Text, name: 'text item 4' },
        children: [],
      };
      const createdItemId4 = await createNewsletterPost(user.id, inputTextItem4);

      const posts = await getNewsletterPost(user.id, createdItemId1);
      // console.log(JSON.stringify(posts, null, 4));

      expect(posts).toMatchObject({
        position: {
          parentId: null,
          nextId: null,
          prevId: null,
        },
        details: {
          newsletterPostId: createdItemId1,
          id: expect.any(Number),
          ...inputTextItem1.details,
        },
      });

      const child1 = posts.children.find((c) => c.id === createdItemId2);
      expect(child1).toMatchObject({
        position: {
          parentId: createdItemId1,
          nextId: createdItemId4,
          prevId: null,
        },
        details: {
          newsletterPostId: createdItemId2,
          id: expect.any(Number),
          ...inputTextItem2.details,
        },
      });
      const child2 = posts.children.find((c) => c.id === createdItemId3);
      expect(child2).toMatchObject({
        position: {
          parentId: createdItemId1,
          nextId: null,
          prevId: createdItemId4,
        },
        details: {
          newsletterPostId: createdItemId3,
          id: expect.any(Number),
          ...inputTextItem3.details,
        },
      });
      const child3 = posts.children.find((c) => c.id === createdItemId4);
      expect(child3).toMatchObject({
        position: {
          parentId: createdItemId1,
          nextId: createdItemId3,
          prevId: createdItemId2,
        },
        details: {
          newsletterPostId: createdItemId4,
          id: expect.any(Number),
          ...inputTextItem4.details,
        },
      });

      // expect(child1);
    });
    // test('delete item between 2 existing items', async () => {
    //   const postsBatch2 = createPostsBatch2(newsletter.id);
    //   const posts = await addPosts(postsBatch2, user.id, newsletter.id);

    //   const post1 = posts.find((p) => p.title === 'node item 1');
    //   const post2 = posts.find((p) => p.title === 'text item 1');
    //   const post3 = posts.find((p) => p.title === 'text item 2');
    //   const post4 = posts.find((p) => p.title === 'text item 3');

    //   expect(post1).toBeDefined();
    //   expect(post2).toBeDefined();
    //   expect(post3).toBeDefined();
    //   expect(post4).toBeDefined();

    //   await deleteNewsletterPost(user.id, [post3!.id]);

    //   const postsAfter = await getNewsletterPost(user.id, post1!.id);
    //   expect(postsAfter.children.length).toEqual(2);

    //   const child1 = postsAfter.children.find((i) => i.id === post2!.id);
    //   const child2 = postsAfter.children.find((i) => i.id === post4!.id);

    //   expect(child1?.position).toEqual({
    //     parentId: post1!.id,
    //     nextId: post4!.id,
    //     prevId: null,
    //   });
    //   expect(child2?.position).toEqual({
    //     parentId: post1!.id,
    //     nextId: null,
    //     prevId: post2!.id,
    //   });
    // });
    // test.only('update item', async () => {
    //   const postsBatch2 = createPostsBatch2(newsletter.id);
    //   const posts = await addPosts(postsBatch2, user.id, newsletter.id);
    //   const post1 = posts.find((p) => p.title === 'node item 1');
    //   const post3 = posts.find((p) => p.title === 'text item 2');
    //   const post4 = posts.find((p) => p.title === 'text item 3');

    //   expect(post1).toBeDefined();
    //   expect(post3).toBeDefined();
    //   expect(post4).toBeDefined();

    //   await updateNewsletterPost(user.id, {
    //     id: post3!.id,
    //     newsletterId: newsletter.id,
    //     position: {
    //       prevId: post4!.id,
    //       nextId: null,
    //       parentId: post1!.id,
    //     },
    //   });
    //   const postsAfter = await getNewsletterPost(user.id, post1!.id);
    //   console.log(JSON.stringify(postsAfter, null, 4));
    // });
  });
});
