import { ReactNode, useState } from 'react';
import { Button, ButtonGroup, SpeedDial, SpeedDialAction } from '@mui/material';
import { MediaIcon, MenuIcon, TextIcon } from '@athena/icons';

interface AddNewsletterPostButtonProps {
  handleAddTextItem: () => void;
  handleAddMediaItem: () => void;
}

export function AddNewsletterPostButton(props: AddNewsletterPostButtonProps) {
  const { handleAddMediaItem, handleAddTextItem } = props;
  return (
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
  );
}
