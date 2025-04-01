import { NewsletterPost, TempNodePosition, PostDetailsInput } from '@athena/common';
import { useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
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
import { ArrowBackIcon, CheckIcon } from '@athena/icons';
import { getChildPosts } from './util';
import { useNewsletterPosts } from '@athena/hooks';

interface NewsletterPostsControllerProps {
  newsletterId: number;
  posts: Post[];
  onSave?: (data: { posts: Post[] }) => void;
  editing?: boolean;
  setCreateTemplatePosts: (posts: Post[]) => void;
}

export type Post = Partial<Omit<NewsletterPost, 'details'>> & {
  details: PostDetailsInput;
  tempPosition: TempNodePosition;
  file?: File;
};

const BackButton = createStyledIcon(ArrowBackIcon);

export function NewsletterPostsController(props: NewsletterPostsControllerProps) {
  const { posts, newsletterId, editing, onSave, setCreateTemplatePosts } = props;

  const [parent, setParent] = useState<null | Post>(null);

  const { fields, handleSubmit, reset, insert, update, remove } = useNewsletterPosts(
    parent,
    posts
  );

  const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
    fields,
    'tempPosition.id'
  );

  const handleOpenPostDetails = (post: Post) => {
    if ((!editing && post.id !== undefined) || editing) {
      setParent(post);
    }
  };

  const handleSave: SubmitHandler<{ posts: Post[] }> = async (data) => {
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
        [] as Post[]
      )
      .map((p) => ({
        ...p,
        title: p.details.name,
        date: p.date === undefined ? null : p.date,
        location: p.location === null ? undefined : p.location,
      }));
    console.log(posts);

    setCreateTemplatePosts(posts);
  };

  const hasChanged = useMemo(() => posts.length !== fields.length, [fields, posts]);

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
          handleCreateTemplate={handleCreateTemplate}
        />
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
