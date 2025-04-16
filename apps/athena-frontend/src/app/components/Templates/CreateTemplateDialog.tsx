import { CreateTemplate, TemplateType } from '@athena/common';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNewsletterPostsForm, useSelectItems } from '@frontend/hooks';
import {
  CustomCardHeader,
  StyledDialog,
  StyledFab,
  AddNewsletterPostButton,
  NewsletterPostsList,
  NewsletterPostsListItem,
  EditingHeader,
  StyledTextField,
  StyledDeleteIcon,
  StyledCloseIcon,
  StyledBackButtonIcon,
} from '@frontend/components';
import { CheckIcon } from '@frontend/icons';

import { toTemplateNodes } from '@frontend/util';
import { CreateNewsletterPostForm, NewsletterPostForm } from '@frontend/types';
import _ from 'lodash';

interface CreateTemplateDialogProps {
  newsletterId: number;
  posts: NewsletterPostForm[];
  onSave: (input: CreateTemplate) => void;
  onClose: () => void;
}

type FormValues = {
  name: string;
};

export function CreateTemplateDialog(props: CreateTemplateDialogProps) {
  const { posts: incomingPosts, newsletterId, onSave, onClose } = props;

  const [parent, setParent] = useState<null | NewsletterPostForm>(null);

  const {
    handleSubmit,
    register,
    // formState: { errors, isValid, isSubmitting },
  } = useForm<{ name: string }>({
    // resolver: zodResolver(z.array(createNewsletterPostChild)),
    defaultValues: { name: '' },
    // mode: 'onChange',
  });

  const { formPosts, reset, insertPost, updatePost, deletePost } =
    useNewsletterPostsForm({
      storePosts: [],
    });

  useEffect(() => {
    incomingPosts.forEach((p) => {
      const parent =
        p.tempPosition.parentId === null
          ? null
          : incomingPosts.find(
              (ip) => ip.tempPosition.id === p.tempPosition.parentId
            );
      const existing = formPosts.find(
        (fp) => fp.tempPosition.id === p.tempPosition.id
      );
      if (!_.isUndefined(parent) && !existing) {
        insertPost(parent, p);
      }
    });
  }, [incomingPosts, insertPost, formPosts]);

  const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
    formPosts,
    'tempPosition.id'
  );

  const handleOpenPostDetails = (post: NewsletterPostForm) => {
    setParent(post);
  };

  const handleSave: SubmitHandler<FormValues> = async (data) => {
    const nodes = toTemplateNodes(formPosts);
    const input = {
      type: TemplateType.NewsletterPost,
      name: data.name,
      config: {},
      nodes,
    };
    onSave(input);
    reset();
  };

  const handleBack = () => {
    const newParent =
      formPosts.find((p) => p.tempPosition.id === parent?.tempPosition.parentId) ??
      null;
    if (newParent !== undefined) setParent(newParent);
  };

  const handleInsert = (input: CreateNewsletterPostForm) => {
    insertPost(parent, input);
  };

  return (
    <StyledDialog fullScreen open={formPosts.length > 0}>
      <>
        <CustomCardHeader
          left={
            parent === null ? null : <StyledBackButtonIcon onClick={handleBack} />
          }
          right={<StyledCloseIcon onClick={onClose} />}
        />
        <StyledTextField
          required
          id={'name'}
          label="Name"
          variant="standard"
          {...register('name')}
        />
        <EditingHeader
          enabled={formPosts.length > 0}
          editing={true}
          selected={selected}
          allSelected={allSelected}
          handleSelectAll={handleSelectAll}
        >
          <StyledDeleteIcon
            sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }}
          />
        </EditingHeader>
        <NewsletterPostsList
          posts={formPosts}
          parent={parent}
          render={(value) => (
            <NewsletterPostsListItem
              value={value}
              editing={true}
              handleSelect={handleSelect}
              selected={selected}
              handleRemove={deletePost}
              handleUpdate={updatePost}
              handleOpenPostDetails={handleOpenPostDetails}
            />
          )}
        />
        <AddNewsletterPostButton newsletterId={newsletterId} insert={handleInsert} />
        <StyledFab onClick={handleSubmit(handleSave)}>
          <CheckIcon sx={{ color: 'white' }} />
        </StyledFab>
      </>
    </StyledDialog>
  );
}
