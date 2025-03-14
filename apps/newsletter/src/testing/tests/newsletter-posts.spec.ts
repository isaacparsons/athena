import { createFixture } from '../setup';
import _ from 'lodash';
import { appRouter as router } from '../../trpc/routes';
import {
  CreateNewsletterPost,
  CreateNewsletterPostBatchItem,
  CreateNewsletterPostDetailsText,
  CreateNewsletterPostsBatch,
  NewsletterPost,
  NewsletterPostTypeName,
} from '@athena/common';
import { SelectNewsletter, SelectNewsletterPost, SelectUser } from '@athena/db';
import {
  createMockRequest,
  deleteNewsletterPost,
  getNewsletter,
  getNewsletterPost,
  updateNewsletterPost,
} from '../test-util';

const createPostsBatch1 = (
  newsletterId: number
): CreateNewsletterPostBatchItem[] => [
  {
    newsletterId,
    title: 'node item 1',
    temp: {
      id: '1',
      parentId: null,
      nextId: null,
      prevId: null,
    },
    details: {
      type: NewsletterPostTypeName.Container,
      name: 'container',
    },
  },
  {
    newsletterId,
    title: 'text item 1',
    temp: {
      id: '2',
      parentId: '1',
      nextId: '3',
      prevId: null,
    },
    details: {
      type: NewsletterPostTypeName.Text,
      name: 'text item 1',
    } as CreateNewsletterPostDetailsText,
  },
  {
    newsletterId,
    title: 'text item 2',
    temp: {
      id: '3',
      parentId: '1',
      nextId: null,
      prevId: '2',
    },
    details: {
      type: NewsletterPostTypeName.Text,
      name: 'text item 2',
    } as CreateNewsletterPostDetailsText,
  },
];

const createPostsBatch2 = (
  newsletterId: number
): CreateNewsletterPostBatchItem[] => [
  {
    newsletterId,
    title: 'node item 1',
    temp: {
      id: '1',
      parentId: null,
      nextId: null,
      prevId: null,
    },
    details: {
      type: NewsletterPostTypeName.Container,
      name: 'container',
    },
  },
  {
    newsletterId,
    title: 'text item 1',
    temp: {
      id: '2',
      parentId: '1',
      nextId: '3',
      prevId: null,
    },
    details: {
      type: NewsletterPostTypeName.Text,
      name: 'text item 1',
    } as CreateNewsletterPostDetailsText,
  },
  {
    newsletterId,
    title: 'text item 2',
    temp: {
      id: '3',
      parentId: '1',
      nextId: '4',
      prevId: '2',
    },
    details: {
      type: NewsletterPostTypeName.Text,
      name: 'text item 2',
    } as CreateNewsletterPostDetailsText,
  },
  {
    newsletterId,
    title: 'text item 3',
    temp: {
      id: '4',
      parentId: '1',
      nextId: null,
      prevId: '3',
    },
    details: {
      type: NewsletterPostTypeName.Text,
      name: 'text item 3',
    } as CreateNewsletterPostDetailsText,
  },
];

async function addPosts(
  posts: CreateNewsletterPostBatchItem[],
  userId: number,
  newsletterId: number
) {
  const inputBatch: CreateNewsletterPostsBatch = {
    newsletterId,
    position: {
      parentId: null,
      nextId: null,
      prevId: null,
    },
    batch: posts,
  };
  const ids = (await router.newsletterPosts.createBatch(
    createMockRequest(userId, inputBatch)
  )) as number[];
  return Promise.all(ids.map((id) => getNewsletterPost(userId, id)));
}

