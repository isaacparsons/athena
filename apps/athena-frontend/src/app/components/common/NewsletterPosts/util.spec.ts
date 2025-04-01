import { NewsletterPostTypeName, TempNodePosition } from '@athena/common';
import { getChildPosts } from './util';
import { Post } from './NewsletterPostsController';

describe('newsletter posts util', () => {
  test('getChildPosts', () => {
    const createMockPost = (id: string, tempPosition: TempNodePosition) => {
      return {
        details: {
          type: NewsletterPostTypeName.Text as NewsletterPostTypeName.Text,
          description: null,
          link: null,
          name: id,
        },
        tempPosition,
      };
    };
    const post1 = createMockPost('1', {
      id: '1',
      parentId: null,
      nextId: '2',
      prevId: null,
    });
    const post2 = createMockPost('2', {
      id: '2',
      parentId: null,
      nextId: null,
      prevId: '1',
    });
    const post3 = createMockPost('3', {
      id: '3',
      parentId: '1',
      nextId: null,
      prevId: null,
    });
    const post4 = createMockPost('4', {
      id: '4',
      parentId: '3',
      nextId: null,
      prevId: null,
    });
    const mockPosts: Post[] = [post1, post2, post3, post4];
    const res = getChildPosts('1', mockPosts);
    expect(res).toEqual([post3, post4]);
  });
});
