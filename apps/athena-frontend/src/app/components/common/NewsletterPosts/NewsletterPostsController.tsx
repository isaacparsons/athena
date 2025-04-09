import _ from 'lodash';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelectItems } from '@athena/hooks';
import {
  CustomCardHeader,
  createStyledIcon,
  StyledDialog,
  StyledFab,
  AddNewsletterPostButton,
  NewsletterPostsList,
  NewsletterPostsListItem,
  EditingHeader,
} from '@athena/components';
import { ArrowBackIcon, CheckIcon, DeleteIcon, TemplateIcon } from '@athena/icons';
import { useNewsletterPostsForm } from '@athena/hooks';
import { NewsletterPostForm, newsletterPostFormSchema } from '../../../types';
import { getChildPosts } from '@athena/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface NewsletterPostsControllerProps {
  newsletterId: number;
  posts: NewsletterPostForm[];
  onSave?: (data: { posts: NewsletterPostForm[] }) => void;
  editing?: boolean;
  setCreateTemplatePosts: (posts: NewsletterPostForm[]) => void;
}

const CreateTemplate = createStyledIcon(TemplateIcon);

const BackButton = createStyledIcon(ArrowBackIcon);

export function NewsletterPostsController(props: NewsletterPostsControllerProps) {
  const { posts, newsletterId, editing, onSave, setCreateTemplatePosts } = props;

  const [parent, setParent] = useState<null | NewsletterPostForm>(null);

  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors, isValid, isSubmitting },
  } = useForm<{ posts: NewsletterPostForm[] }>({
    resolver: zodResolver(
      z.object({
        posts: z.array(newsletterPostFormSchema),
      })
    ),
    defaultValues: { posts: posts },
    values: { posts },
    mode: 'onSubmit',
  });

  const { fields, insert, update, remove } = useNewsletterPostsForm(
    control,
    parent,
    posts
  );

  const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
    fields,
    'tempPosition.id'
  );

  const hasChanged = useMemo(
    () =>
      JSON.stringify(posts) !==
      JSON.stringify(fields.map((f) => _.omit(f, 'postId'))),
    [fields, posts]
  );

  const handleOpenPostDetails = (post: NewsletterPostForm) => {
    if ((!editing && _.get(post, 'id') !== undefined) || editing) {
      setParent(post);
    }
  };

  const handleSave: SubmitHandler<{ posts: NewsletterPostForm[] }> = async (
    data
  ) => {
    if (onSave) onSave(data);
    reset();
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
          left={parent === null ? null : <BackButton onClick={handleBack} />}
        />
        <EditingHeader
          enabled={fields.length > 0}
          editing={Boolean(editing)}
          selected={selected}
          allSelected={allSelected}
          handleSelectAll={handleSelectAll}
        >
          <>
            {/* <Delete 
            sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }} /> */}
            <CreateTemplate
              onClick={handleCreateTemplate}
              sx={{ m: 0.3, height: 35, width: 35, borderRadius: 17.5 }}
            />
          </>
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
        {editing && (
          <StyledFab disabled={!hasChanged} onClick={handleSubmit(handleSave)}>
            <CheckIcon sx={{ color: 'white' }} />
          </StyledFab>
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
