import _ from 'lodash';
import {
  CreateManyNewsletterPosts,
  NewsletterPost,
  UpdateManyNewsletterPosts,
} from '@athena/common';
import { nanoid } from 'nanoid';
import { postHasId, NewsletterPostForm } from '../../../types';
import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';

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
  }) as [string, NewsletterPostForm][];

  return {
    posts: tempPosts.map(([, p]) => p),
  };
};

export const formatCreatedPosts = (
  newsletterId: number,
  posts: NewsletterPostForm[]
): CreateManyNewsletterPosts => {
  const [created, existing] = _.partition(posts, (p) => p.id === undefined);

  return {
    newsletterId,
    posts: created.map((post) => ({
      newsletterId: post.newsletterId,
      title: post.title,
      date: post.date,
      details: post.details,
      tempPosition: post.tempPosition,
      position: post.position,
      location: post.location,
    })),
  };
};

const hasPostChanged =
  (existingPosts: NewsletterPostForm[]) => (post: NewsletterPostForm) => {
    const postBefore = existingPosts.find(
      (ep) => ep.tempPosition.id === post.tempPosition.id
    );
    return (
      postBefore !== undefined &&
      !_.isEqual(postBefore, post) &&
      post.id !== undefined
    );
  };

export const formatUpdatedPosts = (
  newsletterId: number,
  existingPosts: NewsletterPostForm[],
  posts: NewsletterPostForm[]
): UpdateManyNewsletterPosts => {
  return pipe(
    posts,
    A.filter(postHasId),
    A.filter(hasPostChanged(existingPosts)),
    A.map((p) => ({
      id: p.id,
      newsletterId,
      title: p.title,
      date: p.date,
      details: p.details,
      tempPosition: p.tempPosition,
      position: p.position,
      location: p.location,
    }))
  );
};

export const formatDeletedPosts = (
  existingPosts: NewsletterPostForm[],
  posts: NewsletterPostForm[]
) => {
  return {
    ids: _.differenceBy(existingPosts, posts, (p) => p.tempPosition.id)
      .filter((p) => p.id !== undefined)
      .map((p) => p.id as number),
  };
};
