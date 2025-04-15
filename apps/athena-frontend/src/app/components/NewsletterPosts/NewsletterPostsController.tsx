import _ from 'lodash';
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
  useNewsletterPostsContext,
} from '@frontend/components';
import { CreateNewsletterPostForm, NewsletterPostForm } from '@frontend/types';
import { NewsletterPost } from '@athena/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface NewsletterPostsControllerProps {
  newsletterId: number;
  onCreateTemplatePosts: (posts: NewsletterPostForm[]) => void;
}

export function NewsletterPostsController(props: NewsletterPostsControllerProps) {
  const { newsletterId, onCreateTemplatePosts } = props;

  const {
    parent,
    setParent,
    insertPost: insert,
    updatePost: update,
    deletePost: remove,
    posts,
    selected,
    handleSelect,
    allSelected,
    handleSelectAll,
    editing,
  } = useNewsletterPostsContext();

  const handleOpenPostDetails = (post: NewsletterPostForm) => {
    if ((!editing && _.get(post, 'id') !== undefined) || editing) {
      setParent(post);
    }
  };

  const handleBack = () => {
    const newParent =
      posts.find((p) => p.tempPosition.id === parent?.tempPosition.parentId) ?? null;
    if (newParent !== undefined) setParent(newParent);
  };

  const handleInsert = (input: CreateNewsletterPostForm) => {
    insert(parent, input);
  };

  const handleCreateTemplate = () => {
    const selectedPosts = posts.filter((p) => selected.has(p.tempPosition.id));
    onCreateTemplatePosts(selectedPosts);
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
          enabled={posts.length > 0}
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
          posts={posts}
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
          <AddNewsletterPostButton
            newsletterId={newsletterId}
            insert={handleInsert}
          />
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
