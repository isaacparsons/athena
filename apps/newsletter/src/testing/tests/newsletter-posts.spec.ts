import { createFixture } from '../setup';
import _ from 'lodash';
import {
  CreateNewsletterPost,
  CreateNewsletterPostChild,
  NewsletterPostTypeName,
  TempNodePosition,
} from '@athena/common';
import { DBManagerClient, SelectNewsletter, SelectUser } from '@athena/db';
import {
  createNewsletterPost,
  deleteNewsletterPosts,
  getNewsletterPost,
  updateNewsletterPosts,
} from '../test-util';

const createMockTextPostChild = (
  newsletterId: number,
  name: string,
  tempPosition: TempNodePosition
): CreateNewsletterPostChild => ({
  newsletterId,
  title: name,
  tempPosition,
  details: { type: NewsletterPostTypeName.Text, name },
});

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
    test('add item with children', async () => {
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
  describe('update newsletter item', () => {
    test('swap children', async () => {
      const id = await createNewsletterPost(user.id, {
        newsletterId: newsletter.id,
        position: { parentId: null, nextId: null },
        title: 'test text item 1',
        details: {
          type: NewsletterPostTypeName.Container,
          name: 'test text item 1',
        },
        children: [
          createMockTextPostChild(newsletter.id, 'text item 2', {
            id: '1',
            parentId: null,
            nextId: '2',
            prevId: null,
          }),
          createMockTextPostChild(newsletter.id, 'text item 3', {
            id: '2',
            parentId: null,
            nextId: null,
            prevId: '1',
          }),
        ],
      });

      const posts = await getNewsletterPost(user.id, id);

      const next = posts.children.find(
        (c) => _.get(c, ['position', 'nextId']) === null
      );
      const prev = posts.children.find(
        (c) => _.get(c, ['position', 'prevId']) === null
      );

      const updatedPosts = [
        {
          id: next!.id,
          position: {
            parentId: id,
            nextId: prev!.id,
            prevId: null,
          },
        },
        {
          id: prev!.id,
          position: {
            parentId: id,
            nextId: null,
            prevId: next!.id,
          },
        },
      ];

      await updateNewsletterPosts(user.id, updatedPosts);

      const postsAfter = await getNewsletterPost(user.id, id);

      const child1 = postsAfter.children.find((c) => c.id === next!.id);

      expect(_.get(child1, ['position'])).toMatchObject({
        parentId: id,
        nextId: prev!.id,
        prevId: null,
      });

      const child2 = postsAfter.children.find((c) => c.id === prev!.id);

      expect(_.get(child2, ['position'])).toMatchObject({
        parentId: id,
        nextId: null,
        prevId: next!.id,
      });
    });

    // test.only('update post details / location', async () => {
    //   const id = await createNewsletterPost(user.id, {
    //     newsletterId: newsletter.id,
    //     position: { parentId: null, nextId: null },
    //     title: 'test text item 1',
    //     details: {
    //       type: NewsletterPostTypeName.Container,
    //       name: 'test text item 1',
    //     },
    //     children: [],
    //   });

    //   const posts = await getNewsletterPost(user.id, id);

    //   const next = posts.children.find(
    //     (c) => _.get(c, ['position', 'nextId']) === null
    //   );
    //   const prev = posts.children.find(
    //     (c) => _.get(c, ['position', 'prevId']) === null
    //   );

    //   const updatedPosts = [
    //     {
    //       id: next!.id,
    //       position: {
    //         parentId: id,
    //         nextId: prev!.id,
    //         prevId: null,
    //       },
    //     },
    //     {
    //       id: prev!.id,
    //       position: {
    //         parentId: id,
    //         nextId: null,
    //         prevId: next!.id,
    //       },
    //     },
    //   ];

    //   await updateNewsletterPosts(user.id, updatedPosts);

    //   const postsAfter = await getNewsletterPost(user.id, id);

    //   const child1 = postsAfter.children.find((c) => c.id === next!.id);

    //   expect(_.get(child1, ['position'])).toMatchObject({
    //     parentId: id,
    //     nextId: prev!.id,
    //     prevId: null,
    //   });

    //   const child2 = postsAfter.children.find((c) => c.id === prev!.id);

    //   expect(_.get(child2, ['position'])).toMatchObject({
    //     parentId: id,
    //     nextId: null,
    //     prevId: next!.id,
    //   });
    // });
  });
  test.only('delete posts', async () => {
    const id = await createNewsletterPost(user.id, {
      newsletterId: newsletter.id,
      position: { parentId: null, nextId: null },
      title: 'test text item 1',
      details: {
        type: NewsletterPostTypeName.Container,
        name: 'test text item 1',
      },
      children: [
        createMockTextPostChild(newsletter.id, 'text item 2', {
          id: '1',
          parentId: null,
          nextId: '2',
          prevId: null,
        }),
        createMockTextPostChild(newsletter.id, 'text item 3', {
          id: '2',
          parentId: null,
          nextId: '3',
          prevId: '1',
        }),
        createMockTextPostChild(newsletter.id, 'text item 4', {
          id: '3',
          parentId: null,
          nextId: null,
          prevId: '2',
        }),
      ],
    });

    const posts = await getNewsletterPost(user.id, id);

    const post = posts.children.find((c) => c.title === 'text item 3');

    await deleteNewsletterPosts(user.id, [post!.id]);

    const postsAfter = await getNewsletterPost(user.id, id);
    console.log(JSON.stringify(postsAfter, null, 4));
  });
});
