import _ from 'lodash';
import {
  CreateManyNewsletterPosts,
  UpdateManyNewsletterPosts,
} from '@athena/common';
import { postHasId, NewsletterPostForm } from '@frontend/types';
import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';

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
