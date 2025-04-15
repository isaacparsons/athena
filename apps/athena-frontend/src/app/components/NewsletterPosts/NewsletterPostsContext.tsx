/* eslint-disable @typescript-eslint/no-empty-function */
import { useNewsletterPosts } from '@frontend/store';
import {
  CreateNewsletterPostForm,
  NewsletterPostForm,
  UpdateNewsletterPostForm,
} from '@frontend/types';
import _ from 'lodash';
import { createContext, useContext, useState } from 'react';
import {
  CreateManyNewsletterPosts,
  WithTempPosition,
  UpdateNewsletterPost,
  NewsletterPost,
  makeIdMap,
  TempNodePosition,
} from '@athena/common';
import {
  useNewsletterPostsForm,
  usePromiseWithNotification,
  useSelectItems,
} from '@frontend/hooks';

const NewsletterPostsContext = createContext<{
  parent: null | NewsletterPostForm;
  setParent: (parent: null | NewsletterPostForm) => void;
  loading: boolean;
  insertPost: (
    parent: NewsletterPostForm | null,
    post: CreateNewsletterPostForm
  ) => void;
  updatePost: (input: UpdateNewsletterPostForm) => void;
  deletePost: (id: string) => void;
  posts: NewsletterPostForm[];
  reset: () => void;
  save: () => Promise<void>;
  selected: Set<string>;
  handleSelect: (id: string) => void;
  allSelected: boolean;
  handleSelectAll: () => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  created: CreateManyNewsletterPosts['posts'][number][];
  updated: WithTempPosition<UpdateNewsletterPost>[];
  deleted: WithTempPosition<NewsletterPost>[];
}>({
  loading: false,
  parent: null,
  setParent: (parent: null | NewsletterPostForm) => {},
  insertPost: (
    parent: NewsletterPostForm | null,
    post: CreateNewsletterPostForm
  ) => {},
  updatePost: (input: UpdateNewsletterPostForm) => {},
  deletePost: (id: string) => {},
  posts: [],
  save: () => Promise.resolve(),
  reset: () => {},
  selected: new Set(),
  handleSelect: (id: string) => {},
  allSelected: false,
  handleSelectAll: () => {},
  editing: false,
  setEditing: (editing: boolean) => {},
  created: [],
  updated: [],
  deleted: [],
});

export const useNewsletterPostsContext = () => useContext(NewsletterPostsContext);

interface NewsletterPostsProviderProps {
  newsletterId: number;
  children: React.ReactNode;
}

export function NewsletterPostsProvider(props: NewsletterPostsProviderProps) {
  const { newsletterId, children } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const [parent, setParent] = useState<null | NewsletterPostForm>(null);
  const [editing, setEditing] = useState(false);

  const {
    loading,
    posts: storePosts,
    createPosts,
    updatePosts,
    deletePosts,
    fetchPosts,
  } = useNewsletterPosts(newsletterId);

  const { posts, formPosts, reset, insertPost, updatePost, deletePost } =
    useNewsletterPostsForm({ storePosts });

  const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
    formPosts,
    'tempPosition.id'
  );

  const handleSetParent = (newParent: null | NewsletterPostForm) => {
    setParent(newParent);
    if (newParent?.id !== undefined) fetchPosts(newParent.id);
  };

  const handleSavePosts = async () => {
    const allPosts = formPosts.map((p) => _.omit(p, 'postId'));
    const files = allPosts.reduce((prev, curr) => {
      const file = _.get(curr, ['details', 'file']) as File | undefined;
      if (file !== undefined)
        return [...prev, [curr.tempPosition.id, file] as [string, File]];
      return prev;
    }, [] as [string, File][]);

    const created = fromPostsWithTempPosition(posts.existing, posts.created);
    const updated = posts.updated;
    const deleted = posts.deleted.map((p) => p.id);

    if (created.length > 0) {
      promiseWithNotifications.execute(
        createPosts(
          {
            newsletterId,
            posts: created,
          },
          files
        ),
        {
          successMsg: 'Items created!',
          errorMsg: 'Unable to create items :(',
        }
      );
    }
    if (updated.length > 0) {
      promiseWithNotifications.execute(updatePosts(newsletterId, updated, files), {
        successMsg: 'Items updated!',
        errorMsg: 'Unable to update items :(',
      });
    }
    if (deleted.length > 0) {
      promiseWithNotifications.execute(
        deletePosts(newsletterId, {
          ids: deleted,
        }),
        {
          successMsg: 'Items deleted!',
          errorMsg: 'Unable to delete items :(',
        }
      );
    }
  };

  return (
    <NewsletterPostsContext.Provider
      value={{
        parent,
        setParent: handleSetParent,
        loading,
        posts: formPosts,
        created: posts.created,
        updated: posts.updated,
        deleted: posts.deleted,
        save: handleSavePosts,
        reset,
        insertPost,
        updatePost,
        deletePost,
        selected,
        handleSelect,
        allSelected,
        handleSelectAll,
        editing,
        setEditing,
      }}
    >
      {children}
    </NewsletterPostsContext.Provider>
  );
}

function fromPostsWithTempPosition<
  T extends WithTempPosition<{ id: number }>,
  U extends { tempPosition: TempNodePosition }
>(existingPosts: T[], posts: U[]) {
  function getId<T>(id: string | null, map: Map<string, T>) {
    if (id === null) return null;
    const item = map.get(id);
    if (item === undefined) return null;
    return item;
  }

  const allPostsIdMap = makeIdMap(existingPosts, (p) => [p.tempPosition.id, p]);

  const idMap = new Set(posts.map((p) => p.tempPosition.id));
  return posts.map((p) => {
    const { id, parentId, nextId, prevId } = p.tempPosition;
    const exisitingParent = _.get(getId(parentId, allPostsIdMap), 'id', null) as
      | number
      | null;
    const exisitingNext = _.get(getId(nextId, allPostsIdMap), 'id', null) as
      | number
      | null;
    const exisitingPrev = _.get(getId(prevId, allPostsIdMap), 'id', null) as
      | number
      | null;

    const position = {
      parentId:
        parentId === null ? null : idMap.has(parentId) ? null : exisitingParent,
      nextId: nextId === null ? null : idMap.has(nextId) ? null : exisitingNext,
      prevId: prevId === null ? null : idMap.has(prevId) ? null : exisitingPrev,
    };
    return {
      ...p,
      position,
      tempPosition: {
        id: id,
        nextId: exisitingNext === null ? nextId : null,
        prevId: exisitingPrev === null ? prevId : null,
        parentId: exisitingParent === null ? parentId : null,
      },
    };
  });
}
