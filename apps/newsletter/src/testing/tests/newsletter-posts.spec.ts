import { createFixture } from '../setup';
import _ from 'lodash';
import {
  CreateManyNewsletterPosts,
  NewsletterPostTypeName,
  TempNodePosition,
} from '@athena/common';
import { DBManagerClient } from '@backend/db';
import { SelectNewsletter, SelectUser } from '@backend/types';
import { createNewsletterPosts, getNewsletterPost } from '../test-util';

const createMockTextPost = (
  newsletterId: number,
  name: string,
  tempPosition: TempNodePosition
): CreateManyNewsletterPosts['posts'][number] => ({
  newsletterId,
  title: name,
  date: null,
  tempPosition,
  details: {
    type: NewsletterPostTypeName.Text,
    name,
    link: null,
    description: null,
  },
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
    test.only('add multiple items', async () => {
      const parentNode1 = createMockTextPost(newsletter.id, 'parent 1', {
        id: '4',
        parentId: null,
        nextId: null,
        prevId: null,
      });

      const child1Input = createMockTextPost(newsletter.id, 'text item 2', {
        id: '1',
        parentId: '4',
        nextId: '2',
        prevId: null,
      });

      const child2Input = createMockTextPost(newsletter.id, 'text item 3', {
        id: '2',
        parentId: '4',
        nextId: null,
        prevId: '1',
      });

      const parentNode2 = createMockTextPost(newsletter.id, 'parent 2', {
        id: '5',
        parentId: null,
        nextId: null,
        prevId: null,
      });

      const child3Input = createMockTextPost(newsletter.id, 'text item 4', {
        id: '6',
        parentId: '5',
        nextId: null,
        prevId: null,
      });

      const input: CreateManyNewsletterPosts = {
        newsletterId: newsletter.id,
        posts: [parentNode1, child1Input, child2Input, parentNode2, child3Input],
      };
      const createdIds = await createNewsletterPosts(user.id, input);

      const result = await Promise.all(
        createdIds.map(async (id) => {
          return getNewsletterPost(user.id, id);
        })
      );
      console.log(JSON.stringify(result, null, 4));

      // expect(posts).toMatchObject({
      //   position: {
      //     parentId: null,
      //     nextId: null,
      //     prevId: null,
      //   },
      //   details: {
      //     newsletterPostId: created,
      //     id: expect.any(Number),
      //     ...inputTextItem1.details,
      //   },
      // });

      // const child1 = posts.children.find((c) => c.title === child1Input.title);
      // const child2 = posts.children.find((c) => c.title === child2Input.title);
      // const child3 = posts.children.find((c) => c.title === child3Input.title);

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
  });
  // describe('delete posts', () => {
  //   test('delete post from start', async () => {
  //     const parentNode = createMockTextPost(newsletter.id, 'parent', {
  //       id: '4',
  //       parentId: null,
  //       nextId: null,
  //       prevId: null,
  //     });

  //     const child1Input: CreateNewsletterPost = createMockTextPost(
  //       newsletter.id,
  //       'text item 2',
  //       {
  //         id: '1',
  //         parentId: '4',
  //         nextId: '2',
  //         prevId: null,
  //       }
  //     );

  //     const child2Input: CreateNewsletterPost = createMockTextPost(
  //       newsletter.id,
  //       'text item 3',
  //       {
  //         id: '2',
  //         parentId: '4',
  //         nextId: null,
  //         prevId: '1',
  //       }
  //     );

  //     const input: CreateManyNewsletterPosts = {
  //       newsletterId: newsletter.id,
  //       position: { parentId: null, nextId: null },
  //       posts: [parentNode, child1Input, child2Input],
  //     };
  //     const created = await createNewsletterPosts(user.id, input);
  //     const posts = await getNewsletterPost(user.id, created);

  //     const post = posts.children?.find((c) => c.title === 'text item 2');

  //     await deleteNewsletterPosts(user.id, [post!.id]);

  //     const postsAfter = await getNewsletterPost(user.id, created);

  //     const post1 = postsAfter.children?.find((c) => c.title === 'text item 3');

  //     console.log(JSON.stringify(postsAfter, null, 4));

  //     expect(post1?.position.nextId).toEqual(null);
  //     expect(post1?.position.prevId).toEqual(null);
  //   });
  //   test('delete post from end', async () => {
  //     const parentNode = createMockTextPost(newsletter.id, 'parent', {
  //       id: '4',
  //       parentId: null,
  //       nextId: null,
  //       prevId: null,
  //     });

  //     const child1Input: CreateNewsletterPost = createMockTextPost(
  //       newsletter.id,
  //       'text item 2',
  //       {
  //         id: '1',
  //         parentId: '4',
  //         nextId: '2',
  //         prevId: null,
  //       }
  //     );

  //     const child2Input: CreateNewsletterPost = createMockTextPost(
  //       newsletter.id,
  //       'text item 3',
  //       {
  //         id: '2',
  //         parentId: '4',
  //         nextId: null,
  //         prevId: '1',
  //       }
  //     );

  //     const input: CreateManyNewsletterPosts = {
  //       newsletterId: newsletter.id,
  //       position: { parentId: null, nextId: null },
  //       posts: [parentNode, child1Input, child2Input],
  //     };
  //     const created = await createNewsletterPosts(user.id, input);
  //     const posts = await getNewsletterPost(user.id, created);

  //     const post = posts.children?.find((c) => c.title === 'text item 3');

  //     await deleteNewsletterPosts(user.id, [post!.id]);

  //     const postsAfter = await getNewsletterPost(user.id, created);

  //     const post1 = postsAfter.children?.find((c) => c.title === 'text item 2');

  //     console.log(JSON.stringify(postsAfter, null, 4));

  //     expect(post1?.position.nextId).toEqual(null);
  //     expect(post1?.position.prevId).toEqual(null);
  //   });
  //   test('delete post between 2 other posts', async () => {
  //     const parentNode = createMockTextPost(newsletter.id, 'parent', {
  //       id: '4',
  //       parentId: null,
  //       nextId: null,
  //       prevId: null,
  //     });

  //     const child1Input: CreateNewsletterPost = createMockTextPost(
  //       newsletter.id,
  //       'text item 2',
  //       {
  //         id: '1',
  //         parentId: '4',
  //         nextId: '2',
  //         prevId: null,
  //       }
  //     );

  //     const child2Input: CreateNewsletterPost = createMockTextPost(
  //       newsletter.id,
  //       'text item 3',
  //       {
  //         id: '2',
  //         parentId: '4',
  //         nextId: '3',
  //         prevId: '1',
  //       }
  //     );

  //     const child3Input: CreateNewsletterPost = createMockTextPost(
  //       newsletter.id,
  //       'text item 4',
  //       {
  //         id: '3',
  //         parentId: '4',
  //         nextId: null,
  //         prevId: '2',
  //       }
  //     );

  //     const input: CreateManyNewsletterPosts = {
  //       newsletterId: newsletter.id,
  //       position: { parentId: null, nextId: null },
  //       posts: [parentNode, child1Input, child2Input, child3Input],
  //     };
  //     const created = await createNewsletterPosts(user.id, input);

  //     const posts = await getNewsletterPost(user.id, created);

  //     const post = posts.children?.find((c) => c.title === 'text item 3');

  //     await deleteNewsletterPosts(user.id, [post!.id]);

  //     const postsAfter = await getNewsletterPost(user.id, created);

  //     const post1 = postsAfter.children?.find((c) => c.title === 'text item 2');
  //     const post3 = postsAfter.children?.find((c) => c.title === 'text item 4');
  //     console.log(JSON.stringify(postsAfter, null, 4));

  //     expect(post1?.position.nextId).toEqual(post3?.id);
  //     expect(post1?.position.prevId).toEqual(null);

  //     expect(post3?.position.nextId).toEqual(null);
  //     expect(post3?.position.prevId).toEqual(post1?.id);
  //   });
  // });
});
