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
} from '@athena/common';
import { useNewsletterPostsForm, useSelectItems } from '@frontend/hooks';

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
  selected: Set<string>;
  handleSelect: (id: string) => void;
  allSelected: boolean;
  handleSelectAll: () => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  created: CreateManyNewsletterPosts['posts'][number][];
  updated: WithTempPosition<UpdateNewsletterPost>[];
  deleted: WithTempPosition<NewsletterPost>[];
  existing: WithTempPosition<NewsletterPost>[];
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
  existing: [],
});

export const useNewsletterPostsContext = () => useContext(NewsletterPostsContext);

interface NewsletterPostsProviderProps {
  newsletterId: number;
  children: React.ReactNode;
}

export function NewsletterPostsProvider(props: NewsletterPostsProviderProps) {
  const { newsletterId, children } = props;
  const [parent, setParent] = useState<null | NewsletterPostForm>(null);
  const [editing, setEditing] = useState(false);

  const {
    loading,
    posts: storePosts,
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
        existing: posts.existing,
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
