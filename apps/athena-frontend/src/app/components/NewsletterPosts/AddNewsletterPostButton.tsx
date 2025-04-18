import { useRef, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { MediaIcon, TemplateIcon, TextIcon } from '@frontend/icons';
import { mimeTypeToMediaFormat, NewsletterPostTypeName } from '@athena/common';
import { useUser } from '@frontend/store';
import { CreatePostsFromTemplateDialog, FileSelection } from '@frontend/components';
import { CreateNewsletterPostForm } from '@frontend/types';

interface AddNewsletterPostButtonProps {
  newsletterId: number;
  insert: (input: CreateNewsletterPostForm) => void;
}

export function AddNewsletterPostButton(props: AddNewsletterPostButtonProps) {
  const { newsletterId, insert } = props;

  const { templates } = useUser();

  const inputFile = useRef<HTMLInputElement | null>(null);
  const [createPostFromTemplateDialogOpen, setCreatePostFromTemplateDialogOpen] =
    useState(false);

  const handleOpenCreatePostFromTemplateDialog = () =>
    setCreatePostFromTemplateDialogOpen(true);

  const handleCloseCreatePostFromTemplateDialog = () =>
    setCreatePostFromTemplateDialogOpen(false);

  const handleAddMediaItem = () => {
    if (inputFile.current) inputFile.current.click();
  };

  const handleAddTextItem = () => {
    insert({
      newsletterId,
      title: '',
      date: null,
      details: {
        type: NewsletterPostTypeName.Text,
        name: '',
        link: null,
        description: null,
      },
    });
  };

  const handleFileAdded = (file: File) => {
    insert({
      newsletterId,
      title: '',
      date: null,
      details: {
        // date: new Date(file.lastModified).toISOString(),
        type: NewsletterPostTypeName.Media,
        caption: '',
        name: '',
        format: mimeTypeToMediaFormat(file.type),
        fileName: URL.createObjectURL(file),
        file: file,
      },
    });
  };

  return (
    <>
      <CreatePostsFromTemplateDialog
        newsletterId={newsletterId}
        data={templates}
        open={createPostFromTemplateDialogOpen}
        onClose={handleCloseCreatePostFromTemplateDialog}
        onInsert={insert}
      />
      <FileSelection ref={inputFile} onFileAdded={handleFileAdded} />
      <ButtonGroup sx={{ width: '100%', justifyContent: 'center' }}>
        <Button
          startIcon={<TemplateIcon />}
          onClick={handleOpenCreatePostFromTemplateDialog}
        >
          {'From Template'}
        </Button>
        <Button startIcon={<TextIcon />} onClick={handleAddTextItem}>
          {'Text'}
        </Button>
        <Button startIcon={<MediaIcon />} onClick={handleAddMediaItem}>
          {'Media'}
        </Button>
      </ButtonGroup>
    </>
  );
}
