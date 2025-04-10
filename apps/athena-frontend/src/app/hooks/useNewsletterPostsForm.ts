import _ from 'lodash';
import { Control, useFieldArray } from 'react-hook-form';
import {
  CreateNewsletterPostForm,
  NewsletterPostForm,
  UpdateNewsletterPostForm,
} from '@frontend/types';

export const useNewsletterPostsForm = <T extends { posts: NewsletterPostForm[] }>(
  control: Control<T>,
  parent: NewsletterPostForm | null,
  posts: NewsletterPostForm[]
) => {
  const { fields, remove, insert, update } = useFieldArray<
    { posts: NewsletterPostForm[] },
    'posts',
    'postId'
  >({
    name: 'posts',
    control: control as unknown as Control<{ posts: NewsletterPostForm[] }>,
    keyName: 'postId',
  });

  const handleRemove = (id: string) => {
    const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
    if (postIdx > -1) remove(postIdx);
  };

  const handleUpdate = (input: UpdateNewsletterPostForm) => {
    const { id, change } = input;
    const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
    if (postIdx > -1) update(postIdx, _.merge(fields[postIdx], change));
  };

  const handleInsert = (post: CreateNewsletterPostForm) => {
    const parentId = parent?.tempPosition.id ?? null;
    const prev = fields.find(
      (p) => p.tempPosition.nextId === null && p.tempPosition.parentId === parentId
    );
    const inputParentId = _.get(post, ['tempPosition', 'parentId']);
    const inputId = _.get(post, ['tempPosition', 'id']);
    const inputNextId = _.get(post, ['tempPosition', 'nextId']);
    const inputPrevId = _.get(post, ['tempPosition', 'prevId']);

    insert(fields.length, {
      ...post,
      tempPosition: {
        parentId: inputParentId === undefined ? parentId : inputParentId,
        id: inputId === undefined ? fields.length.toString() : inputId,
        nextId: inputNextId === undefined ? null : inputNextId,
        prevId:
          inputPrevId === undefined ? prev?.tempPosition.id ?? null : inputPrevId,
      },
    });
  };

  return {
    fields,
    remove: handleRemove,
    update: handleUpdate,
    insert: handleInsert,
  };
};
