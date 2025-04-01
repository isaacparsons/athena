import _ from 'lodash';
import {
  CreateNewsletterPost,
  NewsletterPost,
  NewsletterPostDetails,
} from '@athena/common';
import { nanoid } from 'nanoid';
import { Post } from './NewsletterPostsController';

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

export const createNewPost = (
  existing: Post[],
  content: Pick<CreateNewsletterPost, 'details' | 'newsletterId'>,
  id: string,
  parentId: string | null
) => {
  const prev = existing.find(
    (p) => p.tempPosition.nextId === null && p.tempPosition.parentId === parentId
  );
  return {
    newsletterId: content.newsletterId,
    title: 'test 1',
    date: null,
    details: content.details,
    tempPosition: {
      parentId: parentId ?? null,
      id: id,
      nextId: null,
      prevId: prev?.tempPosition.id ?? null,
    },
  };
};

export const formatCreatedPosts = (
  newsletterId: number,
  existingPosts: Post[],
  posts: Post[]
) => {
  const created = posts.filter((p) => p.position === undefined);
  const [parents, children] = _.partition(
    created,
    (p) => p.tempPosition.parentId === null
  );

  if (parents.length === 1) {
    const parent = parents[0];
    const existingParent = existingPosts.find(
      (p) => parent.tempPosition.parentId === p.tempPosition.id
    );

    return {
      newsletterId,
      position: {
        parentId:
          existingParent === undefined
            ? null
            : existingParent.position?.parentId ?? null,
        nextId: null,
      },
      posts: created.map((p) => ({
        newsletterId,
        title: p.title ?? '',
        date: p.date ?? null,
        details: p.details as NewsletterPostDetails,
        tempPosition: p.tempPosition,
        // location: p.location,
      })),
    };
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
      // location: p.location,
    }));
};

export const formatDeletedPosts = (existingPosts: Post[], posts: Post[]) => {
  return {
    ids: _.differenceBy(existingPosts, posts, (p) => p.tempPosition.id)
      .filter((p) => p.id !== undefined)
      .map((p) => p.id as number),
  };
};
