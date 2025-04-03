import { getChildPosts } from './lib';

describe('newsletter posts util', () => {
  test('getChildPosts', () => {
    const post1 = {
      tempPosition: {
        id: '1',
        parentId: null,
        nextId: '2',
        prevId: null,
      },
    };
    const post2 = {
      tempPosition: {
        id: '2',
        parentId: null,
        nextId: null,
        prevId: '1',
      },
    };
    const post3 = {
      tempPosition: {
        id: '3',
        parentId: '1',
        nextId: null,
        prevId: null,
      },
    };
    const post4 = {
      tempPosition: {
        id: '4',
        parentId: '3',
        nextId: null,
        prevId: null,
      },
    };
    const mockPosts = [post1, post2, post3, post4];
    const res = getChildPosts('1', mockPosts);
    expect(res).toEqual([post3, post4]);
  });
});
