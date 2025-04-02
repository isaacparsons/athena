import { Control, useFieldArray } from 'react-hook-form';
import { PostDetailsInput } from '@athena/common';
import { Post } from '../types';

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

  const handleInsert = (
    newsletterId: number,
    details: PostDetailsInput,
    file?: File
  ) => {
    const parentId = parent?.tempPosition.id ?? null;
    const prev = fields.find(
      (p) => p.tempPosition.nextId === null && p.tempPosition.parentId === parentId
    );
    insert(fields.length, {
      newsletterId,
      title: details.name,
      date: null,
      details,
      tempPosition: {
        parentId,
        id: fields.length.toString(),
        nextId: null,
        prevId: prev?.tempPosition.id ?? null,
      },
      file,
    });
  };

  return {
    fields,
    remove: handleRemove,
    update: handleUpdate,
    insert: handleInsert,
  };
};
