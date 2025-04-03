import _ from 'lodash';
import { Control, useFieldArray } from 'react-hook-form';
import { Post, PostInput } from '../types';

export const useNewsletterPostsForm = <T extends { posts: Post[] }>(
  control: Control<T>,
  parent: Post | null,
  posts: Post[]
) => {
  const { fields, remove, insert, update } = useFieldArray<
    { posts: Post[] },
    'posts',
    'postId'
  >({
    name: 'posts',
    control: control as unknown as Control<{ posts: Post[] }>,
    keyName: 'postId',
  });

  const handleRemove = (id: string) => {
    const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
    if (postIdx > -1) remove(postIdx);
  };

  const handleUpdate = (id: string, change: Partial<Post>) => {
    const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
    if (postIdx > -1)
      update(postIdx, {
        ...fields[postIdx],
        ...change,
      });
  };

  const handleInsert = (newsletterId: number, post: PostInput) => {
    const parentId = parent?.tempPosition.id ?? null;
    const prev = fields.find(
      (p) => p.tempPosition.nextId === null && p.tempPosition.parentId === parentId
    );
    const inputParentId = _.get(post, ['tempPosition', 'parentId']);
    const inputId = _.get(post, ['tempPosition', 'id']);
    const inputNextId = _.get(post, ['tempPosition', 'nextId']);
    const inputPrevId = _.get(post, ['tempPosition', 'prevId']);

    insert(fields.length, {
      newsletterId,
      title: post.details.name,
      date: null,
      details: post.details,
      tempPosition: {
        parentId: inputParentId === undefined ? parentId : inputParentId,
        id: inputId === undefined ? fields.length.toString() : inputId,
        nextId: inputNextId === undefined ? null : inputNextId,
        prevId:
          inputPrevId === undefined ? prev?.tempPosition.id ?? null : inputPrevId,
      },
      file: post.file,
    });
  };

  return {
    fields,
    remove: handleRemove,
    update: handleUpdate,
    insert: handleInsert,
  };
};
