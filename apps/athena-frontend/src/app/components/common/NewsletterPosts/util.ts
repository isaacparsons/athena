import _ from 'lodash';
import { NewsletterPost, NewsletterPostDetails } from '@athena/common';
import { nanoid } from 'nanoid';
import { Post } from '../../../types';

export const postsToTempPosts = <T extends Omit<NewsletterPost, 'children'>>(
  posts: T[]
) => {
  const existingPostsWithTempId = posts.map((p) => [nanoid(), p]) as [string, T][];

  const existingPostIdTempIdMap = new Map(
    [...existingPostsWithTempId].map(([p1, p2]) => [p2.id, p1]) as [number, string][]
  );

  const tempPosts = existingPostsWithTempId.map(([tempId, p]) => {
    return [
      tempId,
      {
        ...p,
        tempPosition: {
          id: tempId,
          parentId:
            p.position.parentId === null
              ? null
              : existingPostIdTempIdMap.get(p.position.parentId) ?? null,
          nextId:
            p.position.nextId === null
              ? null
              : existingPostIdTempIdMap.get(p.position.nextId) ?? null,
          prevId:
            p.position.prevId === null
              ? null
              : existingPostIdTempIdMap.get(p.position.prevId) ?? null,
        },
      },
    ];
  }) as [string, Post][];

  return {
    posts: tempPosts.map(([, p]) => p),
  };
};

const isParentNode = (post: Post, posts: Post[]) => {
  return (
    post.tempPosition.parentId === null ||
    !posts.find((p) => post.tempPosition.parentId === p.tempPosition.id)
  );
};

export const formatCreatedPosts = (
  newsletterId: number,
  existingPosts: Post[],
  posts: Post[]
) => {
  const created = posts.filter((p) => p.position === undefined);

  // TODO: currently we only create 1 parent item, but we should be able to create
  // multiple
  const [parents, children] = _.partition(created, (p) => isParentNode(p, created));
  if (parents.length !== 0) {
    const parent = parents[0];
    const existingParent = existingPosts.find(
      (p) => parent.tempPosition.parentId === p.tempPosition.id
    );

    const a = {
      newsletterId,
      position: {
        parentId: existingParent === undefined ? null : existingParent.id ?? null,
        nextId: null,
      },
      posts: [
        { ...parent, tempPosition: { ...parent.tempPosition, parentId: null } },
        ...children,
      ].map((p) => ({
        newsletterId,
        title: p.title ?? '',
        date: p.date ?? null,
        details: p.details as NewsletterPostDetails,
        tempPosition: p.tempPosition,
        location: p.location === null ? undefined : p.location,
      })),
    };
    return a;
  }
};

export const formatUpdatedPosts = (
  newsletterId: number,
  existingPosts: Post[],
  posts: Post[]
) => {
  const notCreated = posts.filter((p) => p.position !== undefined);

  return notCreated
    .filter((p) => {
      const postBefore = existingPosts.find(
        (ep) => ep.tempPosition.id === p.tempPosition.id
      );
      return (
        postBefore !== undefined && !_.isEqual(postBefore, p) && p.id !== undefined
      );
    })
    .map((p) => ({
      id: p.id as number,
      newsletterId,
      title: p.title ?? '',
      date: p.date ?? null,
      details: p.details as NewsletterPostDetails,
      tempPosition: p.tempPosition,
      location: p.location === null ? undefined : p.location,
    }));
};

export const formatDeletedPosts = (existingPosts: Post[], posts: Post[]) => {
  return {
    ids: _.differenceBy(existingPosts, posts, (p) => p.tempPosition.id)
      .filter((p) => p.id !== undefined)
      .map((p) => p.id as number),
  };
};

export const getChildPosts = (id: string, posts: Post[]) => {
  const filtered = posts.filter((p) => p.tempPosition.parentId === id);

  if (filtered.length === 0) return [];

  const arr = [...filtered];
  for (let i = 0; i < filtered.length; i++) {
    arr.push(...getChildPosts(filtered[i].tempPosition.id, posts));
  }

  return arr;
};
