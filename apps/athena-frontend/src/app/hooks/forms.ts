import _ from 'lodash';
import { useForm } from 'react-hook-form';
import {
  CreateNewsletterPostForm,
  NewsletterPostForm,
  UpdateNewsletterPostForm,
} from '@frontend/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateManyNewsletterPosts,
  CreateNewsletter,
  createNewsletterSchema,
  getId,
  Newsletter,
  NewsletterPost,
  UpdateNewsletter,
  updateNewsletterSchema,
  WithTempPosition,
  UpdateNewsletterPost,
  UpdateNewsletterMember,
  updateNewsletterMemberSchema,
  NewsletterMember,
} from '@athena/common';
import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';

export type NewsletterPostFormGroupedByAction = {
  existing: WithTempPosition<NewsletterPost>[];
  created: CreateManyNewsletterPosts['posts'][number][];
  updated: WithTempPosition<UpdateNewsletterPost>[];
  deleted: WithTempPosition<NewsletterPost>[];
};

export function useNewsletterPostsForm({
  storePosts,
  defaultPosts,
}: {
  storePosts: NewsletterPost[];
  defaultPosts?: NewsletterPostFormGroupedByAction;
}) {
  const [posts, setPosts] = useState<NewsletterPostFormGroupedByAction>(
    defaultPosts ?? {
      existing: [],
      created: [],
      updated: [],
      deleted: [],
    }
  );

  useEffect(() => {
    const { existing } = posts;
    const newPosts = storePosts.filter(
      (p) => !existing.find((ep) => ep.id === p.id)
    );

    if (newPosts.length === 0) return;
    const idMap = new Map([
      ...(newPosts.map((p) => [p.id, nanoid()]) as [number, string][]),
      ...(existing.map((p) => [p.id, p.tempPosition.id]) as [number, string][]),
    ]);

    const formPosts = [
      ...existing,
      ...newPosts.map((p) => ({
        ...p,
        tempPosition: {
          id: getId(idMap, p.id),
          parentId:
            p.position.parentId === null ? null : getId(idMap, p.position.parentId),
          nextId:
            p.position.nextId === null ? null : getId(idMap, p.position.nextId),
          prevId:
            p.position.prevId === null ? null : getId(idMap, p.position.prevId),
        },
      })),
    ];
    setPosts((posts) => ({
      ...posts,
      existing: formPosts,
    }));
  }, [posts, setPosts, storePosts]);

  const formPosts = useMemo(() => {
    const { created, updated, deleted } = posts;
    const untouchedPosts = posts.existing.filter((p) => {
      const isCreated = created.find(
        (cp) => cp.tempPosition.id === p.tempPosition.id
      );
      if (isCreated) return false;
      const isUpdated = updated.find(
        (cp) => cp.tempPosition.id === p.tempPosition.id
      );
      if (isUpdated) return false;
      const isDeleted = deleted.find(
        (cp) => cp.tempPosition.id === p.tempPosition.id
      );
      if (isDeleted) return false;
      return true;
    });
    return [...untouchedPosts, ...created, ...updated] as NewsletterPostForm[];
  }, [posts]);

  const handleReset = () => {
    setPosts((posts) => ({
      ...posts,
      created: [],
      updated: [],
      deleted: [],
    }));
  };

  const handleRemove = (id: string) => {
    const post = posts.existing.find((p) => p.tempPosition.id === id);
    const created = posts.created.find((p) => p.tempPosition.id === id);
    const updated = posts.updated.find((p) => p.tempPosition.id === id);
    if (post || created || updated) {
      setPosts((posts) => ({
        ...posts,
        created: posts.created.filter((p) => p.tempPosition.id !== id),
        updated: posts.updated.filter((p) => p.tempPosition.id !== id),
        deleted: post ? [...posts.deleted, post] : posts.deleted,
      }));
    }
  };

  const handleUpdate = (input: UpdateNewsletterPostForm) => {
    const { id, change } = input;
    const updatedPost = posts.updated.find((p) => p.tempPosition.id === id);

    if (updatedPost) {
      setPosts((posts) => ({
        ...posts,
        updated: posts.updated.map((p) =>
          p.tempPosition.id === id ? { ...p, ...change } : p
        ),
      }));
      return;
    }
    const createdPost = posts.created.find((p) => p.tempPosition.id === id);
    if (createdPost) {
      setPosts((posts) => ({
        ...posts,
        created: posts.created.map((p) =>
          p.tempPosition.id === id ? { ...p, ...change } : p
        ),
      }));
      return;
    }
    const post = posts.existing.find((p) => p.tempPosition.id === id);
    if (post) {
      setPosts((posts) => ({
        ...posts,
        updated: [...posts.updated, { ...post, ...change }],
      }));
    }
  };

  const handleInsert = (
    parent: NewsletterPostForm | null,
    post: CreateNewsletterPostForm
  ) => {
    const parentId = parent?.tempPosition.id ?? null;
    const prev = posts.existing.find(
      (p) => p.tempPosition.nextId === null && p.tempPosition.parentId === parentId
    );

    const position = _.isUndefined(parent?.id)
      ? undefined
      : {
          parentId: parent.id,
          nextId: null,
          prevId: prev?.id ?? null,
        };

    const inputParentId = _.get(post, ['tempPosition', 'parentId']);
    const inputId = _.get(post, ['tempPosition', 'id']);
    const inputNextId = _.get(post, ['tempPosition', 'nextId']);
    const inputPrevId = _.get(post, ['tempPosition', 'prevId']);

    setPosts((posts) => ({
      ...posts,
      created: [
        ...posts.created,
        {
          ...post,
          position,
          tempPosition: {
            parentId: inputParentId === undefined ? parentId : inputParentId,
            id: inputId === undefined ? posts.created.length.toString() : inputId,
            nextId: inputNextId === undefined ? null : inputNextId,
            prevId:
              inputPrevId === undefined
                ? prev?.tempPosition.id ?? null
                : inputPrevId,
          },
        },
      ],
    }));
  };

  return {
    posts,
    formPosts,
    reset: handleReset,
    insertPost: handleInsert,
    updatePost: handleUpdate,
    deletePost: handleRemove,
  };
}
export const useUpdateNewsletterForm = (newsletter: Newsletter) => {
  const { trigger, watch, reset, formState, control, setValue } =
    useForm<UpdateNewsletter>({
      resolver: zodResolver(updateNewsletterSchema),
      mode: 'onSubmit',
      defaultValues: newsletter,
    });

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
