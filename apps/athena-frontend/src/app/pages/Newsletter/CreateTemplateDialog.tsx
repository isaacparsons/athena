import { CreateTemplate, TemplateType } from '@athena/common';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNewsletterPostsForm, useSelectItems } from '@athena/hooks';
import {
  CustomCardHeader,
  createStyledIcon,
  StyledDialog,
  StyledFab,
  AddNewsletterPostButton,
  NewsletterPostsList,
  NewsletterPostsListItem,
  EditingHeader,
  StyledTextField,
} from '@athena/components';
import { ArrowBackIcon, CheckIcon, CloseIcon, DeleteIcon } from '@athena/icons';

import { toTemplateNodes } from '../../../util';
import { Post } from '../../types';

const Delete = createStyledIcon(DeleteIcon);
const Close = createStyledIcon(CloseIcon);

interface CreateTemplateDialogProps {
  newsletterId: number;
  posts: Post[];
  onSave: (input: CreateTemplate) => void;
  onClose: () => void;
}

const BackButton = createStyledIcon(ArrowBackIcon);

type FormValues = {
  name: string;
  posts: Post[];
};

export function CreateTemplateDialog(props: CreateTemplateDialogProps) {
  const { posts, newsletterId, onSave, onClose } = props;

  const [parent, setParent] = useState<null | Post>(null);

  const {
    control,
    handleSubmit,
    register,
    // formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    // resolver: zodResolver(z.array(createNewsletterPostChild)),
    defaultValues: { posts: posts, name: '' },
    values: { posts: posts, name: '' },
    // mode: 'onChange',
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

  const handleOpenPostDetails = (post: Post) => {
    setParent(post);
  };

  const handleSave: SubmitHandler<FormValues> = async (data) => {
    const nodes = toTemplateNodes(data.posts);
    const input = {
      type: TemplateType.NewsletterPost,
      name: data.name,
      config: {},
      nodes,
    };
    onSave(input);
  };

  const handleBack = () => {
    const newParent =
      fields.find((p) => p.tempPosition.id === parent?.tempPosition.parentId) ??
      null;
    if (newParent !== undefined) setParent(newParent);
  };

  return (
    <StyledDialog fullScreen open={posts.length > 0}>
      <>
        <CustomCardHeader
          left={parent === null ? null : <BackButton onClick={handleBack} />}
          right={<Close onClick={onClose} />}
        />
        <StyledTextField
          required
          id={'name'}
          label="Name"
          variant="standard"
          {...register('name')}
        />
        <EditingHeader
          enabled={fields.length > 0}
          editing={true}
          selected={selected}
          allSelected={allSelected}
          handleSelectAll={handleSelectAll}
        >
          <Delete sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }} />
        </EditingHeader>
        <NewsletterPostsList
          posts={fields}
          parent={parent}
          render={(value) => (
            <NewsletterPostsListItem
              value={value}
              editing={true}
              handleSelect={handleSelect}
              selected={selected}
              handleRemove={remove}
              handleUpdate={update}
              handleOpenPostDetails={handleOpenPostDetails}
            />
          )}
        />
        <AddNewsletterPostButton newsletterId={newsletterId} insert={insert} />
        <StyledFab onClick={handleSubmit(handleSave)}>
          <CheckIcon sx={{ color: 'white' }} />
        </StyledFab>
      </>
    </StyledDialog>
  );
}
