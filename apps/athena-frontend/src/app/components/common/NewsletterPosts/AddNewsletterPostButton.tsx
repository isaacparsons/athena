import { ReactNode, useRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Popover,
  SpeedDial,
  SpeedDialAction,
} from '@mui/material';
import { MediaIcon, MenuIcon, TextIcon } from '@athena/icons';
import { FileSelection } from '../FileSelection';
import {
  mimeTypeToMediaFormat,
  NewsletterPostTypeName,
  PostDetailsInput,
} from '@athena/common';

interface AddNewsletterPostButtonProps {
  newsletterId: number;
  insert: (newsletterId: number, details: PostDetailsInput, file?: File) => void;
}

export function AddNewsletterPostButton(props: AddNewsletterPostButtonProps) {
  const { newsletterId, insert } = props;

  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleAddMediaItem = () => {
    console.log(inputFile);
    if (inputFile.current) inputFile.current.click();
  };

  const handleAddTextItem = () => {
    insert(newsletterId, {
      type: NewsletterPostTypeName.Text,
      name: '',
      link: null,
      description: null,
    });
  };

  const handleFileAdded = (file: File) => {
    insert(newsletterId, {
      // date: new Date(file.lastModified).toISOString(),
      type: NewsletterPostTypeName.Media,
      caption: '',
      name: '',
      format: mimeTypeToMediaFormat(file.type),
      fileName: URL.createObjectURL(file),
    });
  };

  return (
    <>
      <FileSelection ref={inputFile} onFileAdded={handleFileAdded} />
      <ButtonGroup sx={{ width: '100%', justifyContent: 'center' }}>
        {/* <Button
               startIcon={<TemplateIcon />}
               onClick={handleOpenCreateItemFromTemplateDialog}
             >
               {'From Template'}
             </Button> */}
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