describe('newsletter post routes', () => {
  let newsletter: SelectNewsletter;
  let user: SelectUser;
  beforeAll(async () => {
    const entities = await createFixture('newsletter.yaml');
    user = _.get(entities, ['user', 0]) as SelectUser;
    newsletter = _.get(entities, ['newsletter', 0]) as SelectNewsletter;
  });

  test('placeholder', () => {
    expect(1).toEqual(1);
  });
  describe('create newsletter item', () => {
    test('add items to newsletter', async () => {
      const postsBatch1 = createPostsBatch1(newsletter.id);
      const posts = await addPosts(postsBatch1, user.id, newsletter.id);
      const parentPost = posts.find((p) => p.position.parentId === null);

      const leftChild = posts.find((p) => p.details.name === 'text item 1');
      const rightChild = posts.find((p) => p.details.name === 'text item 2');

      expect(leftChild?.position).toEqual({
        parentId: parentPost?.id,
        nextId: rightChild?.id,
        prevId: null,
      });
      expect(rightChild?.position).toEqual({
        parentId: parentPost?.id,
        nextId: null,
        prevId: leftChild?.id,
      });

      expect(parentPost).toEqual({
        id: expect.any(Number),
        newsletterId: newsletter.id,
        meta: {
          created: expect.any(String),
          creator: user,
        },
        position: {
          parentId: null,
          nextId: null,
          prevId: null,
        },
        title: 'node item 1',
        details: {
          newsletterPostId: expect.any(Number),
          id: expect.any(Number),
          name: 'container',
          type: 'container',
        },
        children: expect.any(Array),
      });
    });
    test('add item between 2 existing items', async () => {
      const inputTextItem1: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        position: {
          parentId: null,
          nextId: null,
          prevId: null,
        },
        title: 'test text item 1',
        details: {
          type: NewsletterPostTypeName.Container,
          name: 'test text item 1',
        },
      };
      const createdItemId1 = (await router.newsletterPosts.create(
        createMockRequest(user.id, inputTextItem1)
      )) as number;

      const inputTextItem2: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'text item 2',
        position: {
          parentId: createdItemId1,
          nextId: null,
          prevId: null,
        },
        details: {
          type: NewsletterPostTypeName.Text,
          name: 'text item 2',
        } as CreateNewsletterPostDetailsText,
      };

      const createdItemId2 = (await router.newsletterPosts.create(
        createMockRequest(user.id, inputTextItem2)
      )) as number;

      const inputTextItem3: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'text item 3',
        position: {
          parentId: createdItemId1,
          nextId: null,
          prevId: createdItemId2,
        },
        details: {
          type: NewsletterPostTypeName.Text,
          name: 'text item 3',
        } as CreateNewsletterPostDetailsText,
      };

      const createdItemId3 = (await router.newsletterPosts.create(
        createMockRequest(user.id, inputTextItem3)
      )) as number;

      const inputTextItem4: CreateNewsletterPost = {
        newsletterId: newsletter.id,
        title: 'text item 4',
        position: {
          parentId: createdItemId1,
          nextId: createdItemId3,
          prevId: createdItemId2,
        },
        details: {
          type: NewsletterPostTypeName.Text,
          name: 'text item 4',
        } as CreateNewsletterPostDetailsText,
      };

      const createdItemId4 = (await router.newsletterPosts.create(
        createMockRequest(user.id, inputTextItem4)
      )) as number;

      const posts = await getNewsletterPost(user.id, createdItemId1);
      console.log(JSON.stringify(posts, null, 4));
    });
    test('delete item between 2 existing items', async () => {
      const postsBatch2 = createPostsBatch2(newsletter.id);
      const posts = await addPosts(postsBatch2, user.id, newsletter.id);

      const post1 = posts.find((p) => p.title === 'node item 1');
      const post2 = posts.find((p) => p.title === 'text item 1');
      const post3 = posts.find((p) => p.title === 'text item 2');
      const post4 = posts.find((p) => p.title === 'text item 3');

      expect(post1).toBeDefined();
      expect(post2).toBeDefined();
      expect(post3).toBeDefined();
      expect(post4).toBeDefined();

      await deleteNewsletterPost(user.id, [post3!.id]);

      const postsAfter = await getNewsletterPost(user.id, post1!.id);
      expect(postsAfter.children.length).toEqual(2);

      const child1 = postsAfter.children.find((i) => i.id === post2!.id);
      const child2 = postsAfter.children.find((i) => i.id === post4!.id);

      expect(child1?.position).toEqual({
        parentId: post1!.id,
        nextId: post4!.id,
        prevId: null,
      });
      expect(child2?.position).toEqual({
        parentId: post1!.id,
        nextId: null,
        prevId: post2!.id,
      });
    });
    test.only('update item', async () => {
      const postsBatch2 = createPostsBatch2(newsletter.id);
      const posts = await addPosts(postsBatch2, user.id, newsletter.id);
      const post1 = posts.find((p) => p.title === 'node item 1');
      const post3 = posts.find((p) => p.title === 'text item 2');
      const post4 = posts.find((p) => p.title === 'text item 3');

      expect(post1).toBeDefined();
      expect(post3).toBeDefined();
      expect(post4).toBeDefined();

      await updateNewsletterPost(user.id, {
        id: post3!.id,
        newsletterId: newsletter.id,
        position: {
          prevId: post4!.id,
          nextId: null,
          parentId: post1!.id,
        },
      });
      const postsAfter = await getNewsletterPost(user.id, post1!.id);
      console.log(JSON.stringify(postsAfter, null, 4));
    });
  });
});
