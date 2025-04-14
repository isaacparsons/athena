import { CreateTemplate, TemplateType } from '@athena/common';
import { useState } from 'react';
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
  DeleteIcon,
  CloseIcon,
  BackButtonIcon,
} from '@frontend/components';
import { CheckIcon } from '@frontend/icons';

import { toTemplateNodes } from '@frontend/util';
import { NewsletterPostForm } from '@frontend/types';

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
  const { posts, newsletterId, onSave, onClose } = props;

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

  const { fields, insert, update, remove } = useNewsletterPostsForm(parent, posts);

  const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
    fields,
    'tempPosition.id'
  );

  const handleOpenPostDetails = (post: NewsletterPostForm) => {
    setParent(post);
  };

  const handleSave: SubmitHandler<FormValues> = async (data) => {
    const nodes = toTemplateNodes(fields);
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
          left={parent === null ? null : <BackButtonIcon onClick={handleBack} />}
          right={<CloseIcon onClick={onClose} />}
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
          <DeleteIcon sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }} />
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
