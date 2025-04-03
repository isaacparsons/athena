import _ from 'lodash';
import {
  CreateManyNewsletterPosts,
  NewsletterPost,
  NewsletterPostDetails,
} from '@athena/common';
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

export const formatCreatedPosts = (
  newsletterId: number,
  existingPosts: Post[],
  posts: Post[]
): CreateManyNewsletterPosts => {
  const [created, existing] = _.partition(posts, (p) => p.position === undefined);
  const tempIdRealIdMap = new Map(existing.map((e) => [e.tempPosition.id, e.id]));
  return {
    newsletterId,
    posts: created.map((p) => {
      const parentId =
        p.tempPosition.parentId === null
          ? null
          : tempIdRealIdMap.get(p.tempPosition.parentId);
      const nextId =
        p.tempPosition.nextId === null
          ? null
          : tempIdRealIdMap.get(p.tempPosition.nextId);
      const prevId =
        p.tempPosition.prevId === null
          ? null
          : tempIdRealIdMap.get(p.tempPosition.prevId);
      if (
        !_.isUndefined(parentId) ||
        !_.isUndefined(nextId) ||
        !_.isUndefined(prevId)
      ) {
        return {
          ...p,
          title: p.details.name,
          date: p.date ?? null,
          location: p.location === null ? undefined : p.location,
          newsletterId,
          position: {
            parentId: parentId ?? null,
            nextId: nextId ?? null,
            prevId: prevId ?? null,
          },
          tempPosition: {
            id: p.tempPosition.id,
            parentId: _.isUndefined(parentId) ? p.tempPosition.parentId : null,
            nextId: _.isUndefined(nextId) ? p.tempPosition.nextId : null,
            prevId: _.isUndefined(prevId) ? p.tempPosition.prevId : null,
          },
        };
      }
      return {
        ...p,
        newsletterId,
        title: p.details.name,
        date: p.date ?? null,
        location: p.location === null ? undefined : p.location,
      };
    }),
  };
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
      position: p.position,
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
