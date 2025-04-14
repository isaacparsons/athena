import _ from 'lodash';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelectItems } from '@frontend/hooks';
import {
  CustomCardHeader,
  StyledDialog,
  AddNewsletterPostButton,
  NewsletterPostsList,
  NewsletterPostsListItem,
  EditingHeader,
  NewsletterPostProperties,
  CreateTemplateIcon,
  BackButtonIcon,
} from '@frontend/components';
import {
  CreateNewsletterPostForm,
  NewsletterPostForm,
  UpdateNewsletterPostForm,
} from '@frontend/types';
import { getChildPosts } from '@athena/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface NewsletterPostsControllerProps {
  newsletterId: number;
  parent: null | NewsletterPostForm;
  setParent: (parent: null | NewsletterPostForm) => void;
  fields: NewsletterPostForm[];
  insert: (input: CreateNewsletterPostForm) => void;
  update: (input: UpdateNewsletterPostForm) => void;
  remove: (id: string) => void;
  editing?: boolean;
  setCreateTemplatePosts: (posts: NewsletterPostForm[]) => void;
}

export function NewsletterPostsController(props: NewsletterPostsControllerProps) {
  const {
    newsletterId,
    editing,
    setCreateTemplatePosts,
    parent,
    fields,
    setParent,
    insert,
    update,
    remove,
  } = props;

  const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
    fields,
    'tempPosition.id'
  );

  const handleOpenPostDetails = (post: NewsletterPostForm) => {
    if ((!editing && _.get(post, 'id') !== undefined) || editing) {
      setParent(post);
    }
  };

  const handleBack = () => {
    const newParent =
      fields.find((p) => p.tempPosition.id === parent?.tempPosition.parentId) ??
      null;
    if (newParent !== undefined) setParent(newParent);
  };

  const handleCreateTemplate = () => {
    const posts = fields
      .filter((p) => selected.has(p.tempPosition.id))
      .reduce(
        (prev, curr) => [
          ...prev,
          curr,
          ...getChildPosts(curr.tempPosition.id, fields),
        ],
        [] as NewsletterPostForm[]
      );
    setCreateTemplatePosts(posts);
  };

  return (
    <WithDialog parent={parent}>
      <>
        <CustomCardHeader
          left={parent === null ? null : <BackButtonIcon onClick={handleBack} />}
        />
        {parent !== null && (
          <NewsletterPostProperties
            data={parent}
            editing={Boolean(editing)}
            onChange={update}
          />
        )}
        <EditingHeader
          enabled={fields.length > 0}
          editing={Boolean(editing)}
          selected={selected}
          allSelected={allSelected}
          handleSelectAll={handleSelectAll}
        >
          <CreateTemplateIcon
            onClick={handleCreateTemplate}
            sx={{ m: 0.3, height: 35, width: 35, borderRadius: 17.5 }}
          />
        </EditingHeader>
        <NewsletterPostsList
          posts={fields}
          parent={parent}
          render={(value) => (
            <NewsletterPostsListItem
              value={value}
              editing={Boolean(editing)}
              handleSelect={handleSelect}
              selected={selected}
              handleRemove={remove}
              handleUpdate={update}
              handleOpenPostDetails={handleOpenPostDetails}
            />
          )}
        />
        {editing && (
          <AddNewsletterPostButton newsletterId={newsletterId} insert={insert} />
        )}
      </>
    </WithDialog>
  );
}
function WithDialog<T>({
  parent,
  children,
}: {
  parent: T | null;
  children: React.ReactNode;
}) {
  if (parent !== null) {
    return (
      <StyledDialog fullScreen open={true}>
        {children}
      </StyledDialog>
    );
  } else return children;
}
