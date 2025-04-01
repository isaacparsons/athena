import { useFieldArray, useForm } from 'react-hook-form';
import { PostDetailsInput } from '@athena/common';
import { Post } from '../types';

export const useNewsletterPosts = (parent: Post | null, posts: Post[]) => {
  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors, isValid, isSubmitting },
  } = useForm<{ posts: Post[] }>({
    // resolver: zodResolver(z.array(createNewsletterPostChild)),
    defaultValues: { posts },
    // mode: 'onChange',
  });

  const { fields, remove, insert, update } = useFieldArray({
    name: 'posts',
    control,
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
    handleSubmit,
    reset,
    remove: handleRemove,
    update: handleUpdate,
    insert: handleInsert,
  };
};
