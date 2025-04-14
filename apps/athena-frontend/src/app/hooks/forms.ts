import _ from 'lodash';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import {
  CreateNewsletterPostForm,
  NewsletterPostForm,
  UpdateNewsletterPostForm,
} from '@frontend/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateNewsletter,
  createNewsletterSchema,
  Newsletter,
  UpdateNewsletter,
  updateNewsletterSchema,
} from '@athena/common';
import { useCallback, useEffect, useMemo } from 'react';

export const useNewsletterPostsForm = <T extends { posts: NewsletterPostForm[] }>(
  parent: NewsletterPostForm | null,
  posts: NewsletterPostForm[]
) => {
  const { control, handleSubmit, reset, formState } = useForm<{
    posts: NewsletterPostForm[];
  }>({
    // resolver: zodResolver(z.object({ posts: z.array(newsletterPostFormSchema) })),
    defaultValues: { posts },
    // values: { posts },
  });

  const { fields, remove, insert, update } = useFieldArray<
    { posts: NewsletterPostForm[] },
    'posts',
    'postId'
  >({
    name: 'posts',
    control: control as unknown as Control<{ posts: NewsletterPostForm[] }>,
    keyName: 'postId',
  });

  // const handleRemove = (id: string) => {
  //   const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
  //   if (postIdx > -1) remove(postIdx);
  // };

  const handleRemove = useCallback(
    (id: string) => {
      const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
      if (postIdx > -1) remove(postIdx);
    },
    [fields, remove]
  );

  // const handleUpdate = (input: UpdateNewsletterPostForm) => {
  //   const { id, change } = input;
  //   const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
  //   if (postIdx > -1) update(postIdx, _.merge(fields[postIdx], change));
  // };
  const handleUpdate = useCallback(
    (input: UpdateNewsletterPostForm) => {
      const { id, change } = input;
      const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
      if (postIdx > -1) update(postIdx, _.merge(fields[postIdx], change));
    },
    [fields, update]
  );

  const handleInsert = useCallback(
    (post: CreateNewsletterPostForm) => {
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
    },
    [fields, parent, insert]
  );

  // const handleInsert = (post: CreateNewsletterPostForm) => {
  //   const parentId = parent?.tempPosition.id ?? null;
  //   const prev = fields.find(
  //     (p) => p.tempPosition.nextId === null && p.tempPosition.parentId === parentId
  //   );
  //   const inputParentId = _.get(post, ['tempPosition', 'parentId']);
  //   const inputId = _.get(post, ['tempPosition', 'id']);
  //   const inputNextId = _.get(post, ['tempPosition', 'nextId']);
  //   const inputPrevId = _.get(post, ['tempPosition', 'prevId']);

  //   insert(fields.length, {
  //     ...post,
  //     tempPosition: {
  //       parentId: inputParentId === undefined ? parentId : inputParentId,
  //       id: inputId === undefined ? fields.length.toString() : inputId,
  //       nextId: inputNextId === undefined ? null : inputNextId,
  //       prevId:
  //         inputPrevId === undefined ? prev?.tempPosition.id ?? null : inputPrevId,
  //     },
  //   });
  // };

  return {
    fields,
    formState,
    reset,
    handleSubmit,
    remove: handleRemove,
    update: handleUpdate,
    insert: handleInsert,
  };
};

export const useUpdateNewsletterForm = (newsletter: Newsletter) => {
  const { trigger, watch, reset, formState, control, setValue } =
    useForm<UpdateNewsletter>({
      resolver: zodResolver(updateNewsletterSchema),
      mode: 'onSubmit',
      defaultValues: newsletter,
    });

  // useEffect(() => {
  //   if (newsletter) {
  //     setValue('name', newsletter.name);
  //     setValue('dateRange', newsletter.dateRange);
  //   }
  // }, [newsletter, setValue]);
  const formValues = watch();

  const updatedNewsletter = useMemo(() => {
    const keys = _.keys(formState.dirtyFields);

    return keys.length > 0 && newsletter
      ? {
          ...keys.reduce(
            (prev, curr) => ({ ...prev, [curr]: _.get(formValues, curr) }),
            {} as UpdateNewsletter
          ),
          id: newsletter.id,
        }
      : undefined;
  }, [formState, formValues, newsletter]);

  return {
    trigger,
    reset,
    control: useMemo(() => control, [control]),
    formState,
    newsletter: updatedNewsletter,
  };
};

export const useCreateNewsletterForm = () => {
  const { control, handleSubmit, reset, formState } = useForm<CreateNewsletter>({
    resolver: zodResolver(createNewsletterSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      dateRange: {
        start: new Date().toISOString(),
        end: null,
      },
    },
  });

  return {
    reset,
    control,
    formState,
    handleSubmit,
  };
};
